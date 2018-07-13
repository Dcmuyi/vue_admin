import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'components/HelloWorld'
import Product from 'views/product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/study',
      redirect: '/'
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/product/index',
      name: 'product-index',
      component: Product
    },
    {
      path: '/product/client-price',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
