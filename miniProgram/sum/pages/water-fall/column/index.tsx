import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView, View, Image } from '@tarojs/components'

import wrapComponent from '@components/wrapper'
import { getMockData } from '../getData'
import Request from '@utils/request'
import { NOTE_LIST } from '@apis/WaterFall'

import './index.scss'

@wrapComponent()
export default class WaterFall extends Component<any,any> {
    config: Config = {
        navigationBarTitleText: 'WaterFall-Column'
    }

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            page: 0
        }
    }

    componentDidMount() {
        this.getList()
    }

    getList = () => {
        // const data = getMockData()
        // this.setState({
        //     list: [ ...this.state.list, ...data]
        // })
        const { page, list } = this.state
        Request({
            ...NOTE_LIST,
            data: { page: page + 1 }
        })
            .then(res => {
                this.setState({
                    list: [ ...list, ...res.data.items],
                    page: res.data.page
                })
            })
    }

    render() {
        const { list } = this.state
        return (
            <ScrollView
                className='water-fall__scroll-wrap'
                scrollY
                onScrollToLower={this.getList}
            >
                <View className='water-fall__list-wrap'>
                    {
                        list.map(item => <View key={item.id} className='water-fall__item'>
                            <Image className='water-fall__item-img' src={item.cover} mode='aspectFit' style='height: auto' />
                            <View>{item.name}</View>
                        </View>)
                    }
                </View>
            </ScrollView>
        )
    }
}
