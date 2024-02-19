import express from 'express'
import { saveImg, verifyKey } from './utils'
import config from '../../../config.json'
import 'express-fileupload' //这里导入仅用于类型提示,不参与构建

const router = express.Router()

type UploadFile = {
    name: string
    data: Buffer
    size: number
    encoding: string
    tempFilePath: string
    truncated: boolean
    mimetype: string
    md5: string
    mv: Function
}

router.post(config.server.imgRoute, async (req, res) => {
    const file = (req.files as any).file as UploadFile

    const _tmp = file.name.split('.')
    const suffix = _tmp[_tmp.length - 1]
    const savedName = file.md5 + '.' + suffix
    const key = req.body.key as string
    if (verifyKey(key)) {
        await saveImg(savedName, file.data)
        const link = config.server.host + ':' + config.server.port + '/img/' + savedName
        res.status(200).send(link)
    } else {
        res.status(403).send('Key不正确!')
    }
})

export default router
