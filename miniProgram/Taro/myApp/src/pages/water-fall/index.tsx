import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import wrapComponent from '@components/wrapper'
import { getImgRandomSize } from './getImgUrl'

import './index.scss'

@wrapComponent()
export default class WaterFall extends Component {
    config: Config = {
        navigationBarTitleText: 'WaterFall'
    }

    componentDidMount() {
        this.getList()
    }

    getList = () => {
        console.log('getList')
        this.getImg()
    }

    getImg = () => {
    }

    render() {
        return (
            <View className='water-fall__wrap'>
                WaterFall
            </View>
        )
    }
}
