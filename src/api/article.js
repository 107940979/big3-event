import request from '@/utils/request'

// 获取文章分类
export const articleGetList = () => {
  return request.get('/my/cate/list')
}

// 添加文章分类
export const articleAddService = (data) => {
  return request.post('/my/cate/add', data)
}

// 编辑文章分类
export const articleEditService = (data) => {
  return request.put('/my/cate/info', data)
}

// 删除文章分类
export const articleDelService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}

// 文章：获取文章列表
export const articleListService = (params) => {
  return request.get('/my/article/list', {
    params
  })
}

//发布文章接口
export const artPublishService = (data) => request.post('/my/article/add', data)

// 获取文章详情文章接口
export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })

// 编辑文章
export const artEditService = (data) => request.put('my/article/info', data)
// 删除文章接口
export const artDelService = (id) =>
  request.delete('my/article/info', { params: { id } })
