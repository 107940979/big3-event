<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { articleListService, artDelService } from '@/api/article.js'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
import { useRouter } from 'vue-router'
const articleList = ref([])
const total = ref(0)
// 绑定抽屉组件
const articleEditRef = ref()
const flag = ref(true)
// 文章管理列表
const getArticleList = async () => {
  loading.value = true
  const res = await articleListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  console.log(res)
  loading.value = false
}
// 虚拟列表逻辑
const switchList = async () => {
  flag.value = !flag.value
  if (!flag.value) {
    updateArticleList()
    params.value.pagenum = 1
    params.value.pagesize = total.value
    const res = await articleListService(params.value)
    articleList.value = res.data.data
    console.log(res)
  } else {
    params.value.pagesize = 5
    getArticleList()
  }
}
// 表格高度
const tableHeight = 236
// 行高
const rowHeight = 59
// 标题单元高度
const titleHeight = 40
// 空白空间
const barHeight = computed(() => {
  console.log(total.value * rowHeight)
  return total.value * rowHeight - tableHeight + titleHeight
})
const start = ref(0)
// 定位变更
const listTop = computed(() => {
  console.log(start.value * rowHeight)
  return start.value * rowHeight
    ? start.value * rowHeight + titleHeight + 'px'
    : start.value * rowHeight + 'px'
})
const newArticleList = ref([])
const count = Math.ceil(tableHeight / rowHeight)
const scrollContainer = ref(null)
// 列表更新逻辑
const updateArticleList = () => {
  const scrollTop = scrollContainer.value.scrollTop
  start.value = Math.floor(scrollTop / rowHeight)
  const end = Math.min(start.value + count, total.value)
  newArticleList.value = articleList.value.slice(start.value, end)
}
const handleScroll = () => {
  updateArticleList()
}
// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 提供分页修改逻辑
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
// 文章编辑，删除，发布相关
const onAddArticle = () => {
  articleEditRef.value.open({})
}
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArticleList()
}
// 搜索按钮逻辑
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置按钮逻辑
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
// 页面加载
const loading = ref(false)
// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
// 跳转详情页
const router = useRouter()
const turnDetail = (id) => {
  router.push({ name: 'detail', params: { id } })
}
// 基于params获取文章列表
getArticleList()
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 150px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button @click="switchList">列表切换</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 (分页)-->
    <div
      :class="flag ? 'hidden-table' : 'virtual-table'"
      @scroll="handleScroll"
      ref="scrollContainer"
      :style="{
        height: flag ? +articleList.length * 49 + 40 + 'px' : '236px'
      }"
    >
      <el-table
        v-loading="loading"
        :data="flag ? articleList : newArticleList"
        :style="{ top: listTop }"
        :height="flag ? '100%' : tableHeight"
      >
        <el-table-column label="文章标题" width="400">
          <template #default="{ row }">
            <el-link
              type="primary"
              :underline="false"
              @click="turnDetail(row.id)"
              >{{ row.title }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template #default="{ row }">
            {{ formatTime(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button
              :icon="Edit"
              circle
              plain
              type="primary"
              @click="onEditArticle(row)"
            ></el-button>
            <el-button
              :icon="Delete"
              circle
              plain
              type="danger"
              @click="onDeleteArticle(row)"
            ></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
      <div
        class="spacer"
        :style="{ height: barHeight + 'px' }"
        v-if="!flag"
      ></div>
    </div>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
      v-if="flag"
    />
    <!-- 抽屉 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style>
.virtual-table {
  position: relative;
  overflow-y: auto;
}
.hidden-table {
  position: relative;
  overflow-y: hidden;
}
.spacer {
  height: 0;
}
.el-table__inner-wrapper {
  position: absolute;
  top: 39.9px;
  width: 100%;
}
.el-table__inner-wrapper .el-table__header {
  position: fixed;
  top: 219.9px;
}
</style>
