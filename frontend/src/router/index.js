import Vue from 'vue'
import VueRouter from 'vue-router'

import ErrorPage from '../components/ErrorPage'
import SquaresPage from '../components/SquaresPage'
import SquaresMapList from '../components/SquaresMapList'
import SquaresMapDetail from '../components/SquaresMapDetail'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',  
  
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'squares' },
    },
    
    {
      path: '/squares/',
      component: SquaresPage,
      children: [
        {
          path: '',
          name: 'squares',
          redirect: { name: 'squares-map-list' },
        },
        {
          path: 'maps',
          name: 'squares-map-list',
          component: SquaresMapList,
        },
        {
          path: 'maps/:slug',
          name: 'squares-map-detail',
          component: SquaresMapDetail,
        }
      ],
    },

    // Default
    {
      path: '/error',
      name: 'error',
      component: ErrorPage,
      props: true,
    },
    {
      path: '*',
      redirect: {
        name: 'error',
        params: {status: 404, statusText: 'Not Found'},
        props: true
      },      
    }
  ]  // routes
})

/* 
// Set title as result of function call from {..., meta: {title: fn}}
router.afterEach((to) => {
    let title = 'Project'
    if(to.meta && to.meta.title){
      title = to.meta.title(to)
    }
    document.title = title
})
*/

export default router