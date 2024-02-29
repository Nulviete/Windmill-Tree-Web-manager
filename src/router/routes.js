/*eslint-disable */

// route guard
import { supabase } from "src/config/supabaseClient";


const requireAuth = async (to, from, next) => {
  let user = await supabase.auth.getUser()
  if (!user) {
    next({ name: "Login" })
  } else {
    next()
  }
}


const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "", component: () => import("pages/IndexPage.vue"),
        beforeEnter: requireAuth,
       },
       {
        path: "Login",
        name: "Login",
        component: () => import("pages/LoginVue.vue"),
      },
      {
        path: "Members",
        name: "Members",
        component: () => import("pages/MembersManager.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "Projects",
        name: "Projects",
        component: () => import("pages/ProjectsManager.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "Projects/AddProject",
        name: "AddProject",
        component: () => import("pages/AddProject.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "Members/:name",

        component: () => import("pages/ModifyMember.vue"),
        props: true,
        beforeEnter: requireAuth,
      },
      {
        path: "Projects/:name",

        component: () => import("pages/ModifyProject.vue"),
        props: true,
        beforeEnter: requireAuth,
      },
      {
        path: "Members/AddMember",
        name: "AddMember",
        component: () => import("pages/AddMember.vue"),
        beforeEnter: requireAuth,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  }

];


export default routes
