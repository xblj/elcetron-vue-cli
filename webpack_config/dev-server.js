'use strict'

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

    const compiler = webpack(rendererConfig)
    

    compiler.plugin('compilation', compilation => {
        console.log('compilation')
    })

    compiler.plugin('done', stats => {
      console.log('Renderer')
    })

    const server = new WebpackDevServer( compiler,{
        contentBase: path.join(__dirname, '../'),
        quiet: true,
        hot:true
      })
    server.listen(9080)
  })
}

function startMain () {
  return new Promise((resolve, reject) => {
    const compiler = webpack(mainConfig)

    compiler.plugin('watch-run', (compilation, done) => {
      console.log('Main', 'compiling...')
      done()
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      console.log('Main')

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
    })
  })
}

function startElectron () {
  electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../dist/electron/main.js')])

  electronProcess.stdout.on('data', data => {
    // console.log(data)
  })
  electronProcess.stderr.on('data', data => {
    // console.log(data)
  })

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
