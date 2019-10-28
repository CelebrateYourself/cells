import Vue from 'vue'
import VueRouter from 'vue-router'

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
      path: '/screen/',
      name: 'screen',
      component: () => import('../components/ScreenPage'),
      props: true,
    },
    
    {
      path: '/squares/',
      component: () => import('../components/SquaresPage'),
      children: [
        {
          path: '',
          name: 'squares',
          redirect: { name: 'squares-map-list' },
        },
        {
          path: 'maps',
          name: 'squares-map-list',
          component: () => import('../components/SquaresMapList'),
        },
        {
          path: 'maps/create',
          name: 'squares-map-create',
          component: () => import('../components/SquaresMapCreate'),
        },
        {
          path: 'maps/:slug',
          name: 'squares-map-detail',
          component: () => import('../components/SquaresMapDetail'),
        }
      ],
    },

    // Default
    {
      path: '/error',
      name: 'error',
      component: () => import('../components/ErrorPage'),
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