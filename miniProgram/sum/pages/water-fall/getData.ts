// const IMG_RANDOM_URL = 'http://lorempixel.com/'
const IMG_RANDOM_URL = 'https://source.unsplash.com'

function getImgRandomSize() {
    return `${IMG_RANDOM_URL}/${getRandomSize(200, 500)}x${getRandomSize(200, 500)}`
}

function getRandomSize(min, max) {
    return Math.floor(min + Math.random() * (max - min))
}

function getMockData() {
    const items: waterFallData[] = []
    let i = 0;
    while(i < 30) {
        ++i;
        items.push({
            id: i,
            name: 'name',
            content: 'contentcontentcontentcontentcontent',
            cover: getImgRandomSize()
        })
    }
    return items;
}

export {
    getImgRandomSize,
    getRandomSize,
    getMockData
}
