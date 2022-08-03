<template>
  <div>
    <div class="h-min-screen w-full">
      <h3 class="font-ailerons text-4xl bg-white text-left flex">
        {{ sala.nombre }} <PencilAltIcon class="text-sky-500 h-10 ml-5" />
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

      <div class="w-full p-10" v-if="activeSection == 'Datos iniciales'">
        <!--<h2 class="text-2xl mb-10">Infraestructura</h2>-->
        <div class="flex text-xl">
          Orientacion respecto al norte: {{ sala.estructura.orientacion }}°
        </div>
        <h3 class="text-2xl mb-10">Envolvente</h3>

        <div class="flex">
          <table class="min-w-full">
            <thead class="border-b">
              <tr>
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
                <td style="font-family: CooperHewittTitle">{{ index }}</td>
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
              <tr>
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
                <td>Aire acondicionado</td>
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
                <td>Calefacción</td>
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
            <tbody>
              <tr>
                <td style="font-family: CooperHewittTitle">Tipo luminaria</td>
                <td>
                  {{ sala.datosIniciales.luminaria }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-2xl mb-10 mt-10">Mediciones estáticas</h3>
        <div class="flex">
          <table class="min-w-full">
            <thead class="border-b">
              <tr>
                <th style="font-family: CooperHewittTitle">Tipo de medición</th>
                <th style="font-family: CooperHewittTitle">Medición</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Iluminación en pizarra</td>
                <td>{{ sala.datosIniciales.iluminacionPizarra }} Lx</td>
              </tr>
              <tr>
                <td>Iluminación en plano de trabajo</td>
                <td>{{ sala.datosIniciales.iluminacionPlano }} Lx</td>
              </tr>
              <tr>
                <td>Inteligibilidad</td>
                <td>{{ sala.datosIniciales.inteligibilidad }} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from "vue"
import ComfortBar from "./charts/ComfortBar.vue"
import LeyendaComp from "./LeyendaComp.vue"
import { useRoute } from "vue-router"
import ResultsComp from "./ResultsComp.vue"
import { PencilAltIcon } from "@heroicons/vue/solid"

function setSection(section) {
  this.activeSection = section
}

const router = useRoute()
const activeSection = ref(router.query.section || "Principal")
const sections = ref([
  "Principal", //datos generales, mejoras sugeridas
  "Personas",
  "Datos iniciales",
  "Mejoras",
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

console.log(auxSala)
</script>
