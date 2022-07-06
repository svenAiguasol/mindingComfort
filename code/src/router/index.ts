import { createRouter, createWebHistory } from "vue-router"
import MainPage from "../components/MainPage.vue"
import LoginPage from "../components/LoginPage.vue"
import PlatformPage from "../components/PlatformPage.vue"
import DashboardPage from "../components/DashboardPage.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: MainPage,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/plataforma",
      name: "Plataforma",
      redirect: "/plataforma/dashboard",
      component: PlatformPage,
      children: [
        {
          path: "dashboard",
          component: DashboardPage,
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      }
    }
  },
})

export default router
