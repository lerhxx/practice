import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import wrapComponent from '@components/wrapper'

import { getMockData } from '../getData'
import { connect } from '@tarojs/redux'
import { updateWaterFall, initWaterFall } from '@store/actions/waterFall'

import './index.scss'

@connect(state => state.waterFall, { updateWaterFall, initWaterFall })
@wrapComponent()
export default class CalcWaterFall extends Component<any,any> {
    config: Config = {
        navigationBarTitleText: 'WaterFall-Calc',
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
            const data = getMockData(page + 1)
            this.setState({
                page: page + 1
            })
            return data
        } catch(err) {}
    }

    getList = (page?) => {
        this.getData(page)
            .then(data => {
                this.props.updateWaterFall(data)
            })
            .catch(() => {})
    }

    onPullDownRefresh() {
        this.getData(0)
            .then(data => {
                this.props.initWaterFall(data)
                Taro.stopPullDownRefresh()
            })
            .catch(() => Taro.stopPullDownRefresh)
    }

    onReachBottom() {
        this.getList()
    }

    render() {
        const { items } = this.props
        return (
            <View className='water-fall__list-wrap'>
                {
                    items.map(item => <View key={item.id} className='water-fall__item' style={`top: ${item.top}rpx;left: ${item.left}rpx;`}>
                        <Image className='water-fall__item-img' src={item.cover} mode='widthFix' />
                        <View>{item.name}</View>
                    </View>)
                }
            </View>
        )
    }
}
