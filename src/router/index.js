import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

// route guard
import { supabase } from 'src/config/supabaseClient'

const requireAuth = async (to, from, next) => {
  const user = await supabase.auth.getUser()

  if (!user.data.user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('pages/IndexPage.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'Login',
        name: 'Login',
        component: () => import('pages/LoginVue.vue')
      },
      {
        path: 'Members',
        name: 'Members',
        component: () => import('pages/MembersManager.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'Projects',
        name: 'Projects',
        component: () => import('pages/ProjectsManager.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'Projects/AddProject',
        name: 'AddProject',
        component: () => import('pages/AddProject.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'Members/:id',

        component: () => import('pages/ModifyMember.vue'),
        props: true,
        beforeEnter: requireAuth
      },
      {
        path: 'Projects/:name',

        component: () => import('pages/ModifyProject.vue'),
        props: true,
        beforeEnter: requireAuth
      },
      {
        path: 'Members/AddMember',
        name: 'AddMember',
        component: () => import('pages/AddMember.vue'),
        beforeEnter: requireAuth
      },
      {
        path: 'Test',
        name: 'Test',
        component: () => import('src/pages/test/TestPage.vue')

      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }

]
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  return Router
})
