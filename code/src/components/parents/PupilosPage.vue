<template>
  <div class="md:p-10 md:pt-10 pt-28 min-h-screen">
    <h3 class="font-ailerons text-4xl mb-5 text-center">Tus pupilos</h3>

    <div class="flex justify-center mb-5 w-full bg-white">
      <a
        class="p-1 px-10 text-sm text-center hover:bg-sky-600 hover:text-white py-3 bg-white cursor-pointer"
        v-for="(seccion, i) in sections"
        :class="{
          'bg-sky-600 text-white': activeSection == seccion,
        }"
        :key="i"
        @click="activeSection = seccion"
        >{{ seccion }}</a
      >
    </div>
    <div v-if="activeSection == 'Confort'">
      <div class="flex flex-wrap w-full gap-3 justify-center">
        <div
          class="relative md:w-1/5 w-full"
          v-for="(pup, i) in pupilos"
          :key="i"
        >
          <div
            class="rounded-full bg-slate-200 border-8 border-white h-48 w-48 absolute left-1/2 transform -translate-x-1/2 overflow-hidden flex justify-center"
          >
            <img
              :src="
                pup.sex == 'male'
                  ? 'assets/img/perfil_nino_' + (i + 1) + '.jpg'
                  : 'assets/img/perfil_nina_' + (i + 1) + '.jpg'
              "
              class="h-52 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full bg-white shadow-md rounded-2xl mt-28 pt-24 px-10">
            <h3 class="text-2xl w-full">{{ pup.nombre }}</h3>
            <p class="text-sm mb-5">{{ pup.classroom.curso }}</p>
            <h4>Resumen del confort</h4>
            <div class="mt-5 flex justify-center">
              <a
                class="p-1 w-28 text-sm rounded-full border-2 text-center border-purple-600 hover:bg-purple-600 hover:text-white bg-white cursor-pointer"
                >Todo el año</a
              >
              <a
                class="p-1 w-28 ml-2 text-sm rounded-full border-2 text-center border-purple-600 hover:bg-purple-600 hover:text-white bg-white cursor-pointer"
                >Este mes</a
              >
              <a
                class="p-1 w-28 ml-2 text-sm rounded-full border-2 text-center bg-purple-600 border-purple-600 text-white cursor-pointer"
                >Hoy</a
              >
            </div>
            <div class="flex w-full flex-wrap justify-center mt-5 pb-5">
              <div
                v-for="(type, i) in confort_types"
                :key="i"
                class="w-full h-12 flex mt-1 items-center justify-center"
              >
                <div><img class="h-7 w-7" :src="iconos[type]" /></div>
                <div class="h-full w-full">
                  <comfort-bar :data="pup.classroom.estado[type]"></comfort-bar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <leyenda-comp></leyenda-comp>
    </div>
    <div
      v-if="activeSection == 'Indicadores'"
      class="flex flex-wrap w-full gap-3 justify-center"
    >
      <div
        v-for="(pup, i) in pupilos"
        :key="i"
        class="relative md:w-1/4 w-full"
      >
        <div
          class="rounded-full bg-slate-200 border-8 border-white h-48 w-48 absolute left-1/2 transform -translate-x-1/2 overflow-hidden flex justify-center"
        >
          <img
            :src="
              pup.sex == 'male'
                ? 'assets/img/perfil_nino_' + (i + 1) + '.jpg'
                : 'assets/img/perfil_nina_' + (i + 1) + '.jpg'
            "
            class="h-52 rounded-full"
            alt=""
          />
        </div>
        <div class="w-full bg-white shadow-md rounded-2xl mt-28 pt-24 px-3">
          <h3 class="text-2xl w-full">{{ pup.nombre }}</h3>
          <p class="text-sm mb-5">{{ pup.classroom.curso }}</p>
          <ResultsComp
            :data="pup.classroom.results"
            :showMental="false"
            :reduced="true"
          ></ResultsComp>
        </div>
      </div>
    </div>
    <div v-if="activeSection == 'Reportes'">
      <div class="flex flex-wrap w-full gap-3 justify-center">
        <div
          class="relative md:w-1/5 w-full"
          v-for="(pup, i) in pupilos"
          :key="i"
        >
          <div
            class="rounded-full bg-slate-200 border-8 border-white h-48 w-48 absolute left-1/2 transform -translate-x-1/2 overflow-hidden flex justify-center"
          >
            <img
              :src="
                pup.sex == 'male'
                  ? 'assets/img/perfil_nino_' + (i + 1) + '.jpg'
                  : 'assets/img/perfil_nina_' + (i + 1) + '.jpg'
              "
              class="h-52 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full bg-white shadow-md rounded-2xl mt-28 pt-24 px-10">
            <h3 class="text-2xl w-full">{{ pup.nombre }}</h3>
            <p class="text-sm mb-5">{{ pup.classroom.curso }}</p>
            <h4>Reportes disponibles</h4>
            <div class="flex w-full flex-wrap justify-center mt-5 pb-5">
              <div
                v-for="m in currMonth"
                :key="m"
                @click="
                  emitter.emit('addAlert', {
                    type: 'success',
                    txt: 'isDemo',
                  })
                "
                class="w-full flex items-center text-slate-500 hover:text-sky-600 cursor-pointer"
              >
                <DocumentReportIcon class="h-12 mr-3" />
                Reporte Confort {{ meses[m - 1] }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <leyenda-comp></leyenda-comp>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, watch } from "vue"
