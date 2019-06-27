import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

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
            page: 0,
            items: [],
            columns: initColumns(),
            pageSize: 10,
            pageCount: 1
        }
    }

    componentDidMount() {
        this.getList()
    }

    async getData(page) {
        try {
            return searchNote({ page })
        } catch(err) {}
    }

    getList = (page?) => {
        page = page > 0 ? page : this.state.page + 1
        if (page > this.state.pageCount) {
            return
        }
        this.getData(page)
            .then(res => {
                const { data={} } = res
                const items = data.items || []
                this.totalList = [ ...this.totalList, ...items ]
                this.currentTab = ~~(data.page / listPageCount)
                const startIndex = this.currentTab * data.pageSize
                const showList = this.totalList.slice(startIndex, startIndex + listPageCount * data.pageSize)
                console.log('showList', showList.length)
                console.log('startIndex', startIndex)
                console.log('this.currentTab', this.currentTab)
                this.setState({
                    page: data.page,
                    pageSize: data.pageSize,
                    pageCount: data.pageCount,
                    ...this.calcImageLocationInfo(showList, { columns: [0, 0] }),
                })
            })
            .catch(() => {})
    }

    onPullDownRefresh() {
        this.getData(1)
            .then(data => {
                this.props.initWaterFall(data.items)
                Taro.stopPullDownRefresh()
            })
            .catch(() => {
                Taro.stopPullDownRefresh()
            })
    }

    onReachBottom() {
        this.getList()
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
                console.log('calcSingleImageInfo', info)
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
    
    render() {
        const { items=[] } = this.state
        return (
            <View className='water-fall__list-wrap'>
                {
                    items.map((item, index) =>  <View key={item.id} className='water-fall__item' style={`top: ${item.top}px;left: ${item.left}rpx;`}>
                            <Image className='water-fall__item-img' src={item.cover} mode='widthFix' />
                            <View className='water-fall__content' style={`height: ${item.isShow ? 'auto' : '80rpx'}`}>{item.title}{item.title}{item.title}{item.title}</View>
                            <View className='water-fall__btn' onClick={() => this.toggleContent(index)}>{item.isShow ? '收起' : '展开' }</View>
                        </View>
                    )
                }
            </View>
        )
    }
}
