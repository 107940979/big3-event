<script setup>
import upload from '@/views/user/components/upload.vue'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUploadAvatarService } from '@/api/user'
const userStore = useUserStore()
const onUpdateAvatar = async () => {
  console.log('这是 -------' + newImage.value)
  await userUploadAvatarService(newImage.value)
  await userStore.getUser()
  ElMessage({ type: 'success', message: '更换头像成功' })
}
const uploadRef = ref()
const imgUrl = ref(userStore.user.user_pic)
const newImage = ref('')
const imgChange = (img) => {
  newImage.value = img
}
</script>

<template>
  <page-container title="更换头像">
    <el-row>
      <el-col :span="12">
        <upload ref="uploadRef" :imgUrl="imgUrl" @img="imgChange"> </upload>
        <br />
        <el-button
          @click="uploadRef.triggerFileSelect()"
          type="primary"
          :icon="Plus"
          size="large"
          >选择图片</el-button
        >
        <el-button
          type="success"
          :icon="Upload"
          size="large"
          @click="onUpdateAvatar"
        >
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped></style>
