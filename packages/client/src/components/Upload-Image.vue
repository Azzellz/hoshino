<template>
    <n-upload multiple directory-dnd accept=".jpg .png .jpeg .webp" :max="5">
        <n-upload-dragger>
            <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                    <archive-icon />
                </n-icon>
            </div>
            <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0"> 请不要上传非法图片 o.O </n-p>
        </n-upload-dragger>
    </n-upload>
</template>

<script setup lang="ts">
import { NUpload, NUploadDragger, NP, NIcon } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
</script>

<style scoped></style>
