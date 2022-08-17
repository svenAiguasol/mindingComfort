<template>
  <div class="relative p-10 bg-white">
    <div class="h-min-screen w-full bg-white">
      <h3 class="font-ailerons text-4xl bg-white text-left flex mb-10">
        Administrador
      </h3>
      <div
        class="mt-5 w-full border-b-2 h-12 border-gray-400 flex justify-start items-baseline"
      >
        <div
          v-for="(section, i) in sections"
          :key="i"
          @click="setSection(section)"
          :class="activeSection == section ? 'bg-white' : ''"
          class="rounded-t-xl border-t-2 border-l-2 border-r-2 border-gray-400 w-40 h-12 flex justify-center items-center cursor-pointer"
        >
          {{ section }}
        </div>
      </div>

      <div
        v-if="activeSection == 'Profesores'"
        class="p-20 flex flex-wrap justify-center"
      >
        <h3 class="text-2xl w-full">Acceso a la plataforma por profesores</h3>
        <p class="w-1/2 text-small bg-green-300 rounded-xl p-5 mt-8 mb-8">
          A continuación puedes revisar si los profesores acceden a la
          plataforma y puedes gestionar los permisos que tienen para acceder a
          la plataforma. <br />
          <br />
          <b style="font-family: CooperHewittTitle">
            Click en el nivel para desplegar a los profesores
          </b>
        </p>
        <div class="flex flex-wrap justify-center items-start">
          <div class="w-full" v-for="(nivel, n) in niveles" :key="n">
            <h3
              class="w-full text-left text-xl flex items-center justify-start cursor-pointer mb-5 bg-slate-300 py-1 px-2 rounded-full"
              @click="nivel.display = !nivel.display"
            >
              <component
                :is="nivel.display ? ChevronDownIcon : ChevronRightIcon"
                class="text-gray-500 h-5 w-5 inline-block"
              >
              </component>
              <a> {{ nivel.nombre }}</a>
            </h3>
            <table class="min-w-full mb-5" v-if="nivel.display">
              <thead class="border-b">
                <tr class="bg-teal-500 h-10 text-white">
                  <th>Curso</th>
                  <th>Nombre</th>
                  <th>Información de contacto actualizada</th>
                  <th>Tipo de acceso</th>
                  <th>Último acceso</th>
                  <th>Último reporte enviado</th>
                  <th>Abrió el último reporte</th>
                </tr>
              </thead>
              <tbody>
                <tr class="h-12" v-for="(curso, c) in nivel.niveles" :key="c">
                  <td>{{ curso.nombre }}</td>
                  <td class="text-left">
                    {{ curso.profesorJefe.nombre }}
                    {{ curso.profesorJefe.apellido }}
                  </td>
                  <td>Sí</td>
                  <td>
                    <a
                      class="cursor-pointer border-2 text-teal-500 border-teal-500 p-2 hover:text-white hover:bg-teal-500 rounded-full h-10"
                      >Usuario normal</a
                    >
                  </td>
                  <td>ayer</td>
                  <td>la semana pasada</td>
                  <td>Sí</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        v-if="activeSection == 'Apoderados'"
        class="p-20 flex flex-wrap justify-center items-start"
      >
        <h3 class="text-2xl w-full">Acceso a la plataforma por apoderados</h3>
        <p class="w-1/2 text-small bg-green-300 rounded-xl p-5 mt-8 mb-8">
          El acceso por defecto de los apoderados a la plataforma es a través
          del rut de su pupilo como usuario y la contraseña por defecto es la
          fecha de nacimiento sólo en números en formato ddmmaaaa, (ejemplo,
          25/07/2015 => 25072015).
        </p>
        <div class="flex flex-wrap justify-center items-start">
          <div class="w-full" v-for="(nivel, n) in niveles" :key="n">
            <div v-for="(curso, c) in nivel.niveles" :key="c">
              <h3
                class="w-full text-left text-xl flex items-center justify-start cursor-pointer mb-5 bg-slate-300 py-1 px-2 rounded-full"
                @click="curso.display = !curso.display"
              >
                <component
                  :is="curso.display ? ChevronDownIcon : ChevronRightIcon"
                  class="text-gray-500 h-5 w-5 inline-block"
                >
                </component>
                <a> {{ curso.nombre }}</a>
              </h3>
              <table class="min-w-full mb-5" v-if="curso.display">
                <thead class="border-b">
                  <tr class="bg-teal-500 h-10 text-white">
                    <th>Nombre Alumno</th>
                    <th>Nombre Apoderad@</th>
                    <th>Información de contacto actualizada</th>
                    <th>Activar acceso</th>
                    <th>Último acceso</th>
                    <th>Último reporte enviado</th>
                    <th>Abrió el último reporte</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="h-12"
                    v-for="(alumno, a) in curso.alumnos"
                    :key="a"
                  >
                    <td class="text-left">
                      {{ alumno.nombre }}
                      {{ alumno.apellidoPaterno }}
                      {{ alumno.apellidoMaterno }}
                    </td>
                    <td>
                      {{
                        alumno.apoderado == 0
                          ? alumno.madre.nombre
                          : alumno.padre.nombre
                      }}
                    </td>
                    <td>Sí</td>
                    <td>
                      <SlidecheckComp
                        v-model="alumno.isActive"
                        :label="''"
                      ></SlidecheckComp>
                    </td>
                    <td>ayer</td>
                    <td>la semana pasada</td>
                    <td>Sí</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
  ChevronRightIcon,
  ChevronDownIcon,
  SearchIcon,
  PencilAltIcon,
  UserIcon,
} from "@heroicons/vue/solid"
import moment from "moment"
import SeriesChart from "./charts/SeriesChart.vue"
import SlidecheckComp from "./forms/SlidecheckComp.vue"

function setSection(section) {
  activeSection.value = section
  location.hash = section
}

const isActive = ref(true)
const activeSection = ref()
activeSection.value = location.hash ? location.hash.substring(1) : "Profesores"

const sections = ["Profesores", "Apoderados"]

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
const profesores = ref(data.teachers)
const niveles = ref(data.niveles)
const alumnos = ref(data.students)
//console.log(data)
</script>
