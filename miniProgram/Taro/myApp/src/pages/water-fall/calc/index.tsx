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

    getList = () => {
        const { page } = this.state
        // const data = getMockData(page + 1)
        // this.props.updateWaterFall(data)
        // this.setState({
        //     page: page + 1
        // })
        searchNote({ page: page + 1 })
            .then(res => {
                this.setState({
                    page: res.data.page
                })
                this.props.updateWaterFall(res.data.items)
            })
            .catch(err => {})
    }

    onPullDownRefresh() {
        searchNote()
            .then(res => {
                Taro.stopPullDownRefresh()
                this.setState({
                    page: 1
                })
                this.props.initWaterFall(res.data.items)
            })
            .catch(err => {
                Taro.stopPullDownRefresh()
            })
    }

    onReachBottom() {
        this.getList(0)
    }

    render() {
        const { items } = this.props
        return (
            <View className='water-fall__list-wrap'>
                {
                    items.map(item => <View key={item.id} className='water-fall__item' style={`top: ${item.top}rpx;left: ${item.left}rpx;`}>
                        <Image className='water-fall__item-img' src={item.cover} mode='widthFix' />
                        {/* <View>{item.name}</View> */}
                    </View>)
                }
            </View>
        )
    }
}
