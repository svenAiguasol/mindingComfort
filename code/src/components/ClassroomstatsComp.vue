<template>
  <div class="w-30 flex items-center">
    <div class="bg-slate-400 h-full flex justify-center items-center p-1">
      <Popper
        hover
        openDelay="200"
        closeDelay="100"
        style="border: none; margin: 0"
      >
        <ExclamationCircleIcon class="text-white h-7" />
        <template #content>
          <div class="popupbox">
            Cantidad de alertas críticas de los últimos 5 días
          </div>
        </template>
      </Popper>
    </div>
    <div class="bg-white w-10 h-full flex justify-center items-center p-1">
      {{ data.mensajes.alerts }}
    </div>
    <Popper
      hover
      openDelay="200"
      closeDelay="100"
      style="border: none; margin: 0, padding:0"
    >
      <div class="h-10 w-10 p-0 flex justify-center items-center">
        <div
          class="h-10 w-10 border-2 border-green-500 p-3 rounded-full bg-white text-sm flex justify-center items-center"
        >
          {{
            formatNumber(
              data.results.presente.salud[new Date().getMonth() - 1],
              0
            )
          }}%
        </div>
      </div>
      <template #content>
        <div class="popupbox">Presencia escolar de este mes</div>
      </template>
    </Popper>
    <Popper
      hover
      openDelay="200"
      closeDelay="100"
      style="border: none; margin: 0, padding:0"
    >
      <div class="h-10 w-10 p-0 flex justify-center items-center">
        <div
          class="h-10 w-10 border-2 border-violet-500 rounded-full bg-white text-sm flex justify-center items-center"
        >
          {{
            formatNumber(
              data.results.presente.notas[new Date().getMonth() - 1],
              1
            )
          }}
        </div>
      </div>
      <template #content>
        <div class="popupbox">Resultados académicos de este mes</div>
      </template>
    </Popper>
    <Popper
      hover
      openDelay="200"
      closeDelay="100"
      style="border: none; margin: 0, padding:0"
    >
      <div class="h-10 w-10 p-0 flex justify-center items-center">
        <div
          class="h-10 w-10 border-2 border-sky-500 rounded-full bg-white text-sm flex justify-center items-center"
        >
          {{
            formatNumber(
              data.results.presente.mental[new Date().getMonth() - 1],
              1
            )
          }}
        </div>
      </div>
      <template #content>
        <div class="popupbox">Salud mental de este mes</div>
      </template>
    </Popper>

    <!--<div class="bg-slate-400 h-full flex justify-center items-center p-1">
        <UserIcon class="text-white h-7" />
        <div class="h-5 w-5 overflow-hidden relative mr-1">
          <div class="h-5 w-5 flex justify-center items-center">
            <PlusIcon class="text-white h-20 absolute" />
          </div>
        </div>
      </div>-->

    <!--<div class="bg-white w-10 h-full flex justify-center items-center p-1">
      {{ stats.enfermos }}
    </div>
    <Popper
      hover
      openDelay="200"
      closeDelay="100"
      style="border: none; margin: 0, padding:0"
    >
      <div class="bg-slate-400 h-full flex justify-center items-center p-1">
        <BriefcaseIcon class="text-white h-7" />
        <div class="h-5 w-5 overflow-hidden relative mr-1">
          <div class="h-5 w-5 flex justify-center items-center">
            <PlusIcon class="text-white h-20 absolute" />
          </div>
        </div>
      </div>
      <template #content>
        <div class="popupbox">
          Cantidad de licencias presentadas por profesores que usan
          habitualmente de esta sala
        </div>
      </template>
    </Popper>
    <div class="bg-white w-10 h-full flex justify-center items-center p-1">
      {{ stats.licencias }}
    </div>
    <Popper
      hover
      openDelay="200"
      closeDelay="100"
      style="border: none; margin: 0, padding:0"
    >
      <div class="bg-slate-400 h-full flex justify-center items-center p-1">
        <BadgeCheckIcon class="text-white h-7" />
      </div>
      <template #content>
        <div class="popupbox">
          Desviación de las notas de los alumnos del mismo nivel durante el
          ciclo escolar
        </div>
      </template>
    </Popper>
    <div class="bg-white w-10 h-full flex justify-center items-center p-1">
      {{ stats.notas }}
    </div>-->
  </div>
</template>
<script setup>
import { ref } from "vue"
import Popper from "vue3-popper"

import {
  ExclamationCircleIcon,
  HeartIcon,
  UserIcon,
  UserGroupIcon,
  PlusIcon,
  BriefcaseIcon,
  BadgeCheckIcon,
} from "@heroicons/vue/solid"

const props = defineProps(["data"])
const data = props.data

function formatNumber(n, d) {
  return n.toFixed(d).toString().replace(".", ",")
}
</script>
