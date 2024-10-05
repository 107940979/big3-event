<script setup>
import { ref } from 'vue'
import { articleAddService, articleEditService } from '@/api/article.js'
import { tools } from '@/utils/tools'
const dialogVisible = ref(false)
const formref = ref()
const forModel = ref({
  cate_name: '',
  cate_alias: ''
})
const emit = defineEmits(['success'])
const open = async (row) => {
  dialogVisible.value = true
  forModel.value = { ...row }
}
const wantSubmit = async () => {
  await formref.value.validate()
  const isEdit = forModel.value.id
  //   编辑成功
  if (isEdit) {
    await articleEditService(forModel.value)
    ElMessage.success('编辑成功')
  }
  //   添加成功
  else {
    articleAddService(forModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
const debounce = tools.debounce(wantSubmit, 1000)
const submit = () => {
  debounce()
}
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母或数字',
      trigger: 'blur'
    }
  ]
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="forModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      ref="formref"
      :model="forModel"
      label-width="100px"
      style="padding-right: 30px"
      :rules="rules"
    >
      <el-form-item prop="cate_name" label="分类名称">
        <el-input
          v-model="forModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="forModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
