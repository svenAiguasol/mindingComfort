<template>
  <div class="root p-20 bg-white">
    <div class="flex flex-wrap">
      <div class="h-min-screen w-3/4" v-if="!selectedClassroom">
        <h3 class="font-ailerons text-4xl bg-white text-left">Personas</h3>
        <leyenda-comp></leyenda-comp>

        <div class="w-full mt-5 px-10 flex justify-center items-center mb-10">
          <div
            class="w-40 h-20 flex justify-center items-center rounded-l-2xl cursor-pointer"
            :style="{
              backgroundColor: mode == 'niveles' ? '#0ea5e9' : '#f3f3f3',
              color: mode == 'niveles' ? '#fff' : '#000',
            }"
            @click="mode = 'niveles'"
          >
            Por niveles
          </div>
          <div
            class="w-40 h-20 flex justify-center items-center rounded-r-2xl cursor-pointer"
            :style="{
              backgroundColor: mode == 'funciones' ? '#0ea5e9' : '#f3f3f3',
              color: mode == 'funciones' ? '#fff' : '#000',
            }"
            @click="mode = 'funciones'"
          >
            Por funciones
          </div>
        </div>
        <div class="w-full mt-5 px-10 flex justify-center items-center">
          <div class="relative mr-5">
            <input
              type="text"
              v-model="search"
              class="h-8 px-5 bg-white border-sky-500 border-2 rounded-full w-[300px] cursor-pointer"
            />
            <SearchIcon class="absolute z-10 right-5 h-6 w-6 top-1" />
          </div>
          <SlidecheckComp
            v-model="display_classrooms"
            label="Ver cursos"
          ></SlidecheckComp>
          <SlidecheckComp
            v-model="order"
            label="order por confort"
          ></SlidecheckComp>

          <div class="flex items-center justify-center">
            <select
              class="h-8 px-5 bg-white border-sky-500 border-2 rounded-full w-[300px]"
              v-model="confort_select"
            >
              <option
                v-for="(confort_type, i) in confort_types"
                :key="i"
                :value="confort_type"
              >
                {{ confort_type }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <div
            class="mt-5 h-8 w-1/3 px-10 cursor-pointer flex items-center bg-teal-500 rounded-full justify-center hover:bg-teal-400 text-white"
          >
            Agregar curso
          </div>
        </div>
        <div class="mt-5 w-full pt-5 px-10 flex flex-wrap justify-center">
          <div
            v-for="(nivel, i) in orderSpaces(filterLevels(niveles, search))"
            :key="i"
            class="w-full"
          >
            <div
              v-if="!display_classrooms"
              class="bg-white w-full shadow-xl flex rounded-2xl h-10 mt-5"
            >
              <div class="h-full w-20 rounded-l-2xl bg-gray-400 p-1"></div>
              <div class="w-10 flex justify-center items-center">
                <div
                  class="h-full bg-teal-500 hover:bg-teal-400 text flex justify-center items-center p-2 w-10 text-white cursor-pointer"
                >
                  +
                </div>
              </div>
              <div
                class="w-40 flex justify-left ml-5 items-center cursor-pointer"
                v-on:click="nivel.display = !nivel.display"
              >
                <component
                  :is="nivel.display ? ChevronDownIcon : ChevronRightIcon"
                  class="h-full text-gray-500"
                >
                </component>
                {{ nivel.nombre }}
              </div>
              <div class="w-60 flex justify-center items-center mr-20">
                <!--<comfort-bar
                  :data="nivel.estado[confort_select]"
                ></comfort-bar>-->
              </div>
              <div class="grow flex justify-center items-center"></div>
              <router-link
                class="w-24 bg-teal-500 hover:bg-teal-400 text-white rounded-r-full flex justify-center items-center cursor-pointer"
                :to="'/plataforma-administrador/salas/'"
                @click="selectPerson('nivel', nivel)"
              >
                ver
              </router-link>
            </div>
            <div v-if="nivel.display">
              <div
                v-for="(curso, j) in orderSpaces(nivel.niveles)"
                :key="j"
                class="pl-10"
              >
                <div
                  class="bg-white w-full shadow-xl mt-2 flex rounded-2xl h-10"
                >
                  <div
                    class="h-full rounded-l-2xl bg-gray-400 w-20 flex justify-center items-center"
                  >
                    <UsersIcon class="h-7 w-7 text-white" />
                  </div>
                  <div class="w-10 flex justify-center items-center">
                    <div
                      class="h-full bg-teal-500 hover:bg-teal-400 text flex justify-center items-center p-2 w-10 text-white cursor-pointer"
                    >
                      +
                    </div>
                  </div>
                  <div
                    class="w-60 flex justify-left ml-5 items-center cursor-pointer"
                    v-on:click="curso.display = !curso.display"
                  >
                    <component
                      :is="curso.display ? ChevronDownIcon : ChevronRightIcon"
                      class="h-full text-gray-500"
                    >
                    </component>
                    {{ curso.nombre }}
                  </div>
                  <div class="flex justify-center items-center mr-10">
                    {{ curso.sala.nombre }}
                  </div>
                  <div class="mr-20 w-60 flex justify-center items-center">
                    <comfort-bar
                      :data="curso.sala.estado[confort_select]"
                    ></comfort-bar>
                  </div>

                  <div class="grow flex justify-center items-center"></div>
                  <router-link
                    class="w-24 bg-teal-500 hover:bg-teal-400 text-white rounded-r-full flex justify-center items-center cursor-pointer"
                    :to="'/plataforma-administrador/salas/'"
                    @click="selectPerson('curso', curso)"
                  >
                    ver
                  </router-link>
                </div>
                <div v-if="curso.display">
                  <div class="pl-10 flex items-center justify-start mt-3">
                    <div
                      class="rounded-full h-14 w-14 p-0 bg-violet-500 mr-10 flex justify-center items-center"
                    >
                      <UserIcon class="h-10 w-10 text-white" />
                    </div>
                    <div
                      class="bg-white w-full shadow-xl mt-2 flex rounded-2xl h-10"
                    >
                      <!--<div class="h-full rounded-l-2xl bg-gray-400 p-2 w-20">
                        <img
                          src="@/assets/img/icono_aula.svg"
                          class="h-full w-full"
                        />
                      </div>-->
                      <div
                        class="w-60 flex justify-left ml-5 items-center cursor-pointer"
                      >
                        {{ curso.profesorJefe.nombre }}
                        {{ curso.profesorJefe.apellido }}
                      </div>
                      <div
                        class="mr-20 w-60 flex justify-center items-center"
                      ></div>
                      <!--<alumnostatsComp
                        :stats="alumno.mensajes"
                      ></alumnostatsComp>-->
                      <div class="grow flex justify-center items-center"></div>
                      <router-link
                        class="w-24 bg-teal-500 hover:bg-teal-400 text-white rounded-r-full flex justify-center items-center cursor-pointer"
                        :to="
                          '/plataforma-administrador/personas/ver/' +
                          curso.profesorJefe.id
                        "
                        @click="selectPerson('profesor', curso.profesorJefe.id)"
                      >
                        ver
                      </router-link>
                    </div>
                  </div>
                  <div
                    v-for="(alumno, k) in orderClassrooms(
                      filterCurso(curso.alumnos, search)
                    )"
                    :key="k"
                    class="pl-10 flex items-center justify-start mt-3"
                  >
                    <div
                      class="rounded-full h-14 w-14 p-0 bg-slate-300 mr-10 flex justify-center items-center"
                    >
                      <UserIcon class="h-10 w-10 text-white" />
                    </div>
                    <div
                      class="bg-white w-full shadow-xl mt-2 flex rounded-2xl h-10"
                    >
                      <!--<div class="h-full rounded-l-2xl bg-gray-400 p-2 w-20">
                        <img
                          src="@/assets/img/icono_aula.svg"
                          class="h-full w-full"
                        />
                      </div>-->
                      <div
                        class="w-60 flex justify-left ml-5 items-center cursor-pointer"
                      >
                        {{ alumno.nombre }} {{ alumno.apellido }}
                      </div>
                      <div
                        class="mr-20 w-60 flex justify-center items-center"
                      ></div>
                      <alumnostatsComp
                        :stats="alumno.mensajes"
                      ></alumnostatsComp>
                      <div class="grow flex justify-center items-center"></div>
                      <router-link
                        class="w-24 bg-teal-500 hover:bg-teal-400 text-white rounded-r-full flex justify-center items-center cursor-pointer"
                        :to="
                          '/plataforma-administrador/personas/ver/' + alumno.id
                        "
                        @click="selectPerson('alumno', alumno)"
                      >
                        ver
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-screen w-1/4 fixed right-0 top-0 bg-gray-100 p-10">
        <div v-if="selectedPerson">
          <div class="flex w-full mt-10 justify-center items-center">
            <div class="h-60 w-60 bg-slate-300 rounded-full"></div>
          </div>
          <div class="flex w-full mt-10 mb-5 justify-center items-center">
            <h3 class="text-2xl text-gray-600 flex">
              {{ selectedPerson.nombre }}
              <a href=""><PencilAltIcon class="h-7 w-7 text-sky-500 ml-2" /></a>
            </h3>
          </div>
          <div></div>
          <div
            v-for="(type, i) in confort_types"
            :key="i"
            class="w-full h-12 flex mt-1 items-center justify-center"
          >
            <div><img class="h-7 w-7" :src="iconos[type]" /></div>
            <div class="h-full w-full">
              <!--<comfort-bar :data="selectedPerson.estado[type]"></comfort-bar>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, watch } from "vue"

