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
            Cantidad de alertas críticas acumuladas hasta el momento
          </div>
        </template>
      </Popper>
    </div>
    <div class="bg-white w-10 h-full flex justify-center items-center p-1">
      {{ stats.alerts }}
    </div>
    <Popper
      hover
      openDelay="200"
      closeDelay="100"
      style="border: none; margin: 0, padding:0"
    >
      <div class="bg-slate-400 h-full flex justify-center items-center p-1">
        <UserIcon class="text-white h-7" />
        <div class="h-5 w-5 overflow-hidden relative mr-1">
          <div class="h-5 w-5 flex justify-center items-center">
            <PlusIcon class="text-white h-20 absolute" />
          </div>
        </div>
      </div>
      <template #content>
        <div class="popupbox">
          Cantidad de alumnos enfermos acumulados durante el ciclo escolar
        </div>
      </template>
    </Popper>
    <div class="bg-white w-10 h-full flex justify-center items-center p-1">
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
    </div>
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

const props = defineProps(["stats"])
const stats = props.stats
</script>
