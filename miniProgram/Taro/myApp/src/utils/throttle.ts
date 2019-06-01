import Taro from '@tarojs/taro'

export function throttle(fn, gap=1500) {
    let lastTime = 0
    return function() {
        let nowTime = + new Date()
        if (nowTime - lastTime > gap) {
            console.log('this', this)
            fn.apply(this, arguments)
            lastTime = nowTime
        }
    }
}

const navigateThrottle = () => {
    try {
        Object.defineProperties(Taro, {
            navigateTo: {
                value: throttle(Taro.navigateTo)
            }
        })
    } catch(err) {
        console.log(`navigateThrottle fail:`, err)
    }
}

export default navigateThrottle
