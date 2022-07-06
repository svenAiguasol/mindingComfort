<template>
  <div class="root">
    <nav
      class="h-screen fixed flex-wrap bg-[#05042B] md:w-28 flex justify-center items-start place-items-start gap-10 pt-5 p-1"
    >
      <img src="@/assets/white_logo.svg" class="w-14 mb-5" alt="" />
      <ul class="w-2/3 h-full p-2">
        <li class="mb-14" v-for="(item, i) in menu" :key="i">
          <a href="#" class="text-white">
            <img :src="item.icon" class="w-full" alt="" />
          </a>
        </li>
      </ul>
    </nav>
    <div class="ml-28">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import axios from "../services/axios"
import { ref, inject } from "vue"

//const emit = defineEmits(["addAlert"])
const emitter = inject("emitter")

const menu = ref()
menu.value = [
  {
    icon: new URL("../assets/img/icono_home.svg", import.meta.url).href,
    name: "Dashboard",
    path: "/plataforma/dashboard",
  },
  {
    icon: new URL("../assets/img/icono_silla.svg", import.meta.url).href,
    name: "Salas",
    path: "/plataforma/salas",
  },
  {
    icon: new URL("../assets/img/icono_alumno.svg", import.meta.url).href,
    name: "Personas",
    path: "/plataforma/personas",
  },
]

function login() {}
</script>
