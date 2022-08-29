<template>
  <div class="root">
    <nav
      class="md:h-screen fixed h-24 md:flex-wrap w-full z-50 bg-[#05042B] md:w-20 flex justify-center items-center md:items-start md:place-items-start md:gap-10 gap-28 md:pt-5"
    >
      <img src="@/assets/white_logo.svg" class="w-14 md:mb-3" alt="" />
      <ul class="md:w-2/3">
        <li class="md:mb-8" v-for="(item, i) in menu" :key="i">
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
          class="rounded-lg border-white border-2 text-white hover:bg-white hover:text-blue-900 w-14 h-14 md:mb-10 flex text-2xl flex-wrap items-center justify-center place-item-end"
          :class="{
            'bg-blue-900': url_active('/plataforma-apoderados/perfil'),
          }"
        >
          <router-link
            :to="'/plataforma-apoderados/perfil'"
            class="block text-2xl"
          >
            DM
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="md:ml-20">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import axios from "@/services/axios"
import { ref, inject } from "vue"

const emitter = inject("emitter")
const router = inject("router")

if (localStorage.getItem("token") == null) {
  router.push("/login")
}

const menu = ref()
menu.value = [
  {
    icon: new URL("../../assets/img/icono_alumno.svg", import.meta.url).href,
    name: "Dashboard",
    path: "/plataforma-apoderados/pupilos",
  },
  /*{
    icon: new URL("../assets/img/icono_alumno.svg", import.meta.url).href,
    name: "Personas",
    path: "/plataforma/personas",
  },
  {
    icon: new URL("../assets/img/icono_reporte.svg", import.meta.url).href,
    name: "Reportes",
    path: "/plataforma/reportes",
  },*/
]

function url_active(url) {
  return window.location.pathname.indexOf(url) > -1
}
</script>
