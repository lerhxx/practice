import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import wrapComponent from '@components/wrapper'
import { getMockData } from '../getData'
import { searchNote } from '@apis/request/search'

import { connect } from '@tarojs/redux'
import { updateCardWaterFall } from '@store/actions/waterCardFall'

import './index.scss'

@connect(state => state.waterCardFall, { updateCardWaterFall })
@wrapComponent()
export default class CardWaterFall extends Component<any,any> {
    config: Config = {
        navigationBarTitleText: 'WaterCardFall',
        enablePullDownRefresh: true,
        backgroundTextStyle: 'dark'
    }

    constructor(props) {
        super(props)
        this.state = {
            page: 0
        }
    }

    componentDidMount() {
        this.getList()
    }

    async getData(page) {
        try {
            page = page >= 0 ? page : this.state.page
            // const data = getMockData(page + 1)
            // this.setState({
            //     page: page + 1
            // })
            // return data
            return searchNote({ page: page + 1 })
            .then(res => {
                this.setState({
                    page: page + 1
                })
                return res.data
            })
            .catch(() => {})
        } catch(err) {}
    }

    getList = (page?) => {
        this.getData(page)
            .then(data => {
                console.log('items', this.props.updateCardWaterFall)
                this.props.updateCardWaterFall(data.items)
            })
            .catch(() => {})
    }

    onPullDownRefresh() {
        this.getData(0)
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

    handleImgLoad = (id, index) => {
        const { items=[] } = this.props
        Taro.createSelectorQuery()
            .selectAll('.water-fall__item')
            .boundingClientRect()
            .exec(res => {
                console.log('handleImgLoad', res[0][index], index)
                const info = res[0][index]
                const newItems = items.map(item => ({ ...item, height: item.id === id ? info.height : item.height }))
                this.props.updateCardWaterFall(newItems)
            })
    }

    render() {
        const { items=[] } = this.props
        return (
            <View className='water-fall__list-wrap'>
                {
                    items.map((item, index) => <View key={item.id} className='water-fall__item' style={`top: ${item.top}rpx;left: ${item.left}rpx;`}>
                        <Image onLoad={() => this.handleImgLoad(item.id, index)} className='water-fall__item-img' src={item.cover} mode='widthFix' />
                        <View>{item.title}</View>
                    </View>)
                }
            </View>
        )
    }
}
