<template>
  <div class="mt-10 mb-5 w-full">
    <div class="w-full mt-2 flex justify-center rounded-full">
      Porcentaje del tiempo en que el espacio está:
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
  </div>
</template>
<script setup>
import { ref } from "vue"
const leyenda = [
  { name: "En óptimas condiciones", color: "#8CC63F" },
  { name: "Relativamente mal", color: "#FAEC21" },
  { name: "Bastante mal", color: "#F5911E" },
  { name: "Crítico", color: "#BF272D" },
]
</script>
