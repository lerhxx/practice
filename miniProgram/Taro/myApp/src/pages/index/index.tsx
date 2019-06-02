import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import wrapComponent from '@components/wrapper'

import './index.scss'

@wrapComponent()
export default class Index extends Component<any, any> {
    config: Config = {
        navigationBarTitleText: '首页'
    }

    handleNavigateToThrottlePage = () => {
        Taro.navigateTo({
            url: '/pages/throttle-test/index'
        })
    }

    handleNavigateToWraooerPage = () => {
        Taro.switchTab({
            url: '/pages/wrapper-test/index'
        })
    }

    render() {
        return (
            <View className='index'>
                首页
                <Button onClick={this.handleNavigateToThrottlePage}>throttle-test</Button>
                <Button onClick={this.handleNavigateToWraooerPage}>wrapper-test</Button>
            </View>
        )
    }
}
