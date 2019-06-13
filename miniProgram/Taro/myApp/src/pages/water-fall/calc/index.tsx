import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import wrapComponent from '@components/wrapper'
import { getMockData } from '../getData'
import { searchNote } from '@apis/request/search'

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

    getList = (page?) => {
        page = page || this.state.page
        const data = getMockData(page + 1)
        this.props.updateWaterFall(data)
        this.setState({
            page: page + 1
        })
    }

    onPullDownRefresh() {
        this.getList(0)
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
                    </View>)
                }
            </View>
        )
    }
}
