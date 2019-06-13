// const IMG_RANDOM_URL = 'http://lorempixel.com/'
const IMG_RANDOM_URL = 'https://source.unsplash.com'

function getImgRandomInfo() {
    const dimensions = `${getRandomSize(200, 500)}x${getRandomSize(200, 500)}`
    return {
        dimensions,
        url: `${IMG_RANDOM_URL}/${dimensions}`
    }
}

function getRandomSize(min, max) {
    return Math.floor(min + Math.random() * (max - min))
}

function getMockData(page=1) {
    const items: waterFallData[] = []
    const baseIndex = (page - 1) * 30
    let i = baseIndex
    while(i < baseIndex + 30) {
        ++i;
        const itemInfo = getImgRandomInfo()
        items.push({
            id: i,
            name: 'name',
            cover: itemInfo.url,
            cover_resolution: itemInfo.dimensions
        })
    }
    return items;
}

export {
    getImgRandomInfo,
    getRandomSize,
    getMockData
}
