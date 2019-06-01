import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import wrapComponent from '@components/wrapper'

import './index.scss'

@wrapComponent()
export default class Index extends Component<any, any> {
    config: Config = {
        navigationBarTitleText: '首页'
    }

    handleClick = () => {
        Taro.navigateTo({
            url: '/pages/throttle-test/index'
        })
    }

    render() {
        return (
            <View className='index'>
                首页
                <Button onClick={this.handleClick}>跳转</Button>
            </View>
        )
    }
}
