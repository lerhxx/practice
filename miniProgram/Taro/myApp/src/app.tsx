import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import navigateThrottle from '@utils/throttle'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

navigateThrottle()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
        'pages/water-fall/calc/index',
        'pages/water-fall/column/index',
        'pages/water-fall/index',
        'pages/canvas/index',
        'pages/index/index',
        'pages/wrapper-test/index',
        'pages/throttle-test/index',
        'pages/arrow-func-bug/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
        color: '#333333',
        selectedColor: '#E4393C',
        backgroundColor: "#fff",
        borderStyle: 'white',
        list: [{
            pagePath: 'pages/index/index',
            iconPath: './assets/tab-bar/find.png',
            selectedIconPath: './assets/tab-bar/find-a.png',
            text: '发现'
        },
        {
            pagePath: 'pages/wrapper-test/index',
            iconPath: './assets/tab-bar/my.png',
            selectedIconPath: './assets/tab-bar/my-a.png',
            text: '我的'
        }
        ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