import ComfortBar from "../charts/ComfortBar.vue"
import LeyendaComp from "../LeyendaComp.vue"
import ResultsComp from "../ResultsComp.vue"
import ClassroomstatsComp from "../ClassroomstatsComp.vue"
import SlidecheckComp from "../forms/SlidecheckComp.vue"
import { useRoute } from "vue-router"
import {
  ChevronRightIcon,
  ChevronDownIcon,
  SearchIcon,
  PencilAltIcon,
  UserIcon,
  DocumentReportIcon,
} from "@heroicons/vue/solid"
import { date } from "@formkit/i18n"

const emitter = inject("emitter")

const data = inject("data")

const meses = ref([
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
])
const d = new Date()
const currMonth = ref(d.getMonth())

// 175, 85
// activeSection.value =
const activeSection = ref(
  location.hash ? location.hash.substring(1) : "Confort"
)
watch(activeSection, (val) => {
  location.hash = val
})
const sections = ref(["Confort", "Indicadores", "Reportes"])

const confort_types = ref([
  "general",
  "calor",
  "frio",
  "co2",
  "humedad",
  "ruido",
])

const pupilos = [data.students[85], data.students[175]]
console.log(pupilos)

const limitValues = inject("limitValues")
console.log(data)
const iconos = ref({
  general: new URL("../../assets/img/icono_silla_gris.svg", import.meta.url)
    .href,
  frio: new URL("../../assets/img/icono_frio_gris.svg", import.meta.url).href,
  calor: new URL("../../assets/img/icono_calor_gris.svg", import.meta.url).href,
  co2: new URL("../../assets/img/icono_co2_gris.svg", import.meta.url).href,
  humedad: new URL("../../assets/img/icono_humedad_gris.svg", import.meta.url)
    .href,
  ruido: new URL("../../assets/img/icono_ruido_gris.svg", import.meta.url).href,
})
const iconos_activos = ref({
  general: new URL("../../assets/img/icono_silla.svg", import.meta.url).href,
  frio: new URL("../../assets/img/icono_frio.svg", import.meta.url).href,
  calor: new URL("../../assets/img/icono_calor.svg", import.meta.url).href,
  co2: new URL("../../assets/img/icono_co2.svg", import.meta.url).href,
  humedad: new URL("../../assets/img/icono_humedad.svg", import.meta.url).href,
  ruido: new URL("../../assets/img/icono_ruido.svg", import.meta.url).href,
})
</script>
