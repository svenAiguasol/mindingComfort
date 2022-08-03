<template>
  <div>
    <h3 class="font-ailerons text-4xl text-left">Estado de la red</h3>
    <div class="mt-10 mb-10 flex justify-center w-full">
      <div class="rounded-lg h-14 flex mr-5">
        <Popper
          hover
          openDelay="200"
          closeDelay="100"
          style="display: flex; border: none; margin: 0"
          class="h-14 w-14 rounded-l-lg bg-green-500 justify-center items-center"
        >
          <CheckCircleIcon class="h-10 w-10 text-white" />
          <template #content>
            <div class="popupbox">
              Sensores conectados y midiendo correctamente
            </div>
          </template>
        </Popper>
        <div
          class="flex h-14 w-14 rounded-r-lg bg-white text-2xl justify-center items-center"
        >
          {{ data.ok }}
        </div>
      </div>
      <div class="rounded-lg h-14 flex">
        <Popper
          hover
          openDelay="200"
          closeDelay="100"
          style="display: flex; border: none; margin: 0"
          class="flex h-14 w-14 rounded-l-lg bg-red-500 justify-center items-center"
        >
          <MinusCircleIcon class="h-10 w-10 text-white" />
          <template #content>
            <div class="popupbox">
              Sensores que requieren algún tipo de atención
            </div>
          </template>
        </Popper>
        <div
          class="flex h-14 w-14 rounded-r-lg bg-white text-2xl justify-center items-center"
        >
          {{ data.notOk }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/vue/solid"
import Popper from "vue3-popper"

const props = defineProps(["data"])

const data = ref(props.data)
</script>
