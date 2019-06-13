import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import wrapComponent from '@components/wrapper'
import { getMockData } from './getData'

import './index.scss'

@wrapComponent()
export default class WaterFall extends Component<any,any> {
    config: Config = {
        navigationBarTitleText: 'WaterFall'
    }

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.getList()
    }

    getList = () => {
        console.log('getList')
        const data = getMockData()
        this.setState({
            list: data
        })
    }

    render() {
        const { list } = this.state
        return (
            <View className='water-fall__wrap'>
            {
                list.map(item => <View key={item.id}>
                    <Image src={item.img_url} />
                </View>)
            }
            </View>
        )
    }
}
