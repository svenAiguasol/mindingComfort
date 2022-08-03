<template>
  <div class="w-full flex mt-10 justify-center">
    <div class="p-5" v-for="(item, index) in leyenda" :key="index">
      <div
        class="h-5 w-5 inline-block mr-3"
        :style="'background-color:' + item.color"
      ></div>
      <div class="text-small inline-block">{{ item.name }}</div>
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
