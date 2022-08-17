<template>
  <div>
    <div
      v-for="(alert, i) in data.slice(0, alertsNumber)"
      :key="i"
      class="mt-5 mb-5 flex justify-center w-full"
    >
      <div class="rounded-lg h-8 flex mr-5">
        <div
          class="flex h-8 w-10 rounded-l-lg bg-orange-400 justify-center items-center p-1"
        >
          <!--<ExclamationIcon class="h-6 w-6 text-white" />-->
          <img
            :src="criticStats[alert.type].icon"
            class="h-full fill-black"
            alt=""
          />
        </div>
        <div class="flex h-8 w-20 bg-slate-300 justify-center items-center">
          {{ alert.idSala }}
        </div>
        <div class="flex w-32 bg-white justify-center items-center p-2">
          {{ formatDate(alert.tiempo) }} --
        </div>
        <div
          class="flex h-8 w-24 rounded-r-lg bg-white text-2xl justify-center items-center pl-2"
        >
          <div class="text-sm ml-2">
            {{ formatNumber(alert.value, 0) }}
            {{ criticStats[alert.type].unit }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <router-link
        class="bg-white border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white rounded-full p-2 px-10"
        v-if="data.length > alertsNumber"
        :to="'/plataforma/alertas'"
      >
        Ver todas
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import {
  CheckCircleIcon,
  MinusCircleIcon,
  ExclamationIcon,
} from "@heroicons/vue/solid"
import moment from "moment"

const props = defineProps(["data", "alertsNumber"])

const data = ref(props.data)
const alertsNumber = ref(props.alertsNumber)

//console.log(props.data)

function formatDate(value) {
  if (value) {
    return moment(String(value)).format("DD/MM hh:mm")
  }
}

function formatNumber(value, decimales) {
  if (value) {
    return String(value.toFixed(decimales)).replace(".", ",")
  }
}

const criticStats = ref({
  calor: {
    icon: new URL("../assets/img/icono_calor.svg", import.meta.url).href,
    unit: "°C",
  },
  frio: {
    icon: new URL("../assets/img/icono_frio.svg", import.meta.url).href,
    unit: "°C",
  },
  humedad: {
    icon: new URL("../assets/img/icono_humedad.svg", import.meta.url).href,
    unit: "%",
  },
  co2: {
    icon: new URL("../assets/img/icono_co2.svg", import.meta.url).href,
    unit: "ppm",
  },
  ruido: {
    icon: new URL("../assets/img/icono_ruido.svg", import.meta.url).href,
    unit: "db",
  },
})
</script>
