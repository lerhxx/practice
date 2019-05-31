import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import wrapComponent from '@components/wrapper'

import './index.scss'

@wrapComponent()
export default class WrapperTest extends Component {
    config: Config = {
        navigationBarTitleText: 'WrapperTest'
    }

    componentDidShow() {
        console.log('componentDidShow')
        setTimeout(() => {
            if (this.isHide) { return }
            Taro.showToast({
                title: 'WrapperTest Component Did Show',
                icon: 'none'
            })
        }, 2000)
    }

    render() {
        return (
            <View className='index'>
                Second
      </View>
        )
    }
}
