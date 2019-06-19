import Taro from '@tarojs/taro'

const NOTE_CONFIG = {
    gapTotal: 60,
    designWidth: 750
}

function calcBaseSize() {
    const { screenWidth } = Taro.getSystemInfoSync()
    return ( screenWidth - NOTE_CONFIG.gapTotal / NOTE_CONFIG.designWidth * screenWidth ) / 2
}

// 计算图片相对高度
function calcImageHeight(dimensions, imgWidth=calcBaseSize()) {
    if (!dimensions) {
        return 200
    }
    const sizes = dimensions.split('x')
    return  imgWidth / sizes[0] * sizes[1]
}

function initColumns(cols=2) {
    return Array.from({ length: cols }, () => 0)
}

export {
    calcImageHeight,
    initColumns,
    calcBaseSize
}