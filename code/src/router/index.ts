import { createRouter, createWebHistory } from "vue-router"
import MainPage from "@/components/MainPage.vue"
import LoginPage from "@/components/LoginPage.vue"
import PlatformPage from "@/components/PlatformPage.vue"
import DashboardPage from "@/components/DashboardPage.vue"
import ClassroomPage from "@/components/ClassroomPage.vue"
import PeoplePage from "@/components/PeoplePage.vue"
import ReportPage from "@/components/ReportPage.vue"
import ProfilePage from "@/components/ProfilePage.vue"
import AlertsPage from "@/components/AlertsPage.vue"
import AdminPage from "@/components/AdminPage.vue"
import ParentsPlatformPage from "@/components/parents/ParentsPlatformPage.vue"
import PupilsPage from "@/components/parents/PupilosPage.vue"
import ParentsProfilePage from "@/components/parents/ProfilePage.vue"
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
      path: "/plataforma-administrador",
      name: "Plataforma Administrador",
      redirect: "/plataforma-administrador/dashboard",
      component: PlatformPage,
      children: [
        {
          path: "dashboard",
          component: DashboardPage,
        },
        {
          path: "salas/:confortType?",
          component: ClassroomPage,
        },
        {
          path: "salas/ver/:idSala?",
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
    {
      path: "/plataforma-apoderados",
      name: "Plataforma",
      redirect: "/plataforma-apoderados/pupilos",
      component: ParentsPlatformPage,
      children: [
        {
          path: "pupilos",
          component: PupilsPage,
        },
        {
          path: "pupilos/:confortType?",
          component: PupilsPage,
        },
        {
          path: "pupilos/ver/:idPupilo",
          component: ClassroomPage,
        },
        {
          path: "perfil",
          component: ParentsProfilePage,
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
