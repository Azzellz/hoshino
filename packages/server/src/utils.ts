import availableKeys from '../available-keys.json'
import imgMap from '../public/img/map.json'
import fs from 'node:fs/promises'

//认证key
//#region
export function verifyKey(key: string): boolean {
    for (const unit of availableKeys) {
        if (unit.key === key) {
            return true
        }
    }
    return false
}
//#endregion

//保存图片
//#region
interface SaveOptions {
    expire: string //过期时间,为空则没有过期时间
    originalName: string //原先的名字
}
const _defaultSaveOptions: SaveOptions = {
    expire: '',
    originalName: ''
}
export async function saveImg(
    name: string,
    buf: Buffer,
    options: SaveOptions = _defaultSaveOptions
) {
    imgMap[name] = options
    await fs.writeFile(`../public/img/${name}`, buf)
    await fs.writeFile(`../public/img/map.json`, JSON.stringify(imgMap))
}
//#endregion
