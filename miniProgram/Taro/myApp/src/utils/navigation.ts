import Taro from "@tarojs/taro"

function changePage(url) {
    const pages = Taro.getCurrentPages()
    const curPage = pages.pop() || {}
    const prevPage = pages.pop() || {}

    if (prevPage.route && url.indexOf(prevPage.route) > -1) {
        Taro.navigateBack({ delta: 1 })
        return
    }

    if (url.indexOf(curPage.route) > -1) {
        Taro.redirectTo({ url })
        return
    }

    Taro.navigateTo({ url })
}

export {
    changePage
}
