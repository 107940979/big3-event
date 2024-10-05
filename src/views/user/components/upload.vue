<template>
  <div class="my-upload-container">
    <div class="upload-preview" @click="triggerFileSelect">
      <img v-if="img" :src="img" class="avatar" />
      <img v-else src="@/assets/avatar.jpg" width="278" />
    </div>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      @change="onUploadFile"
      accept="image/*"
    />
  </div>
</template>
<script setup>
import { ref, defineExpose, defineEmits } from 'vue'
const props = defineProps({
  imgUrl: String
})
const fileInput = ref(null)
const triggerFileSelect = () => {
  fileInput.value.click()
}
const emits = defineEmits(['img'])
defineExpose({
  triggerFileSelect
})

const img = ref(props.imgUrl)
const onUploadFile = (file) => {
  const reader = new FileReader()
  reader.onload = () => {
    img.value = reader.result
    emits('img', img.value)
  }
  reader.readAsDataURL(file.target.files[0])
}
</script>
<style scoped>
.my-upload-container {
  display: flex;
  flex-direction: column;
  .upload-preview {
    cursor: pointer;
    width: 278px;
    height: 278px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: border-color 0.3s;
  }
  .upload-preview:hover {
    border-color: #409eff;
  }
  .avatar {
    width: 278px;
    height: 278px;
    object-fit: cover;
  }
}
</style>
