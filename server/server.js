const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const app = express()
const isDev = process.env.NODE_ENV === 'development'

app.use(bodyParser)
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  maxAge: 10*60*1000,
  name: 'tid',
  resave: false,
  saveUninitialized:false,
  secret:'peck'
}))

app.use('/api/user',require('./util/handle-login'))
app.use('/api',require('./util/proxy'))

if(!isDev) {
    const serverEntry = require('../dist/server-entry').default
    const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')
    app.use('/public', express.static(path.join(__dirname,'../dist')))
    app.get('*',function (req,res) {
        const appString = ReactSSR.renderToString(serverEntry)
        res.send(template.replace('<!-- app -->',appString))
    })
} else {
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3333,function () {
console.log('server is listening 3333')
})
