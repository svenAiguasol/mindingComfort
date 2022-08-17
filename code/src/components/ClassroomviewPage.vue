<template>
  <div class="relative">
    <div
      v-if="activeMejora"
      class="bg-slate-100 fixed w-1/4 h-screen z-50 right-0 top-0 overflow-y-scroll"
    >
      <div class="w-full h-full relative p-10">
        <div class="absolute top-5 right-5">
          <XCircleIcon
            class="text-slate-400 h-14 w-14 cursor-pointer"
            @click="activeMejora = null"
          />
        </div>
        <div class="flex flex-wrap w-full justify-center">
          <h3 class="text-2xl w-full mb-10">{{ activeMejora.nombre }}</h3>
          <div class="bg-white h-24 w-24 rounded-full p-3">
            <img :src="activeMejora.icono" class="w-full" alt="" />
          </div>
          <p class="text-justify text-sm mt-10">
            {{ activeMejora.descripcion }}
          </p>
          <h3
            class="w-full mb-3 mt-3"
            v-if="activeMejora.advertencias[0] != ''"
          >
            Advertencias
          </h3>
          <div v-if="activeMejora.advertencias[0] != ''">
            <ul class="w-full list-disc">
              <li
                class="text-left text-sm"
                v-for="(adv, i) in activeMejora.advertencias"
                :key="i"
              >
                {{ adv }}
              </li>
            </ul>
          </div>
          <h3 class="w-full mb-3 mt-3">Recomendaciones</h3>
          <ul class="list-disc">
            <li
              class="w-full text-left text-sm"
              v-for="(rec, i) in activeMejora.recomendaciones"
              :key="i"
            >
              {{ rec }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="h-min-screen w-full">
      <h3 class="font-ailerons text-4xl bg-white text-left flex">
        {{ sala.nombre }}
        <PencilAltIcon
          @click="
            emitter.emit('addAlert', {
              type: 'success',
              txt: 'isDemo',
            })
          "
          class="text-sky-500 h-10 ml-5 cursor-pointer"
        />
      </h3>
      <div
        class="mt-5 w-full border-b-2 h-12 border-gray-400 flex justify-start items-baseline"
      >
        <div
          v-for="(section, i) in sections"
          :key="i"
          @click="setSection(section)"
          :class="activeSection == section ? 'bg-white' : ''"
          class="rounded-t-xl border-t-2 border-l-2 border-r-2 border-gray-400 w-40 h-12 flex justify-center items-center"
        >
          {{ section }}
        </div>
      </div>

      <div class="w-full" v-if="activeSection == 'Principal'">
        <ResultsComp :data="sala.results"></ResultsComp>
      </div>

      <div class="w-full p-10" v-if="activeSection == 'Levantamiento'">
        <!--<h2 class="text-2xl mb-10">Infraestructura</h2>-->
        <div class="flex text-xl">
          Orientacion respecto al norte: {{ sala.estructura.orientacion }}°
        </div>
        <h3 class="text-2xl mb-10">Envolvente</h3>

        <div class="flex">
          <table class="min-w-full">
            <thead class="border-b">
              <tr class="bg-teal-500 h-10">
                <th style="font-family: CooperHewittTitle">Orientación</th>
                <th style="font-family: CooperHewittTitle">Longitud</th>
                <th style="font-family: CooperHewittTitle">Alto</th>
                <th style="font-family: CooperHewittTitle">
                  Solucion constructiva
                </th>
                <th style="font-family: CooperHewittTitle">% de vanos</th>
                <th style="font-family: CooperHewittTitle">
                  ventanas practicables
                </th>
                <th style="font-family: CooperHewittTitle">
                  Condición de borde
                </th>
                <th style="font-family: CooperHewittTitle">Soleado</th>
                <th style="font-family: CooperHewittTitle">Aislante</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ori, index) in sala.estructura.muros" :key="index">
                <td style="font-family: CooperHewittTitle" class="bg-teal-300">
                  {{ index }}
                </td>
                <td>{{ ori.largo }} m</td>
                <td>{{ ori.alto }} m</td>
                <td>{{ ori.solucion }}</td>
                <td>{{ ori.vano }}%</td>
                <td>{{ ori.ventanasPracticables ? "Sí" : "No" }}</td>
                <td>{{ ori.condicion }}</td>
                <td>{{ ori.soleado ? "Sí" : "No" }}</td>
                <td>{{ ori.aislacion ? "Sí" : "No" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-2xl mb-10 mt-10">Tecnologías</h3>
        <div class="flex flex-wrap">
          <table class="min-w-full">
            <thead class="border-b">
              <tr class="bg-teal-500 h-10">
                <th style="font-family: CooperHewittTitle">Tecnología</th>
                <th style="font-family: CooperHewittTitle">Tiene</th>
                <th style="font-family: CooperHewittTitle">Tipo</th>
                <th style="font-family: CooperHewittTitle">Marca</th>
                <th style="font-family: CooperHewittTitle">Modelo</th>
                <th style="font-family: CooperHewittTitle">Potencia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bg-teal-300" style="font-family: CooperHewittTitle">
                  Aire acondicionado
                </td>
                <td>
                  {{
                    sala.datosIniciales.aireAcondicionado.estado ? "Sí" : "No"
                  }}
                </td>
                <td>{{ sala.datosIniciales.aireAcondicionado.tipo }}</td>
                <td>{{ sala.datosIniciales.aireAcondicionado.marca }}</td>
                <td>{{ sala.datosIniciales.aireAcondicionado.modelo }}</td>
                <td>{{ sala.datosIniciales.aireAcondicionado.potencia }}</td>
              </tr>
              <tr>
                <td class="bg-teal-300" style="font-family: CooperHewittTitle">
                  Calefacción
                </td>
                <td>
                  {{ sala.datosIniciales.calefaccion.estado ? "Sí" : "No" }}
                </td>
                <td>{{ sala.datosIniciales.calefaccion.tipo }}</td>
                <td>{{ sala.datosIniciales.calefaccion.marca }}</td>
                <td>{{ sala.datosIniciales.calefaccion.modelo }}</td>
                <td>{{ sala.datosIniciales.calefaccion.potencia }}</td>
              </tr>
            </tbody>
          </table>
          <table class="min-w-full mt-10">
            <thead>
              <tr class="bg-teal-500 h-10">
                <th></th>
                <th style="font-family: CooperHewittTitle">Tipo</th>
                <th style="font-family: CooperHewittTitle">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-family: CooperHewittTitle" class="bg-teal-300">
                  Luminaria
                </td>
                <td>
                  {{ sala.datosIniciales.luminaria.tipo }}
                </td>
                <td>
                  {{ sala.datosIniciales.luminaria.cantidad }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-2xl mb-10 mt-10">Mediciones estáticas</h3>
        <div class="flex">
          <table class="min-w-full">
            <thead class="border-b">
              <tr class="bg-teal-500">
                <th style="font-family: CooperHewittTitle">Tipo de medición</th>
                <th style="font-family: CooperHewittTitle">Medición</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bg-teal-300" style="font-family: CooperHewittTitle">
                  Iluminación en pizarra
                </td>
                <td>{{ sala.datosIniciales.iluminacionPizarra }} Lx</td>
              </tr>
              <tr>
                <td class="bg-teal-300" style="font-family: CooperHewittTitle">
                  Iluminación en plano de trabajo
                </td>
                <td>{{ sala.datosIniciales.iluminacionPlano }} Lx</td>
              </tr>
              <tr>
                <td class="bg-teal-300" style="font-family: CooperHewittTitle">
                  Inteligibilidad
                </td>
                <td>{{ sala.datosIniciales.inteligibilidad }} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-full p-10" v-if="activeSection == 'Mejoras'">
        <h3 class="text-2xl mb-10">Problemas detectados</h3>
        <div v-for="problemaID in sala.problemas" :key="problemaID">
          <div
            class="w-full bg-slate-500 text-white flex h-10 justify-start items-center shadow-md mb-3 p-5"
          >
            <div class="w-30">
              {{ problemas.find((p) => p.id == problemaID).nombre }}
            </div>
          </div>
          <div class="text-justify px-10 mb-5">
            <h3 class="mt-10">Porqué es un problema</h3>
            {{ problemas.find((p) => p.id == problemaID).descripcion }}
            <h3 class="mt-10 mb-3">Soluciones posibles</h3>
            <div class="w-full flex justify-start">
              <div
                class="bg-sky-600 ml-3 text-white h-14 rounded-full flex justify-center items-center cursor-pointer"
                style="width: 30%"
                v-for="(mejoraID, i) in problemas.find(
                  (p) => p.id == problemaID
                ).mejoras"
                :key="i"
                @click="activeMejora = mejoras.find((x) => x.id == mejoraID)"
              >
                <img
                  :src="mejoras.find((x) => x.id == mejoraID).icono"
                  class="h-12 mr-3"
                  alt=""
                />
                {{ mejoras.find((x) => x.id == mejoraID).nombre }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full p-10" v-if="activeSection == 'Horario'">
        <h3 class="text-2xl mb-10">Horario de uso de la sala</h3>
        <div class="grid grid-cols-8 gap-x-1">
          <div class="pt-[40px] border-r">
            <h4></h4>
            <div style="height: 25px" v-for="i in 32" :key="i">
              {{ getTime(i) }}
            </div>
          </div>
          <div
            class="relative border-l px-1"
            v-for="(wd, d) in diasSemana"
            :key="d"
          >
            <h4 class="w-full border-b">{{ wd }}</h4>
            <div
              class="bg-lime-200 absolute w-full flex justify-center items-center"
              v-for="(block, i) in getBlocks(sala.horario[d])"
              :key="i"
              :style="{
                top: block.hi * 12.5 - 212.5 + 'px',
                height: block.d * 12.5 + 'px',
              }"
            >
              <CheckCircleIcon class="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full p-10" v-if="activeSection == 'Mediciones'">
        <div class="w-full h-14 m-3 flex justify-center items-center">
          <div
            class="bg-white flex justify-center items-center mx-10 shadow-md w-40 h-10 rounded-full border-2 border-sky-500 hover:bg-sky-500 hover:text-white cursor-pointer"
            @click="dimTemp = 'anyo'"
            :class="{
              'bg-sky-500': dimTemp == 'anyo',
              'text-white': dimTemp == 'anyo',
            }"
          >
            Año
          </div>
          <div
            class="bg-white flex justify-center items-center mx-10 shadow-md w-40 h-10 rounded-full border-2 border-sky-500 hover:bg-sky-500 hover:text-white cursor-pointer"
            @click="dimTemp = 'semana'"
            :class="{
              'bg-sky-500': dimTemp == 'semana',
              'text-white': dimTemp == 'semana',
            }"
          >
            Semana
          </div>
          <div
            class="bg-white flex justify-center items-center mx-10 shadow-md w-40 h-10 rounded-full border-2 border-sky-500 hover:bg-sky-500 hover:text-white cursor-pointer"
            @click="dimTemp = 'dia'"
            :class="{
              'bg-sky-500': dimTemp == 'dia',
              'text-white': dimTemp == 'dia',
            }"
          >
            Día
          </div>
        </div>
        <div class="w-full h-10 my-3 flex justify-center items-center">
          <div class="mr-3 h-full">
            <ChevronDoubleLeftIcon
              @click="movefirstMoment(-1)"
              class="h-full text-slate-700 cursor-pointer"
            />
          </div>
          <div class="h-full flex items-center justify-center">
            {{ getTimeName(dimTemp, firstMoment) }}
          </div>
          <div class="ml-3 h-full">
            <ChevronDoubleRightIcon
              @click="movefirstMoment(1)"
              class="h-full text-slate-700 cursor-pointer"
            />
          </div>
        </div>
        <div class="h-60 flex justify-start items-start">
          <div class="h-3/4 p-10 w-1/5">
            <img
              src="@/assets/img/icono_sensor_calor.svg"
              class="h-full"
              alt=""
            />
            <div
              class="flex h-1/4 justify-center items-center mt-5 border-2 border-sky-500 rounded-full p-3"
            >
              {{ sala.series.temperatura.at(-1).toFixed(2).replace(".", ",") }}
              °C
            </div>
          </div>
          <div class="h-full w-4/5">
            <SeriesChart
              :seriesData="sala.series.temperatura"
              :timeData="sala.series.tiempo"
              :color="'#000'"
              :decimales="1"
              :unidad="'°C'"
              :ventana="dimTemp"
              :firstMoment="firstMoment"
              :yRange="[0, 40]"
              :bloquesHorarios="sala.tiempoUso"
              :confortBands="[
                {
                  color: colors[0],
                  lineColor: lineColors[0],
                  range: [limitValues.frio[0], limitValues.calor[0]],
                },
                {
                  color: colors[1],
                  lineColor: lineColors[1],
                  range: [limitValues.frio[1], limitValues.frio[0]],
                },
                {
                  color: colors[2],
                  lineColor: lineColors[2],
                  range: [limitValues.frio[2], limitValues.frio[1]],
                },
                {
                  color: colors[3],
                  lineColor: lineColors[3],
                  range: [-20, limitValues.frio[2]],
                },
                {
                  color: colors[1],
                  lineColor: lineColors[1],
                  range: [limitValues.calor[0], limitValues.calor[1]],
                },
                {
                  color: colors[2],
                  lineColor: lineColors[2],
                  range: [limitValues.calor[1], limitValues.calor[2]],
                },
                {
                  color: colors[3],
                  lineColor: lineColors[3],
                  range: [limitValues.calor[2], 100],
                },
              ]"
            ></SeriesChart>
          </div>
        </div>
        <div class="h-60 flex justify-start items-start">
          <div class="h-3/4 p-10 w-1/5">
            <img
              src="@/assets/img/icono_sensor_humedad.svg"
              class="h-full"
              alt=""
            />
            <div
              class="flex h-1/4 justify-center items-center mt-5 border-2 border-sky-500 rounded-full p-3"
            >
              {{ sala.series.humedad.at(-1).toFixed(2).replace(".", ",") }} %
            </div>
          </div>
          <div class="h-full w-4/5">
            <SeriesChart
              :seriesData="sala.series.humedad"
              :timeData="sala.series.tiempo"
              :color="'#000'"
              :decimales="1"
              :unidad="'%'"
              :ventana="dimTemp"
              :firstMoment="firstMoment"
              :yRange="[0, 100]"
              :bloquesHorarios="sala.tiempoUso"
              :confortBands="[
                {
                  color: colors[0],
                  lineColor: lineColors[0],
                  range: [0, limitValues.humedad[0]],
                },
                {
                  color: colors[1],
                  lineColor: lineColors[1],
                  range: [limitValues.humedad[0], limitValues.humedad[1]],
                },
                {
                  color: colors[2],
                  lineColor: lineColors[2],
                  range: [limitValues.humedad[1], limitValues.humedad[2]],
                },
                {
                  color: colors[3],
                  lineColor: lineColors[3],
                  range: [limitValues.humedad[2], 100],
                },
              ]"
            ></SeriesChart>
          </div>
        </div>
        <div class="h-60 flex justify-start items-start">
          <div class="h-3/4 p-10 w-1/5">
            <img
              src="@/assets/img/icono_sensor_co2.svg"
              class="h-full"
              alt=""
            />
            <div
              class="flex h-1/4 justify-center items-center mt-5 border-2 border-sky-500 rounded-full p-3"
            >
              {{ sala.series.co2.at(-1).toFixed(2).replace(".", ",") }}ppm
            </div>
          </div>
          <div class="h-full w-4/5">
            <SeriesChart
              :seriesData="sala.series.co2"
              :timeData="sala.series.tiempo"
              :color="'#000'"
              :decimales="1"
              :unidad="'ppm'"
              :ventana="dimTemp"
              :firstMoment="firstMoment"
              :yRange="[0, 5000]"
              :bloquesHorarios="sala.tiempoUso"
              :confortBands="[
                {
                  color: colors[0],
                  lineColor: lineColors[0],
                  range: [0, limitValues.co2[0]],
                },
                {
                  color: colors[1],
                  lineColor: lineColors[1],
                  range: [limitValues.co2[0], limitValues.co2[1]],
                },
                {
                  color: colors[2],
                  lineColor: lineColors[2],
                  range: [limitValues.co2[1], limitValues.co2[2]],
                },
                {
                  color: colors[3],
                  lineColor: lineColors[3],
                  range: [limitValues.co2[2], 10000],
                },
              ]"
            ></SeriesChart>
          </div>
        </div>
        <div class="h-60 flex justify-start items-start">
          <div class="h-3/4 p-10 w-1/5">
            <img
              src="@/assets/img/icono_sensor_ruido.svg"
              class="h-full"
              alt=""
            />
            <div
              class="flex h-1/4 justify-center items-center mt-5 border-2 border-sky-500 rounded-full p-3"
            >
              {{ sala.series.ruido.at(-1).toFixed(2).replace(".", ",") }} db
            </div>
          </div>
          <div class="h-full w-4/5">
            <SeriesChart
              :seriesData="sala.series.ruido"
              :timeData="sala.series.tiempo"
              :color="'#000'"
              :decimales="1"
              :unidad="'db'"
              :ventana="dimTemp"
              :firstMoment="firstMoment"
              :yRange="[0, 100]"
              :bloquesHorarios="sala.tiempoUso"
              :confortBands="[
                {
                  color: colors[0],
                  lineColor: lineColors[0],
                  range: [0, limitValues.ruido[0]],
                },
                {
                  color: colors[1],
                  lineColor: lineColors[1],
                  range: [limitValues.ruido[0], limitValues.ruido[1]],
                },
                {
                  color: colors[2],
                  lineColor: lineColors[2],
                  range: [limitValues.ruido[1], limitValues.ruido[2]],
                },
                {
                  color: colors[3],
                  lineColor: lineColors[3],
                  range: [limitValues.ruido[2], 100],
                },
              ]"
            ></SeriesChart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, watch, computed } from "vue"
