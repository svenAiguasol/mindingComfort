<template>
  <div class="flex items-center justify-center mr-5">
    <div
      class="h-8 bg-white border-sky-500 border-2 cursor-pointer rounded-full w-[50px] flex items-center mr-3"
      v-on:click.self="click()"
    >
      <div
        class="h-6 w-6 rounded-full bg-sky-500"
        :style="{
          marginLeft: vari ? '1.2em' : '0.12em',
          backgroundColor: vari ? 'rgb(14 165 233)' : '#ccc',
        }"
        v-on:click.self="click()"
      ></div>
    </div>
    {{ label }}
  </div>
</template>
<script setup>
import { computed, ref } from "vue"

const props = defineProps(["modelValue", "label"])
const emit = defineEmits(["update:modelValue"])
const label = ref(props.label)
const vari = ref(props.var)
function click(e) {
  console.log(vari.value)
  vari.value = !vari.value
  emit("update:modelValue", vari.value)
}
</script>
