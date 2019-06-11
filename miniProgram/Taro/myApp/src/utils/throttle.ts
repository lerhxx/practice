import Taro from '@tarojs/taro'

export function throttle(fn, gap=1500) {
    let lastTime = 0
    return function() {
        let nowTime = + new Date()
        console.log('lastTime', lastTime)
        if (nowTime - lastTime > gap) {
            fn.apply(this, arguments)
            lastTime = nowTime
        }
    }
}

// 覆盖 Taro 的路由 API，防止页面短时间多次出入栈
const navigateThrottle = () => {
    try {
        Object.defineProperties(Taro, {
            navigateTo: {
                value: throttle(Taro.navigateTo)
            },
            redirectTo: {
                value: throttle(Taro.redirectTo)
            },
            switchTab: {
                value: throttle(Taro.switchTab)
            },
            navigateBack: {
                value: throttle(Taro.navigateBack)
            },
            reLaunch: {
                value: throttle(Taro.reLaunch)
            }
        })
    } catch(err) {
        console.log(`navigateThrottle fail:`, err)
    }
}

export default navigateThrottle
