const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const proxy = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const users = require('./api/user')

const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `express/${require('express/package.json').version}` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

let renderer

if (isProd) {
  const bundle = require('../dist/vue-ssr-bundle.json')
  const template = fs.readFileSync(resolve('../dist/index.html'), 'utf-8')
  renderer = createRenderer(bundle, template)
} else {
  require('../build/setup-dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template)
  })
}

function createRenderer(bundle, template) {
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(compression({ threshold: 0 }))
app.use('/dist', serve('../dist', true))
app.use('/manifest.json', serve('../manifest.json', true))
app.use('/service-worker.js', serve('../dist/service-worker.js'))
app.use('/public', serve('../public', true))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})
app.use('/api/users', users)

// let options = {
//   target: 'http://127.0.0.1:8989',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/api': ''
//   }
// }
//
// let exampleProxy = proxy(options)
// app.use('/api', exampleProxy)


app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting...')
  }
  const s = Date.now()
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', serverInfo)

  const errorHandler = err => {
    if (err && err.code === 404) {
      res.status(404).end('Page Not Found')
    } else {
      res.status(500).end('Server Error')
      console.error(`error during render: ${req.url}`)
      console.error(err)
    }
  }
  let title = ''
  switch (req.url) {
    case '/':
      title = '用户列表'
      break
    case '/edit':
      title = '编辑'
      break
    case '/user':
      title = 'oooo'
      break
    default:
      title = 'ssr'
      break
  }
  const meta = `
    <meta charset="utf-8">
    <meta name=keywords content="敢玩, iDareX, 敢玩TV, 敢玩活动, 敢玩自频道, 敢玩主题, 户外, 极限运动, 周边游, 探险, 时尚, 新潮, 运动视频, 体育, 新奇, 生活方式, 刺激, 惊险, 户外装备, 达人, 90后">
    <meta name=description content=自2014年10月创办以来，敢玩专注于极限户外和娱乐体育。从顽童、玩具、玩法三个方面，产出更专注于‘玩’的内容，已打造了一系列深受喜爱的娱乐体育真人秀和引爆网络的运动视频。!>
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  `
  renderer.renderToStream({title, meta, url: req.url})
    .on('error', errorHandler)
    .on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
    .pipe(res)
})



const port = process.env.PORT || 8989

app.listen(port, () => {
  console.log('server start!!')
})

