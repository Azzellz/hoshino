import express from 'express'
import fileUpload from 'express-fileupload'
import router from './router'
import config from '../../../config.json'

const app = express()

//设置静态文件目录
app.use(express.static('../public'))


//文件上传中间件
app.use(fileUpload())

//跨域中间件
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
    )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next()
})

//使用路由器
app.use(router)

app.listen(config.server.port, () => {
    console.log(`server is listen on:${config.server.port}...`)
})
