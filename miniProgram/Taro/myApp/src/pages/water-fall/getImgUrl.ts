const IMG_RANDOM_URL = 'http://lorempixel.com/'

function getImgRandomSize() {
    return `${IMG_RANDOM_URL}/${this.getRandomSize(200, 500)}/${this.getRandomSize(200, 500)}`
}

function getRandomSize(min, max) {
    return Math.floor(min + Math.random() * (max - min))
}

export {
    getImgRandomSize,
    getRandomSize
}
