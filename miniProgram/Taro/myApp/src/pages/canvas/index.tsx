import Taro, { Component, Config } from '@tarojs/taro'
import { View, Canvas, Button } from '@tarojs/components'

import wrapComponent from '@components/wrapper'

// import IMG from '../../assets/my.png'

const IMG = '../../assets/my.png'

import './index.scss'

@wrapComponent()
export default class MyCanvas extends Component {
    config: Config = {
        navigationBarTitleText: 'Canvas'
    }

    componentDidlMount() {
    }
    
    draw = () => {
        Taro.getImageInfo({ src: IMG})
            .then(imgInfo => {
                console.log('image', imgInfo)
                const ctx = Taro.createCanvasContext('myCanvas', this.$scope)
                ctx.beginPath();
                ctx.drawImage(IMG, 0, 0, imgInfo.width, imgInfo.height, 0, 0, 200, 200)
                ctx.draw(false, () => setTimeout(() => {
                    Taro.canvasToTempFilePath({
                        canvasId: 'myCanvas',
                        success: (res) => {
                            console.log(res)
                        }
                    })
                }, 1000))
            })
    }

    render() {
        return (
            <View className='index'>
                <Canvas canvasId='myCanvas' style='width: 200px;height200px' width='200' height='200' />
                <Button onClick={this.draw}>Click</Button>
            </View>
        )
    }
}
