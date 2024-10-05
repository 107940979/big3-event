<script setup>
import { articleGetList } from '@/api/article'
import { ref } from 'vue'
// 渲染列表
const channelList = ref([])
const getChannelList = async () => {
  const res = await articleGetList()
  channelList.value = res.data.data
}
getChannelList()
defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <el-select
    style="width: 150px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
