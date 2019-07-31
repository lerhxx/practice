const download = require('download-git-repo')
const path = require('path')
const fs = require('fs')

module.exports = target => {
    const temp = path.join(target || '.', '.download-temp')
    return new Promise((resolve, reject) => {
        download('lerhxx/templates-repo#master', temp, { clone: true }, err => {
            if (err) {
                reject(err)
            } else {
                try {
                    copyDir(target, temp)
                    resolve(temp)
                } catch(err) {
                    reject(err)
                }
            }
        })
    })
}

function copyDir(target, source='.') {
    try {
        const files = fs.readdirSync(source)
        files.forEach(name => {
            const fileName = path.resolve(process.cwd(), path.join(source, name))
            const sourcePath = `${target}/${name}`
            if (fs.statSync(fileName).isDirectory()) {
                !fs.existsSync(sourcePath) && fs.mkdirSync(sourcePath)
                copyDir(sourcePath, fileName)
            } else {
                fs.copyFileSync(fileName, sourcePath)
            }
        })
    } catch(err) {
        console.log('err', err)
        throw err
    }
}

