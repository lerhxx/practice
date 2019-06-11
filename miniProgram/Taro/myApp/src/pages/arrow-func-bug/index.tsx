import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import wrapComponent from '@components/wrapper'

import './index.scss'

const LIST_1 = ['a', 'b', 'c', 'd']
const LIST_2 = ['b', 'a', 'c', 'd']

@wrapComponent()
export default class ArrowFuncBug extends Component<any, any> {
    config: Config = {
        navigationBarTitleText: 'ArrowFuncBug'
    }

    constructor(props) {
        super(props)
        this.state = {
            list: LIST_1
        }
    }

    handleClick = (item) => {
        Taro.showToast({
            title: item,
            icon: 'none'
        })
    }

    handleChange = () => {
        const { list } = this.state
        this.setState({
            list: list === LIST_1 ? LIST_2 : LIST_1
        })
    }

    render() {
        const { list } = this.state
        return (
            <View className='index'>
                <View>
                {
                    list.map(item => <View onClick={() => this.handleClick(item)} key={item}>{item}</View>)
                }
                </View>
                <Button onClick={this.handleChange}>change</Button>
            </View>
        )
    }
}