import ComfortBar from "./charts/ComfortBar.vue"
import LeyendaComp from "./LeyendaComp.vue"
import { useRoute } from "vue-router"
import ResultsComp from "./ResultsComp.vue"
import {
  PencilAltIcon,
  CheckCircleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  XCircleIcon,
} from "@heroicons/vue/solid"
import moment from "moment"
import SeriesChart from "./charts/SeriesChart.vue"
const limitValues = ref(inject("limitValues"))
const lineColors = ["#8CC63F", "#FAEC21", "#F5911E", "#BF272D"]
const colors = ref(["#f4ffe6", "#fffdd9", "#fff2e3", "#ffe6e7"])
const activeSection = ref()
activeSection.value = location.hash ? location.hash.substring(1) : "Principal"

function getBlocks(timeStrip) {
  let blocks = []
  let hi = 0
  let block = { hi: 0, d: 0 }
  for (let i = 0; i < timeStrip.length; i++) {
    if (i == 0 && timeStrip[i] == 1) {
      block = { hi: i, d: 0 }
    }
    if (i > 0) {
      if (timeStrip[i] == 1 && timeStrip[i - 1] == 0) {
        block = { hi: i, d: 0 }
      }
    }
    if (
      (timeStrip[i] == 1 && timeStrip[i + 1] == 0) ||
      i == timeStrip.legth - 1
    ) {
      block.d = i + 1 - block.hi
      blocks.push(block)
    }
  }
  return blocks
}

