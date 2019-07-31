#! /usr/local/bin/node
const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const download = require('../lib/download.js')
const rimraf = require('rimraf')

program.usage('<project-name>').parse(process.argv)

let projectName = program.args[0]

if (!projectName) {
    console.log('请输入项目名称')
    program.help()
    return
}

const list = glob.sync('*')
let rootName = path.basename(process.cwd())

if (list.length) {
    if (list.filter(name => {
        const fileName = path.resolve(process.cwd(), path.join('.', name))
        const reg = new RegExp(`${name}$`, 'i')
        return reg.test(projectName) && fs.statSync(fileName).isDirectory()
    }).length) {
        console.log(`项目 ${projectName} 已经存在`)
        return
    }
    rootName = projectName
} else if (rootName === projectName) {
    rootName = '.'
} else {
    rootName = projectName
}

go()

function go() {
    const target = path.resolve(process.cwd(), path.join('.', rootName))
    download(target)
        .then(target => console.log('target', target))
        .catch(err => {
            console.log('创建失败', err)
            rimraf(target, () => {})
        })
}

process.on('uncatchException', err => {
    console.log('uncatchException', err)
})
