<template>
  <div class="flex flex-wrap w-full justify-center p-10">
    <h3 class="font-ailerons text-4xl text-center w-full">Alertas</h3>
    <p class="w-1/2 text-small bg-green-300 rounded-xl p-5 mt-8 mb-8">
      Estas son todas las alertas generadas por sala y tipo de alerta durante
      los últimos 5 días. <br /><br />
      <b>
        Las alertas se generan sólo cuando hay valores críticos medidos al
        interior del aula
      </b>
    </p>
    <div class="grid grid-cols-5 w-full">
      <div class="w-full flex justify-center">
        <div
          class="h-20 w-20 rounded-full bg-orange-500 p-4 flex justify-center items-center"
        >
          <img :src="iconos.calor" />
        </div>
      </div>
      <div class="w-full flex justify-center">
        <div
          class="h-20 w-20 rounded-full bg-orange-500 p-4 flex justify-center items-center"
        >
          <img :src="iconos.frio" />
        </div>
      </div>
      <div class="w-full flex justify-center">
        <div
          class="h-20 w-20 rounded-full bg-orange-500 p-4 flex justify-center items-center"
        >
          <img :src="iconos.humedad" />
        </div>
      </div>
      <div class="w-full flex justify-center">
        <div
          class="h-20 w-20 rounded-full bg-orange-500 p-4 flex justify-center items-center"
        >
          <img :src="iconos.co2" />
        </div>
      </div>
      <div class="w-full flex justify-center">
        <div
          class="h-20 w-20 rounded-full bg-orange-500 p-4 flex justify-center items-center"
        >
          <img :src="iconos.ruido" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-5 w-full">
      <alerts
        class="w-full"
        :data="filterAlerts(data.alerts, 'calor')"
        :alertsNumber="9999999"
      ></alerts>
      <alerts
        class="w-full"
        :data="filterAlerts(data.alerts, 'frio')"
        :alertsNumber="9999999"
      ></alerts>
      <alerts
        class="w-full"
        :data="filterAlerts(data.alerts, 'humedad')"
        :alertsNumber="9999999"
      ></alerts>
      <alerts
        class="w-full"
        :data="filterAlerts(data.alerts, 'co2')"
        :alertsNumber="9999999"
      ></alerts>
      <alerts
        class="w-full"
        :data="filterAlerts(data.alerts, 'ruido')"
        :alertsNumber="9999999"
      ></alerts>
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from "vue"
import Alerts from "./AlertsComp.vue"

const iconos = ref({
  general: new URL("../assets/img/icono_silla.svg", import.meta.url).href,
  frio: new URL("../assets/img/icono_frio.svg", import.meta.url).href,
  calor: new URL("../assets/img/icono_calor.svg", import.meta.url).href,
  co2: new URL("../assets/img/icono_co2.svg", import.meta.url).href,
  humedad: new URL("../assets/img/icono_humedad.svg", import.meta.url).href,
  ruido: new URL("../assets/img/icono_ruido.svg", import.meta.url).href,
})

const data = ref(inject("data"))
function filterAlerts(alerts, type) {
  return JSON.parse(JSON.stringify(alerts)).filter(
    (alert) => alert.type === type
  )
}
</script>
