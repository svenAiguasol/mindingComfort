<template>
  <div class="root">
    <nav
      class="h-screen fixed flex-wrap bg-[#05042B] md:w-20 flex justify-center items-start place-items-start gap-10 pt-5"
    >
      <img src="@/assets/white_logo.svg" class="w-14 mb-3" alt="" />
      <ul class="w-2/3">
        <li class="mb-8" v-for="(item, i) in menu" :key="i">
          <router-link
            :to="item.path"
            class="text-white flex flex-wrap justify-center h-14 w-14 hover:bg-blue-900 rounded-lg"
            :class="{ 'bg-blue-900': url_active(item.path) }"
          >
            <img :src="item.icon" class="w-3/4" alt="" />
          </router-link>
        </li>
      </ul>

      <ul>
        <li
          class="rounded-lg border-white border-2 text-white hover:bg-white hover:text-blue-900 w-14 h-14 mb-10 flex text-2xl flex-wrap items-center justify-center place-item-end"
          :class="{
            'bg-blue-900': url_active('/plataforma-administrador/perfil'),
          }"
        >
          <router-link
            :to="'/plataforma-administrador/perfil'"
            class="block text-2xl"
          >
            DM
          </router-link>
        </li>
        <li class="mb-8">
          <router-link
            :to="'/plataforma-administrador/alertas'"
            :class="{
              'bg-blue-900': url_active('/plataforma-administrador/alertas'),
            }"
            class="text-white flex flex-wrap justify-center h-14 w-14 hover:bg-blue-900 rounded-lg"
          >
            <img src="@/assets/img/icono_campana.svg" class="w-3/4" alt="" />
          </router-link>
        </li>
        <li class="mb-8">
          <router-link
            :to="'/plataforma-administrador/admin'"
            :class="{
              'bg-blue-900': url_active('/plataforma-administrador/admin'),
            }"
            class="text-white flex flex-wrap justify-center h-14 w-14 hover:bg-blue-900 rounded-lg"
          >
            <img src="@/assets/img/icono_setup.svg" class="w-3/4" alt="" />
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="ml-20">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import axios from "../services/axios"
import { ref, inject } from "vue"

const emitter = inject("emitter")
const router = inject("router")

if (localStorage.getItem("token") == null) {
  router.push("/login")
}

const menu = ref()
menu.value = [
  {
    icon: new URL("../assets/img/icono_home.svg", import.meta.url).href,
    name: "Dashboard",
    path: "/plataforma-administrador/dashboard",
  },
  {
    icon: new URL("../assets/img/icono_silla.svg", import.meta.url).href,
    name: "Salas",
    path: "/plataforma-administrador/salas",
  },
  /*{
    icon: new URL("../assets/img/icono_alumno.svg", import.meta.url).href,
    name: "Personas",
    path: "/plataforma-administrador/personas",
  },
  {
    icon: new URL("../assets/img/icono_reporte.svg", import.meta.url).href,
    name: "Reportes",
    path: "/plataforma-administrador/reportes",
  },*/
]

function url_active(url) {
  return window.location.pathname.indexOf(url) > -1
}
</script>
