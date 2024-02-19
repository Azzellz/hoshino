<template>
    <div id="home-container">
        <n-space vertical>
            <h3 id="title">柚子茶的图床.</h3>
            <hr class="hr-twill" />
            <a id="repo-link" href="https://github.com/Azzellz/my-picture-bed">
                开源,觉得好的话可以给个star~
            </a>
            <upload-image></upload-image>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { NSpace } from 'naive-ui'
import UploadImage from '@/components/Upload-Image.vue'
</script>

<style scoped>
#home-container {
    width: 70%;
    height: 80%;
    display: flex;
    flex-direction: column;
}
.hr-twill {
    border: 0;
    padding: 3px;
    background: repeating-linear-gradient(
        135deg,
        #a2a9b6 0px,
        #a2a9b6 1px,
        transparent 1px,
        transparent 6px
    );
}
#title {
    /* font-style: italic; */
}
#repo-link {
    font-size: 10px;
    color: gray;
    text-decoration: none;
}
</style>
