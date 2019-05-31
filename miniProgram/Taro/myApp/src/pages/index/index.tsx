import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import wrapComponent from '@components/wrapper'

import './index.scss'

@wrapComponent()
export default class Index extends Component<any, any> {
    config: Config = {
        navigationBarTitleText: '首页'
    }

    render() {
        return (
            <View className='index'>
                首页
      </View>
        )
    }
}
