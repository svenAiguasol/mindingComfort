<template>
  <div class="flex justify-center items-center flex-wrap">
    <div
      v-for="(alert, i) in alerts"
      :key="i"
      :class="
        'w-full min-h-[30px] text-white flex items-center justify-center ' +
        colors[alert.type]
      "
    >
      <p>{{ alert.txt }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue"

const emitter = inject("emitter")

const colors = ref()
const alerts = ref()
alerts.value = []
colors.value = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
}
emitter.on("addAlert", (e) => {
  if (e.txt == "isDemo") {
    alerts.value.push({
      type: "success",
      txt: "Acción no disponible en la demo, consulte por el servicio a través del formulario de la página principal",
    })
  } else {
    alerts.value.push(e)
  }
  setTimeout(function () {
    alerts.value.pop()
  }, 5000)
})
</script>
