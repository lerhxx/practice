import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView, View, Image } from '@tarojs/components'

import wrapComponent from '@components/wrapper'
import { getMockData } from '../getData'
import { searchNote } from '@apis/request/search'

import { connect } from '@tarojs/redux'
import { updateCardItemWaterFall, addCardWaterFall, updateCardWaterFall, asyncUpdateCardItemWaterFall } from '@store/actions/waterCardFall'
import { initColumns, calcImageHeight } from '@utils/waterFallCard'

import './index.scss'

const listPageCount = 5

@connect(state => state.waterCardFall, { updateCardItemWaterFall, addCardWaterFall, updateCardWaterFall, asyncUpdateCardItemWaterFall })
@wrapComponent()
export default class CardWaterFall extends Component<any,any> {
    private totalList: any[] = []
    private currentTab = 0;

    config: Config = {
        navigationBarTitleText: 'WaterCardFall',
        enablePullDownRefresh: true,
        backgroundTextStyle: 'dark'
    }

    constructor(props) {
        super(props)
        this.state = {
            page: 0,                   // 已请求页数
            items: [],
            columns: initColumns(),
            pageSize: 10,
            pageCount: 1,
            scrollTop: 0,
            topPage: 0,               // 顶部页数
            bottomPage: 0             // 底部页数
        }
    }

    componentDidMount() {
        this.init()
    }

    async getData(page) {
        try {
            return searchNote({ page })
        } catch(err) {}
    }

    async init() {
        await this.getList()
        this.setState({
            ...this.calcImageLocationInfo(this.totalList, { columns: [0, 0] }),
            topPage: 1,
            bottomPage: 1
        })
    }

    getList = (page?) => {
        page = page > 0 ? page : this.state.page + 1
        if (page > this.state.pageCount) {
            return
        }
        return this.getData(page)
            .then(res => {
                const { data={} } = res
                const items = data.items || []
                this.totalList = [ ...this.totalList, ...items ]
                // const currentTab = ~~(data.page / listPageCount)
                // const showList = this.getTabList(currentTab)
                this.setState({
                    page: data.page,
                    pageSize: data.pageSize,
                    pageCount: data.pageCount,
                    // ...this.calcImageLocationInfo(showList, { columns: [0, 0] }),
                })
            })
            .catch(() => {})
    }

    async toggleContent(index) {
        const { items=[] } = this.state
        const newItem = { ...items[index], isShow: !items[index].isShow }
        this.calcSingleColumnImageInfo(newItem, true)
        
    }

    calcSingleColumnImageInfo = (target, reRender) => {
        const { items=[], columns=[] } = this.state
        const colIndex = target.column
        let column = 0
        let index = 0
        const newItems = items.map((item, i) => {
            if (item.column !== colIndex) {
                return item
            }
            const isTarget = item.id === target.id
            isTarget && ( index = i )
            const newItem = {
                ...item,
                top: column,
                isShow: isTarget ? target.isShow : item.isShow,
                isRender: false
            }
            column += ( isTarget ? target.height : item.height ) + 20
            return newItem
        })
        const newColumns = [...columns]
        newColumns[colIndex] = column
        this.setState({
            items: newItems,
            columns: newColumns
        }, () => {
            reRender && this.calcSingleImageInfo(target, index)
        })
    }

    calcSingleImageInfo(target, index) {
        Taro.createSelectorQuery()
            .selectAll('.water-fall__item')
            .boundingClientRect()
            .exec(res => {
                const info = res[0][index]
                this.calcSingleColumnImageInfo({ ...target, height: info.height}, false)
            })
    }

    calcImageLocationInfo = (list=[] as waterFallData[], options={} as CalcWaterFallOptions) => {
        const {
            imgWidth=345,
            gap=20,               // 图片左右间距
            bottomGap=20,         // 图片上下间距
            columns=initColumns(),
            resHeight=70,
        } = options
    
        const newList = list.map((item: waterFallData) => {
            const imgHeight: number = calcImageHeight(item.cover_resolution)
            const newItem = { ...item }
            const totalHieght = imgHeight + bottomGap + resHeight
            const minHeight = Math.min.apply(null, columns) || 0
            let minIndex = 0
    
            minIndex = columns.indexOf(minHeight)
            columns[minIndex] += totalHieght
            newItem.top = minHeight
            newItem.left = (imgWidth + gap) * minIndex
            newItem.height = totalHieght
            newItem.column = minIndex
            return newItem
        })

        return {
            columns,
            items: newList
        }
    }

    async handleLower() {
        const { pageSize, pageCount, bottomPage } = this.state
        if (bottomPage >= pageCount) {
            return
        }

        if (this.totalList.length <= bottomPage * pageSize) {
            await this.getList(bottomPage + 1)
        }
        this.getTabList('next')
    }

    handleUpper = () => {
        this.getTabList('prev')
    }

    getTabList = (type='next') => {
        const { topPage, bottomPage, pageSize } = this.state
        let startPage = 0
        let endPage = 0

        if (type === 'next') {
            endPage = bottomPage + 1
            startPage = endPage - listPageCount >= 0 ? endPage - listPageCount : 0
        } else {
            startPage = topPage - 1 >= 0 ? topPage - 1 : 0
            endPage = startPage + listPageCount
        }

        const list = this.totalList.slice(startPage * pageSize, endPage * pageSize)

        this.setState({
            topPage: startPage,
            bottomPage: endPage,
            ...this.calcImageLocationInfo(list, { columns: [0, 0] })
        })
        return {
            list,
            startPage,
            endPage
        }
    }
    
    render() {
        const { items=[] ,scrollTop } = this.state
        return (
            <ScrollView
                className='water-fall__scroll-list'
                scrollY
                lowerThreshold={20}
                upperThreshold={0}
                onScrollToLower={this.handleLower}
                onScrollToUpper={this.handleUpper}
                // onTouchMove={this.handleTouchMove}
                // onTouchStart={this.handleTouchStart}
                // onTouchEnd={this.handleTouchEnd}
                scrollTop={scrollTop}
                scroll-into-view={`gid${items.length - 1}`}
            >
                <View className='water-fall__list-wrap'>
                    {
                        items.map((item, index) =>  <View key={item.id} id={`gid${index}`} className='water-fall__item' style={`top: ${item.top}px;left: ${item.left}rpx;`}>
                                <Image className='water-fall__item-img' src={item.cover} mode='widthFix' />
                                <View className='water-fall__content' style={`height: ${item.isShow ? 'auto' : '80rpx'}`}>{item.title}{item.title}{item.title}{item.title}</View>
                                <View className='water-fall__btn' onClick={() => this.toggleContent(index)}>{item.isShow ? '收起' : '展开' }</View>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        )
    }
}
