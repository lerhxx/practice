import Taro from '@tarojs/taro'


const CODE_AUTH_EXPIRED = [ 401 ]

async function Request(params) {
    try {
        const { url, method = 'GET', header={}, data={}, isUpload, opt={} } = params
        
        const res = !isUpload ? await Taro.request({
            url,
            method,
            header,
            data
        })
        : await Taro.uploadFile({
            url,
            header,
            filePath: opt.filePath,
            name: opt.name,
            formData: data
        })

        if (CODE_AUTH_EXPIRED.indexOf(res.statusCode) > -1) {
            throw new Error('请登录')
        }

        if (res.statusCode < 200 || res.statusCode >= 300 && res.statusCode !== 304) {
            throw res
        }

        const resData = isUpload ? JSON.parse(res.data) : res.data

        return resData
    } catch(err) {
        throw err
    }
}

export default Request
