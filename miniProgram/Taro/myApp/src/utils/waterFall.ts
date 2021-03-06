// 计算图片相对高度
function calcImageHeight(dimensions, imgWidth=345) {
    if (!dimensions) {
        return 200
    }
    const sizes = dimensions.split('x')
    return  imgWidth / sizes[0] * sizes[1]
}

// 计算瀑布流定位
function calcImageLocationInfo (list=[] as waterFallData[], options={} as CalcWaterFallOptions) {
    const {
        imgWidth=345,
        gap=20,               // 图片左右间距
        bottomGap=20,         // 图片上下间距
        columns=initColumns()
    } = options

    const newList = list.map((item: waterFallData) => {
        const imgHeight: number = item.height || calcImageHeight(item.cover_resolution, imgWidth)
        console.log('imgHeight', imgHeight, item.height, item.id)
        const newItem = { ...item }
        const totalHieght = imgHeight + bottomGap
        const minHeight = Math.min.apply(null, columns) || 0
        let minIndex = 0

        minIndex = columns.indexOf(minHeight)
        columns[minIndex] += totalHieght
        newItem.top = minHeight
        newItem.left = (imgWidth + gap) * minIndex
        newItem.height = imgHeight

        return newItem
    })

    return {
        columns,
        items: newList
    }
}

function initColumns(cols=2) {
    return Array.from({ length: cols }, () => 0)
}

export {
    calcImageHeight,
    calcImageLocationInfo,
    initColumns
}