<template>
  <div class="mt-10 mb-5 w-full">
    <div class="w-full mt-2 flex justify-center rounded-full">
      Porcentaje del tiempo en que las aulas de los niños están:
    </div>
    <div class="w-full mt-2 flex justify-center">
      <div class="p-5" v-for="(item, index) in leyenda" :key="index">
        <div
          class="h-5 w-5 inline-block mr-3"
          :style="'background-color:' + item.color"
        ></div>
        <div class="text-small inline-block">{{ item.name }}</div>
      </div>
    </div>
    <div class="w-full mt-2 flex justify-center rounded-full">
      Tipos de confort medidos en tiempo real:
    </div>
    <div class="w-full mt-2 flex justify-center">
      <div class="p-5 flex" v-for="(item, index) in tipos" :key="index">
        <div class="h-8 w-8 mr-3">
          <img :src="item.icono" class="w-full h-full" />
        </div>
        <div class="text-small items-center">{{ item.nombre }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"

const props = defineProps(["showTypes"])

ref(props.showTypes != null ? props.showTypes : true)

const leyenda = [
  { name: "En óptimas condiciones", color: "#8CC63F" },
  { name: "Relativamente mal", color: "#FAEC21" },
  { name: "Bastante mal", color: "#F5911E" },
  { name: "Crítico", color: "#BF272D" },
]
const tipos = ref([
  {
    nombre: "general",
    icono: new URL("../assets/img/icono_silla_gris.svg", import.meta.url).href,
  },
  {
    nombre: "frio",
    icono: new URL("../assets/img/icono_frio_gris.svg", import.meta.url).href,
  },
  {
    nombre: "calor",
    icono: new URL("../assets/img/icono_calor_gris.svg", import.meta.url).href,
  },
  {
    nombre: "dióxido de carbono",
    icono: new URL("../assets/img/icono_co2_gris.svg", import.meta.url).href,
  },
  {
    nombre: "humedad",
    icono: new URL("../assets/img/icono_humedad_gris.svg", import.meta.url)
      .href,
  },
  {
    nombre: "ruido",
    icono: new URL("../assets/img/icono_ruido_gris.svg", import.meta.url).href,
  },
])
</script>
