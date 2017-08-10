'use strict'
// 设置环境变量
process.env.NODE_ENV = 'development';

const electron = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const mainConfig = require('./weppack.main.config')
const rendererConfig = require('./webpack.renderer.config')


let electronProcess = null
let manualRestart = false

function startRenderer () {
  return new Promise((resolve, reject) => {
    rendererConfig.plugins.push(
      // 这个插件会让控制台出入的文件路径格式不一样，感觉没什么乱用
      new webpack.NamedModulesPlugin()
    )
    const compiler = webpack(rendererConfig)
    
    compiler.plugin('compilation', compilation => {
        console.log('渲染程序开始编译...')
    })

    compiler.plugin('done', stats => {
      console.log('渲染程序编译完成...')
    })

    const server = new WebpackDevServer( compiler,{
        hot:true,
        historyApiFallback:true
      })
    server.listen(4040,'localhost',function(err){
      if(err){
        console.log('devserver启动失败',err.message);
        process.exit(0);
      }
      resolve();
      console.log('http://localhost:4040');
    })
  })
}

function startMain () {
  return new Promise((resolve, reject) => {
    const compiler = webpack(mainConfig)

    compiler.plugin('watch-run', (compilation, done) => {
      console.log('主程序编译中...')
      done()
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      console.log('主程序文件改变，重新编译')

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }
      resolve()
    });
  })
}

function startElectron () {
  electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../dist/electron/main.js')])

  electronProcess.stdout.on('data', data => {
    console.log(data)
  })
  electronProcess.stderr.on('data', data => {
    console.log('主程序错误',data)
  })
// 手动关闭electron程序后，将webpack程序结束
  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}


function init () {
  Promise.all([startRenderer(), startMain()])
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err)
    })
}

init()