const activeMejora = ref()

function getTime(i) {
  return moment(new Date().setHours(6, 0, 0))
    .add(i * 30, "minute")
    .format("HH:mm")
}

watch(activeSection, (val) => {
  location.hash = val
})

function setSection(section) {
  activeSection.value = section
  location.hash = section
}

const dimTemp = ref("dia")

const router = useRoute()

const firstMoment = ref(moment(new Date().setHours(0, 0, 0)))

const diasSemana = ref([
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
])

const sections = ref([
  "Principal", //datos generales, mejoras sugeridas
  "Mejoras",
  "Mediciones",
  "Levantamiento",
  "Horario",
])

const confort_types = ref([
  "general",
  "calor",
  "frio",
  "co2",
  "humedad",
  "ruido",
])

const iconos = ref({
  general: new URL("../assets/img/icono_silla_gris.svg", import.meta.url).href,
  frio: new URL("../assets/img/icono_frio_gris.svg", import.meta.url).href,
  calor: new URL("../assets/img/icono_calor_gris.svg", import.meta.url).href,
  co2: new URL("../assets/img/icono_co2_gris.svg", import.meta.url).href,
  humedad: new URL("../assets/img/icono_humedad_gris.svg", import.meta.url)
    .href,
  ruido: new URL("../assets/img/icono_ruido_gris.svg", import.meta.url).href,
})