import ComfortBar from "./charts/ComfortBar.vue"
import LeyendaComp from "./LeyendaComp.vue"
import ClassroomstatsComp from "./ClassroomstatsComp.vue"
import SlidecheckComp from "./forms/SlidecheckComp.vue"
import ClassroomviewPage from "./ClassroomviewPage.vue"
import { useRoute } from "vue-router"
import {
  ChevronRightIcon,
  ChevronDownIcon,
  SearchIcon,
  PencilAltIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/vue/solid"

//TODO: Hacer una funcion que ordene por confort y que me devuelva el array ordenado
const data = inject("data")
console.log(data)

const mode = ref("niveles") // niveles o funciones

const search = ref("")
const selectedPerson = ref()
const selectedPersonType = ref()
function selectPerson(type, obj) {
  selectedPersonType.value = type
  selectedPerson.value = obj
}

function getScore(arr) {
  const ponds = [1, 0.5, 0.15, 0]
  return (
    arr[0] * ponds[0] +
    arr[1] * ponds[1] +
    arr[2] * ponds[2] +
    arr[3] * ponds[3]
  )
}

function orderClassrooms(classrooms) {
  if (order.value) {
    return classrooms.sort((a, b) => {
      if (
        getScore(a.estado[confort_select.value]) >
        getScore(b.estado[confort_select.value])
      ) {
        return -1
      }
      if (
        getScore(a.estado[confort_select.value]) <
        getScore(b.estado[confort_select.value])
      ) {
        return 1
      }
      return 0
    })
  } else {
    return classrooms
  }
}

function orderSpaces(spaces) {
  if (order.value) {
    return spaces.sort((a, b) => {
      if (
        getScore(a.estado[confort_select.value]) >
        getScore(b.estado[confort_select.value])
      ) {
        return -1
      }
      if (
        getScore(a.estado[confort_select.value]) <
        getScore(b.estado[confort_select.value])
      ) {
        return 1
      }
      return 0
    })
  } else {
    return spaces
  }
}

function filterLevels(Levels, filter) {
  if (!display_classrooms.value) {
    return Levels.filter((Level) => {
      return Level.nombre.toLowerCase().includes(filter.toLowerCase())
    })
  } else {
    return Levels
  }
}
function filterCurso(classrooms, filter) {
  if (display_classrooms.value) {
    return cursos.value.filter((curso) => {
      return curso.nombre.toLowerCase().includes(filter.toLowerCase())
    })
  } else {
    return classrooms
  }
}

const display_classrooms = ref(false)
const order = ref(false)

const confort_types = ref([
  "general",
  "calor",
  "frio",
  "co2",
  "humedad",
  "ruido",
])
const router = useRoute()
const confort_select = ref(
  router.params.confortType ? router.params.confortType : "general"
)

const iconos = ref({
  general: new URL("../assets/img/icono_silla_gris.svg", import.meta.url).href,
  frio: new URL("../assets/img/icono_frio_gris.svg", import.meta.url).href,
  calor: new URL("../assets/img/icono_calor_gris.svg", import.meta.url).href,
  co2: new URL("../assets/img/icono_co2_gris.svg", import.meta.url).href,
  humedad: new URL("../assets/img/icono_humedad_gris.svg", import.meta.url)
    .href,
  ruido: new URL("../assets/img/icono_ruido_gris.svg", import.meta.url).href,
})

const infra = ref(data.school.edificios)
const niveles = ref(data.niveles)
const cursos = ref([])

const selectedClassroom = ref(
  router.params.idSala ? router.params.idSala : null
)

watch(router, (newVal) => {
  selectedClassroom.value = router.params.idSala
})

data.niveles.map((nivel) => {
  nivel.niveles.map((curso) => {
    cursos.value.push(curso)
  })
})

if (router.params.idSala) {
  selectedPerson.value = salas.value.filter((sala) => {
    return sala.id == router.params.idSala
  })[0]
}
</script>
