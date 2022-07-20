<template>
  <div>
    <h3 class="font-ailerons text-4xl text-left">Estado de la red</h3>
    <div class="mt-10 mb-10 flex justify-center w-full">
      <div class="rounded-lg h-14 flex mr-5">
        <div
          class="flex h-14 w-14 rounded-l-lg bg-green-500 justify-center items-center"
        >
          <CheckCircleIcon class="h-10 w-10 text-white" />
        </div>
        <div
          class="flex h-14 w-14 rounded-r-lg bg-white text-2xl justify-center items-center"
        >
          34
        </div>
      </div>
      <div class="rounded-lg h-14 flex">
        <div
          class="flex h-14 w-14 rounded-l-lg bg-red-500 justify-center items-center"
        >
          <MinusCircleIcon class="h-10 w-10 text-white" />
        </div>
        <div
          class="flex h-14 w-14 rounded-r-lg bg-white text-2xl justify-center items-center"
        >
          1
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/vue/solid"
</script>
