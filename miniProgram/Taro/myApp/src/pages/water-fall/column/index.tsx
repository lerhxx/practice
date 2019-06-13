import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView, View, Image } from '@tarojs/components'

import wrapComponent from '@components/wrapper'
import { getMockData } from '../getData'

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
        const data = getMockData()
        this.setState({
            list: [ ...this.state.list, ...data]
        })
    }

    render() {
        const { list } = this.state
        return (
            <ScrollView
                className='water-fall__scroll-wrap'
                scrollY
                lowerThreshold={100}
                onScrollToLower={this.getList}
            >
                <View className='water-fall__list-wrap'>
                    <View>
                        {
                            list.map((item, index) => index % 2 === 0 && <View key={item.id} className='water-fall__item'>
                                <Image className='water-fall__item-img' src={item.cover} mode='widthFix' />
                            </View>)
                        }
                    </View>
                    <View>
                        {
                            list.map((item, index) => index % 2 !== 0 && <View key={item.id} className='water-fall__item'>
                                <Image className='water-fall__item-img' src={item.cover} mode='widthFix' />
                            </View>)
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}
