<template>
  <div>
    <h1>{{ data.title }}</h1>
    <span>{{ data.nickname }}</span>
    <span>{{ time }}</span>
    <p>{{ data.content }}</p>
  </div>
</template>
<script setup>
import { artGetDetailService } from '@/api/article.js'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()
const data = ref('')
const time = ref()
const getArticleDetail = async () => {
  const res = await artGetDetailService(route.params.id)
  data.value = res.data.data
  time.value = new Date(data.value.pub_date).toLocaleString()
  data.value.content = data.value.content.replace(/<p>(.*?)<\/p>/g, '$1')
}
getArticleDetail()
</script>
<style scoped></style>