const sala = ref()
const data = inject("data")
const history = inject("router")
const emitter = inject("emitter")

const problemas = ref(data.problemas)
const mejoras = ref(data.mejoras)

console.log(data)

if (!router.params.idSala) {
  history.go("/plataforma/salas/")
  emitter.emit("addAlert", {
    type: "error",
    txt: "No hay sala definida",
  })
}
const salas = data.classrooms
let auxSala = salas.filter((sala) => {
  return sala.id == router.params.idSala
})

if (auxSala.length == 1) {
  sala.value = auxSala[0]
} else {
  history.go("/plataforma/salas/")
  emitter.emit("addAlert", {
    type: "error",
    txt: "La sala seleccionada no existe",
  })
}

watch(dimTemp, function () {
  if (dimTemp.value == "dia") {
    firstMoment.value = moment(new Date().setHours(0, 0, 0))
  }
  if (dimTemp.value == "semana") {
    firstMoment.value = moment(new Date()).startOf("week")
  }
  if (dimTemp.value == "anyo") {
    firstMoment.value = moment(new Date(new Date().getFullYear(), 0, 0))
  }
})

const timeDict = {
  dia: "days",
  semana: "weeks",
  anyo: "years",
}

function movefirstMoment(quantity) {
  firstMoment.value = firstMoment.value
    .clone()
    .add(quantity, timeDict[dimTemp.value])
}

function getTimeName(dimTemp, firstMoment) {
  switch (dimTemp) {
    case "dia":
      if (moment(new Date()).diff(firstMoment, "days") == 0) {
        return "Hoy"
      }
      if (moment(new Date()).diff(firstMoment, "days") == 1) {
        return "Ayer"
      }
      return "Hace " + moment(new Date()).diff(firstMoment, "days") + " días"
    case "semana":
      if (moment(new Date()).diff(firstMoment, "weeks") == 0) {
        //console.log(moment(new Date()).diff(firstMoment, "weeks"))
        return "Esta semana"
      }
      if (moment(new Date()).diff(firstMoment, "weeks") == 1) {
        return "Semana pasada"
      }
      return (
        "Hace " + moment(new Date()).diff(firstMoment, "weeks") + " semanas"
      )
    case "anyo":
      if (moment(new Date()).diff(firstMoment, "years") == 0) {
        return "Este año"
      }
      if (moment(new Date()).diff(firstMoment, "years") == -1) {
        return "Año pasado"
      }
      return "Hace " + moment(new Date()).diff(firstMoment, "years") + " años"
  }
}
</script>
