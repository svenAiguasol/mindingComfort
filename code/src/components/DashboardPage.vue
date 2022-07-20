<template>
  <div class="root p-20 bg-white">
    <div class="flex flex-wrap">
      <div class="h-min-screen w-4/5">
        <h3 class="font-ailerons text-4xl bg-white text-left">Dashboard</h3>
        <h3 class="font-ailerons text-2xl bg-white text-left w-full mt-10">
          Salas
        </h3>
        <div
          class="bg-white shadow-xl mt-5 w-full rounded-2xl pt-5 px-10 flex flex-wrap justify-center"
        >
          <div class="flex flex-wrap">
            <div class="w-60">
              <donnut :data="general.values" :icon="iconos.general" />
              <h2 class="text-gray-500">General</h2>
            </div>
            <div
              class="w-40"
              v-for="(dim, index) in general.children"
              :key="index"
            >
              <donnut :data="dim.values" :icon="iconos[dim.name]" />
              <h2 class="text-gray-500">{{ dim.name }}</h2>
            </div>
          </div>
          <div class="w-full flex mt-10 justify-center">
            <div class="p-5" v-for="(item, index) in leyenda" :key="index">
              <div
                class="h-5 w-5 inline-block mr-3"
                :style="'background-color:' + item.color"
              ></div>
              <div class="text-small inline-block">{{ item.name }}</div>
            </div>
          </div>
          <!--<div class="w-80">
            <comfort-bar />
            "#8CC63F", "#FAEC21", "#F5911E", "#BF272D"
          </div>-->
        </div>
        <h3 class="font-ailerons text-2xl bg-white text-left mt-10">
          Recomendaciones activas
        </h3>
        <div class="flex justify-center items-center">
          <img class="h-8 mr-5" src="@/assets/img/icono_ticket.svg" alt="" />
          Instalado en X salas
          <img class="h-8 mr-5 ml-5" src="@/assets/img/icono_up.svg" alt="" />
          Potencial de instalar en X salas
        </div>
        <div class="pt-5 px-10 mt-5 mb-10 w-full rounded-2xl">
          <div class="w-full flex flex-wrap justify-center">
            <div
              style="width: 30%"
              class="rounded-lg shadow-lg p-0 mr-8"
              v-for="(mejora, index) in activas"
              :key="index"
            >
              <div
                class="w-full bg-gradient-to-tr rounded-t-lg from-sky-400 to-blue-500 px-5 text-white p-5"
              >
                <div
                  class="h-2 w-2 mx-2 bg-white rounded-full inline-block"
                  v-for="(s, j) in mejora.stars"
                  :key="j"
                ></div>
                <br />
                {{ mejora.name }}
              </div>
              <div class="w-full p-5 flex justify-center items-center">
                <div class="mr-5">
                  <img
                    class="h-10 w-10"
                    src="@/assets/img/icono_silla_azul.svg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-8 mr-1"
                    src="@/assets/img/icono_ticket.svg"
                    alt=""
                  />
                </div>
                <div
                  class="border-lime-500 border-2 rounded-full h-10 w-10 text-center flex items-center justify-center text-xl mr-5"
                >
                  {{ mejora.applied }}
                </div>
                <div>
                  <img
                    class="h-8 mr-1"
                    src="@/assets/img/icono_up.svg"
                    alt=""
                  />
                </div>
                <div
                  class="border-sky-500 border-2 rounded-full h-10 w-10 text-center flex items-center justify-center text-xl"
                >
                  {{ mejora.potential }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="font-ailerons text-2xl bg-white text-left">
          Recomendaciones pasivas
        </h3>
        <div class="pt-5 px-10 mt-5 w-full rounded-2xl">
          <div class="w-full flex flex-wrap justify-center">
            <div
              style="width: 30%"
              class="rounded-lg shadow-lg p-0 mr-8"
              v-for="(mejora, index) in pasivas"
              :key="index"
            >
              <div
                class="w-full bg-gradient-to-tr rounded-t-lg from-lime-500 to-green-600 px-5 text-white p-5"
              >
                <div
                  class="h-2 w-2 mx-2 bg-white rounded-full inline-block"
                  v-for="(s, j) in mejora.stars"
                  :key="j"
                ></div>
                <br />
                {{ mejora.name }}
              </div>
              <div class="w-full p-5 flex justify-center items-center">
                <div class="mr-5">
                  <img
                    class="h-10 w-10"
                    src="@/assets/img/icono_silla_azul.svg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-8 mr-1"
                    src="@/assets/img/icono_ticket.svg"
                    alt=""
                  />
                </div>
                <div
                  class="border-lime-500 border-2 rounded-full h-10 w-10 text-center flex items-center justify-center text-xl mr-5"
                >
                  {{ mejora.applied }}
                </div>
                <div>
                  <img
                    class="h-8 mr-1"
                    src="@/assets/img/icono_up.svg"
                    alt=""
                  />
                </div>
                <div
                  class="border-sky-500 border-2 rounded-full h-10 w-10 text-center flex items-center justify-center text-xl"
                >
                  {{ mejora.potential }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-screen w-1/5 fixed right-0 top-0 bg-gray-100 p-10">
        <alerts-comp></alerts-comp>
        <h3 class="font-ailerons text-4xl text-left">Alertas</h3>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import Donnut from "./charts/Donnut.vue"
import ComfortBar from "./charts/ComfortBar.vue"
import AlertsComp from "./AlertsComp.vue"

const data = ref()

data.value = [25, 25, 25, 25]

const general = ref()
general.value = {
  name: "general",
  values: [20, 25, 45, 15],
  children: [
    { name: "frio", values: [25, 25, 25, 25] },
    { name: "calor", values: [25, 25, 25, 25] },
    { name: "Co2", values: [25, 25, 25, 25] },
    { name: "humedad", values: [25, 25, 25, 25] },
    { name: "ruido", values: [25, 25, 25, 25] },
  ],
}

const iconos = ref({
  general: new URL("../assets/img/icono_silla_gris.svg", import.meta.url).href,
  frio: new URL("../assets/img/icono_frio_gris.svg", import.meta.url).href,
  calor: new URL("../assets/img/icono_calor_gris.svg", import.meta.url).href,
  Co2: new URL("../assets/img/icono_co2_gris.svg", import.meta.url).href,
  humedad: new URL("../assets/img/icono_humedad_gris.svg", import.meta.url)
    .href,
  ruido: new URL("../assets/img/icono_ruido_gris.svg", import.meta.url).href,
})

const leyenda = [
  { name: "En óptimas condiciones", color: "#8CC63F" },
  { name: "Relativamente mal", color: "#FAEC21" },
  { name: "Bastante mal", color: "#F5911E" },
  { name: "Crítico", color: "#BF272D" },
]

const activas = ref([
  { name: "Mejora envolvente", stars: 3, applied: 0, potential: 35 },
  {
    name: "Sistema ventilación mecánica con recuperación",
    stars: 4,
    applied: 0,
    potential: 35,
  },
  {
    name: "Sistema de calefacción",
    stars: 3,
    applied: 0,
    potential: 35,
  },
])

const pasivas = ref([
  { name: "Ventilar entre clases", stars: 5, applied: 20, potential: 15 },
  { name: "Ventilación nocturna", stars: 4, applied: 0, potential: 35 },
  {
    name: "Ventilacion durante la clase",
    stars: 3,
    applied: 25,
    potential: 10,
  },
])
</script>
