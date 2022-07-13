import { createRouter, createWebHistory } from "vue-router"
import MainPage from "../components/MainPage.vue"
import LoginPage from "../components/LoginPage.vue"
import PlatformPage from "../components/PlatformPage.vue"
import DashboardPage from "../components/DashboardPage.vue"
import ClassroomPage from "../components/ClassroomPage.vue"
import PeoplePage from "../components/PeoplePage.vue"
import ReportPage from "../components/ReportPage.vue"
import ProfilePage from "../components/ProfilePage.vue"
import AlertsPage from "../components/AlertsPage.vue"
import AdminPage from "../components/AdminPage.vue"

const router = createRouter({
  history: createWebHistory("/"),
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
        {
          path: "salas",
          component: ClassroomPage,
        },
        {
          path: "personas",
          component: PeoplePage,
        },
        {
          path: "reportes",
          component: ReportPage,
        },
        {
          path: "perfil",
          component: ProfilePage,
        },
        {
          path: "alertas",
          component: AlertsPage,
        },
        {
          path: "admin",
          component: AdminPage,
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
