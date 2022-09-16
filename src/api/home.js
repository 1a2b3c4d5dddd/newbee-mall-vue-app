import requests from '@/utils/axios'

// 获取主页的信息
export const getHomeInfo = () => requests({
  url:'/index-infos',
  methods: 'get'
})

