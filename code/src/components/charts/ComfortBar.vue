<template>
  <div class="w-full flex">
    <div class="rounded-full h-3 overflow-hidden w-full p-0">
      <div class="flex p-0 gap-0" v-if="vals" style="width: 100%">
        <Popper
          hover
          openDelay="200"
          closeDelay="100"
          style="border: none; margin: 0"
          :style="'width:' + val + '%'"
          v-for="(val, index) in vals"
          :key="index"
        >
          <div class="h-3" :class="'bg-[' + colors[index] + ']'"></div>
          <template #content>
            <div class="bg-slate-100 text-slate-700 p-3 rounded-full">
              {{ val + "%" }}
            </div>
          </template>
        </Popper>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import Popper from "vue3-popper"

const vals = ref()
vals.value = [25, 25, 25, 25]

const colors = ref()
colors.value = ["#8CC63F", "#FAEC21", "#F5911E", "#BF272D"]
</script>
