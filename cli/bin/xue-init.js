#! /usr/local/bin/node
const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const download = require('../lib/download.js')
const rimraf = require('rimraf')
const inquirer = require('inquirer')
const generator = require('../lib/generator')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

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
    const projectRoot = path.resolve(process.cwd(), path.join('.', rootName))
    download(projectRoot)
        .then(target => {
            console.log('target', target)
            return {
                name: rootName,
                root: projectRoot,
                temp: target
            }
        })
        .then(context => {
            return inquirer.prompt([{
                name: 'projectName',
                message: '项目名称',
                default: context.name
            }, {
                name: 'projectVersion',
                message: '项目版本号',
                default: '1.0.0'
            }, {
                name: 'projectDescription',
                message: '项目描述',
                default: `a project name ${rootName}`
            }])
            .then(answers => ({
                ...context,
                metadata: answers
            }))
        })
        .then(context => {
            return generator(context.temp, context.metadata, context.root)
                .then(() => {
                    console.log(logSymbols.success, chalk.green('创建成功'))
                    console.log(chalk.green(`cd ${context.root} \nyarn install \nyarn dev`))
                })
        })
        .catch(err => {
            console.log('创建失败', err)
            rimraf(projectRoot, () => {})
        })
}

process.on('uncatchException', err => {
    console.log('uncatchException', err)
})
