<template>
    <n-upload
        multiple
        directory-dnd
        :action="action"
        :on-error="handleUploadError"
        :on-finish="handleUploadFinished"
        :data="{
            key: secretKey
        }"
        :max="5"
    >
        <n-upload-dragger>
            <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                    <archive-icon />
                </n-icon>
            </div>
            <n-text style="font-size: 16px"> 点击或者拖动图片到该区域来上传 </n-text>
            <n-p depth="3" style="margin: 8px"> 请不要上传非法图片 o.O </n-p>
        </n-upload-dragger>
    </n-upload>
    <divide-line></divide-line>
    <n-list v-show="uploadedFiles.length" hoverable clickable>
        <template #header> 上传记录,点击复制链接</template>
        <n-list-item
            :link="file.link"
            v-for="file in uploadedFiles"
            :key="file.id"
            @click="copy(file.link)"
        >
            <div>图片: {{ file.name }}</div>
            <n-ellipsis style="max-width: 70vw">
                链接: <a :href="file.link" style="width: 100px">{{ file.link }}</a>
            </n-ellipsis>
        </n-list-item>
    </n-list>
</template>

<script setup lang="ts">
import {
    NUpload,
    NUploadDragger,
    NP,
    NIcon,
    NText,
    useMessage,
    NList,
    NListItem,
    NEllipsis,
    type UploadFileInfo
} from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import DivideLine from '@/components/Divide-Line.vue'
import config from '../../../../config.json'
import { ref } from 'vue'

//defines
//#region
const { secretKey } = defineProps<{
    secretKey: string
}>()
//#endregion

//根据config.json定义action
//#region
const action = config.server.host + ':' + config.server.port + config.server.imgRoute
//#endregion

//文件处理
//#region
const uploadedFiles = ref<
    {
        id: string
        name: string
        link: string
    }[]
>([])
const messager = useMessage()
const handleUploadError = (opts: any) => {
    const request = opts.event.target as XMLHttpRequest
    if (request.status === 403) {
        messager.error(request.responseText)
    }
}
const handleUploadFinished = (opts: any) => {
    //这里naive-ui没导出类型,可以先使用any
    //规定上传成功的响应为链接
    const request = opts.event.target as XMLHttpRequest
    const file = opts.file as UploadFileInfo
    if (request.status === 200) {
        messager.success(`上传成功 :>`)
        uploadedFiles.value.push({
            id: file.id,
            name: file.name,
            link: request.responseText
        })
    } else {
        messager.error(request.responseText)
    }
}

//#endregion

//ListItem操作
//#region
const copy = (content: string) => {
    //目前仅限电脑端
    navigator.clipboard.writeText(content)
    messager.success('复制成功 :>')
}
// const deleteRecord = (index: number) => {
//     uploadedFiles.value.splice(index, 1)
// }
//#endregion
</script>

<style scoped>
a {
    color: gray;
}
</style>
