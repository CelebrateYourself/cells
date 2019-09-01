import Vue from 'vue'
import VueRouter from 'vue-router'

import SquaresPage from './components/SquaresPage'
import SquaresMapList from './components/SquaresMapList'
import SquaresMapDetail from './components/SquaresMapDetail'
import NotFoundPage from './components/NotFoundPage'

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
      path: '/404',
      name: '404',
      component: NotFoundPage,
    },
    {
      path: '*',
      redirect: { name: '404' },
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