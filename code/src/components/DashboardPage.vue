<template>
  <div class="root p-16 bg-white">
    <div class="flex flex-wrap">
      <div class="h-min-screen w-4/5">
        <h3 class="font-ailerons text-4xl bg-white text-left">Dashboard</h3>
        <div class="bg-white shadow-xl h-96 mt-5 w-full rounded-2xl p-5">
          <h3 class="font-ailerons text-2xl bg-white text-left">Salas</h3>
        </div>
        <div class="bg-white shadow-xl h-96 mt-5 w-full rounded-2xl p-5">
          <h3 class="font-ailerons text-2xl bg-white text-left">
            Recomendaciones
          </h3>
        </div>
      </div>
      <div class="h-screen w-1/5 fixed right-0 top-0 bg-gray-100"></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"

const data = ref()

data.value = {}
</script>
