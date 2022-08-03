<template>
  <div class="root p-20 bg-white">
    <div class="flex flex-wrap">
      <div class="h-min-screen w-3/4" v-if="!selectedClassroom">
        <h3 class="font-ailerons text-4xl bg-white text-left">
          Infraestructura
        </h3>
        <leyenda-comp></leyenda-comp>
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
            label="Ver salas"
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
            Agregar edificio
          </div>
        </div>
        <div class="mt-5 w-full pt-5 px-10 flex flex-wrap justify-center">
          <div
            v-for="(building, i) in orderSpaces(
              filterInfrastructure(infra, search)
            )"
            :key="i"
            class="w-full"
          >
            <div
              v-if="!display_classrooms"
              class="bg-white w-full shadow-xl flex rounded-2xl h-10 mt-5"
            >
              <div class="h-full w-20 rounded-l-2xl bg-gray-400 p-1">
                <img
                  src="@/assets/img/icono_edificio.svg"
                  class="h-full w-full"
                />
              </div>
              <div class="w-10 flex justify-center items-center">
                <div
                  class="h-full bg-teal-500 hover:bg-teal-400 text flex justify-center items-center p-2 w-10 text-white cursor-pointer"
                >
                  +
                </div>
              </div>
              <div
                class="w-40 flex justify-left ml-5 items-center cursor-pointer"
                v-on:click="building.display = !building.display"
              >
                <component
                  :is="building.display ? ChevronDownIcon : ChevronRightIcon"
                  class="h-full text-gray-500"
                >
                </component>
                {{ building.nombre }}
              </div>
              <div class="w-60 flex justify-center items-center mr-20">
                <comfort-bar
                  :data="building.estado[confort_select]"
                ></comfort-bar>
              </div>
              <!--<ClassroomstatsComp
                :stats="building.mensajes"
              ></ClassroomstatsComp>-->
              <div class="grow flex justify-center items-center"></div>
              <router-link
                class="w-24 bg-teal-500 hover:bg-teal-400 text-white rounded-r-full flex justify-center items-center cursor-pointer"
                :to="'/plataforma/salas/'"
                @click="selectStructure('building', building)"
              >
                ver
              </router-link>
            </div>
            <div
              v-if="
                (building.display && !display_classrooms) ||
                (display_classrooms && i == 0)
              "
            >
              <div
                v-for="(floor, j) in orderSpaces(building.pisos)"
                :key="j"
                class="pl-10"
              >
                <div
                  v-if="!display_classrooms"
                  class="bg-white w-full shadow-xl mt-2 flex rounded-2xl h-10"
                >
                  <div class="h-full rounded-l-2xl bg-gray-400 p-3 w-20">
                    <img
                      src="@/assets/img/icono_piso.svg"
                      class="h-full w-full"
                    />
                  </div>
                  <div class="w-10 flex justify-center items-center">
                    <div
                      class="h-full bg-teal-500 hover:bg-teal-400 text flex justify-center items-center p-2 w-10 text-white cursor-pointer"
                    >
                      +
                    </div>
                  </div>
                  <div
                    class="w-40 flex justify-left ml-5 items-center cursor-pointer"
                    v-on:click="floor.display = !floor.display"
                  >
                    <component
                      :is="floor.display ? ChevronDownIcon : ChevronRightIcon"
                      class="h-full text-gray-500"
                    >
                    </component>
                    {{ floor.nombre }}
                  </div>
                  <div class="mr-20 w-60 flex justify-center items-center">
                    <comfort-bar
                      :data="floor.estado[confort_select]"
                    ></comfort-bar>
                  </div>

                  <div class="grow flex justify-center items-center"></div>
                  <router-link
                    class="w-24 bg-teal-500 hover:bg-teal-400 text-white rounded-r-full flex justify-center items-center cursor-pointer"
                    :to="'/plataforma/salas/'"
                    @click="selectStructure('floor', floor)"
                  >
                    ver
                  </router-link>
                </div>
                <div
                  v-if="
                    (floor.display && !display_classrooms) ||
                    (display_classrooms && j == 0)
                  "
                >
                  <div
                    v-for="(classroom, k) in orderClassrooms(
                      filterClassroom(floor.salas, search)
                    )"
                    :key="k"
                    class="pl-10"
                  >
                    <div
                      class="bg-white w-full shadow-xl mt-2 flex rounded-2xl h-10"
                    >
                      <div class="h-full rounded-l-2xl bg-gray-400 p-2 w-20">
                        <img
                          src="@/assets/img/icono_aula.svg"
                          class="h-full w-full"
                        />
                      </div>
                      <div
                        class="w-40 flex justify-left ml-5 items-center cursor-pointer"
                      >
                        {{ classroom.nombre }}
                        <div
                          class="rounded-full h-3 w-3 ml-2"
                          :style="{
                            backgroundColor: classroom.sensorOK
                              ? '#4fd154'
                              : '#d14f4f',
                          }"
                        ></div>
                      </div>
                      <div class="mr-20 w-60 flex justify-center items-center">
                        <comfort-bar
                          :data="classroom.estado[confort_select]"
                        ></comfort-bar>
                      </div>
                      <ClassroomstatsComp
                        :stats="classroom.mensajes"
                      ></ClassroomstatsComp>
                      <div class="grow flex justify-center items-center"></div>
                      <router-link
                        class="w-24 bg-teal-500 hover:bg-teal-400 text-white rounded-r-full flex justify-center items-center cursor-pointer"
                        :to="'/plataforma/salas/ver/' + classroom.id"
                        @click="selectStructure('classroom', classroom)"
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
      <div class="h-min-screen w-3/4" v-if="selectedClassroom">
        <ClassroomviewPage></ClassroomviewPage>
      </div>
      <div class="h-screen w-1/4 fixed right-0 top-0 bg-gray-100 p-10">
        <div v-if="selectedStructure">
          <div class="flex w-full mt-10 justify-center items-center">
            <div class="h-60 w-60 bg-slate-300 rounded-full"></div>
          </div>
          <div class="flex w-full mt-10 mb-5 justify-center items-center">
            <h3 class="text-2xl text-gray-600 flex">
              {{ selectedStructure.nombre }}
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
              <comfort-bar :data="selectedStructure.estado[type]"></comfort-bar>
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
} from "@heroicons/vue/solid"

//TODO: Hacer una funcion que ordene por confort y que me devuelva el array ordenado
const data = inject("data")
console.log(data)

const search = ref("")
const selectedStructure = ref()
const selectedStructureType = ref()
function selectStructure(type, obj) {
  selectedStructureType.value = type
  selectedStructure.value = obj
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

function filterInfrastructure(infrastructures, filter) {
  if (!display_classrooms.value) {
    return infrastructures.filter((infrastructure) => {
      return infrastructure.nombre.toLowerCase().includes(filter.toLowerCase())
    })
  } else {
    return infrastructures
  }
}
function filterClassroom(classrooms, filter) {
  if (display_classrooms.value) {
    return salas.value.filter((classroom) => {
      return classroom.nombre.toLowerCase().includes(filter.toLowerCase())
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
const salas = ref([])

const selectedClassroom = ref(
  router.params.idSala ? router.params.idSala : null
)

watch(router, (newVal) => {
  selectedClassroom.value = router.params.idSala
})

data.school.edificios.map((edificio) => {
  edificio.pisos.map((piso) => {
    piso.salas.map((sala) => {
      salas.value.push(sala)
    })
  })
})

if (router.params.idSala) {
  selectedStructure.value = salas.value.filter((sala) => {
    return sala.id == router.params.idSala
  })[0]
}
</script>
