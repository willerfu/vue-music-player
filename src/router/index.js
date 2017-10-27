import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/Index'
import List from '@/views/List'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/list',
      name: 'List',
      component: List
    }
  ]
})
