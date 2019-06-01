import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import wrapComponent from '@components/wrapper'

import './index.scss'

@wrapComponent()
export default class ThrottleTest extends Component {
    config: Config = {
        navigationBarTitleText: 'ThrottleTest'
    }

    render() {
        return (
            <View className='index'>
                ThrottleTest
            </View>
        )
    }
}
