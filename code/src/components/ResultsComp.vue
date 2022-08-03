<template>
  <div class="w-full flex flex-wrap justify-center items-center mt-10 gap-y-5">
    <div class="h-48 flex w-full px-5">
      <div
        class="h-full rounded-l-xl bg-gradient-to-bl from-lime-700 to-green-500 w-1/6 flex flex-wrap justify-center items-center py-5"
      >
        <div class="w-full flex justify-center">
          <img
            src="@/assets/img/icono_salud.svg"
            class="h-24 fill-white"
            alt=""
          />
        </div>
        <h3 class="text-xl text-white">Salud</h3>
      </div>
      <div
        class="flex w-5/6 h-full justify-left items-center rounded-r-xl shadow-xl bg-white p-3"
      >
        <div class="w-1/2 h-full flex flex-wrap justify-center">
          <div class="rounded-full w-60 text-white px-3 py-1 bg-green-500">
            Presencia escolar
          </div>
          <BarSummaryVue
            class="w-full"
            :pastData="results.pasado.salud"
            :presentData="results.presente.salud"
            :decimales="0.1"
            :yRange="[0, 100]"
            :unidad="'%'"
            :colors="['#ccc', '#33bd7c']"
          ></BarSummaryVue>
        </div>
        <div class="w-1/2 h-full flex justify-left p-5">
          <div class="flex flex-wrap overflow-hidden h-full mr-5">
            <div
              class="w-full h-12 flex items-center justify-center text-slate-500 text-sm rounded-t-2xl mb-0 px-5"
            >
              Mes actual <br />
            </div>
            <div class="w-full flex justify-center">
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-green-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ results.pasado.salud[currMonth - 1] | number }}%
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Ciclo anterior
                </div>
              </div>
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-green-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ results.presente.salud[currMonth - 1] | number }}%
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Este ciclo
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap overflow-hidden h-full mr-5">
            <div
              class="w-full h-12 flex items-center justify-center text-slate-500 text-sm rounded-t-2xl mb-0 px-5"
            >
              Promedio acumulado <br />
            </div>
            <div class="w-full flex justify-center">
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-green-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ getAverage(results.pasado.salud) | number }}%
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Ciclo anterior
                </div>
              </div>
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-green-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ getAverage(results.presente.salud) | number }}%
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Este ciclo
                </div>
              </div>
            </div>
          </div>
          <!--
          <ul class="text-left list-disc">
            <li class="">
              Este mes la presencia escolar es un
              <b class="font-bold" style="font-family: CooperHewittTitle">
                {{
                  (results.presente.salud[currMonth - 1] -
                    results.pasado.salud[currMonth - 1])
                    | number
                }}%
                {{
                  results.presente.salud[currMonth - 1] >
                  results.pasado.salud[currMonth - 1]
                    ? "mayor"
                    : "menor"
                }}
              </b>

              que el mismo mes del año pasado
            </li>
            <li>
              Este año la presencia escolar ha
              {{
                getAverage(results.presente.salud) >
                getAverage(results.pasado.salud)
                  ? "mejorado"
                  : "empeorado"
              }}
              en un
              <b class="font-bold" style="font-family: CooperHewittTitle">
                {{
                  formatNumber(
                    getAverage(results.presente.salud) -
                      getAverage(results.pasado.salud),
                    2
                  )
                }}%
              </b>
              respecto del año pasado
            </li>
          </ul>-->
        </div>
      </div>
    </div>
    <div class="h-48 flex w-full px-5">
      <div
        class="h-full rounded-l-xl bg-gradient-to-bl from-fuchsia-800 to-purple-600 w-1/6 flex flex-wrap justify-center items-begin pt-3"
      >
        <div class="w-full flex justify-center">
          <img
            src="@/assets/img/icono_notas.svg"
            class="w-16 fill-white"
            alt=""
          />
        </div>
        <h3 class="text-xl text-white">Resultados académicos</h3>
      </div>
      <div
        class="flex w-5/6 h-full justify-left items-center rounded-r-xl shadow-xl bg-white p-3"
      >
        <div class="w-1/2 h-full flex flex-wrap justify-center">
          <div class="rounded-full w-60 text-white px-3 py-1 bg-violet-500">
            Notas
          </div>
          <BarSummaryVue
            class="w-full"
            :pastData="results.pasado.notas"
            :presentData="results.presente.notas"
            :decimales="1"
            :yRange="[0, 7]"
            :unidad="''"
            :colors="['#ccc', '#b036d1']"
          ></BarSummaryVue>
        </div>
        <div class="w-1/2 h-full flex justify-left p-5">
          <div class="flex flex-wrap overflow-hidden h-full mr-5">
            <div
              class="w-full h-12 flex items-center justify-center text-slate-500 text-sm rounded-t-2xl mb-0 px-5"
            >
              Mes actual <br />
            </div>
            <div class="w-full flex justify-center">
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-violet-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ formatNumber(results.pasado.notas[currMonth - 1], 1) }}
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Ciclo anterior
                </div>
              </div>
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-violet-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ formatNumber(results.presente.notas[currMonth - 1], 1) }}
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Este ciclo
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap overflow-hidden h-full mr-5">
            <div
              class="w-full h-12 flex items-center justify-center text-slate-500 text-sm rounded-t-2xl mb-0 px-5"
            >
              Promedio acumulado <br />
            </div>
            <div class="w-full flex justify-center">
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-violet-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ formatNumber(getAverage(results.pasado.notas), 1) }}
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Ciclo anterior
                </div>
              </div>
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-violet-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ formatNumber(getAverage(results.presente.notas), 1) }}
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Este ciclo
                </div>
              </div>
            </div>
          </div>
          <!--
          <ul class="text-left list-disc">
            <li class="">
              Este mes la presencia escolar es un
              <b class="font-bold" style="font-family: CooperHewittTitle">
                {{
                  (results.presente.salud[currMonth - 1] -
                    results.pasado.salud[currMonth - 1])
                    | number
                }}%
                {{
                  results.presente.salud[currMonth - 1] >
                  results.pasado.salud[currMonth - 1]
                    ? "mayor"
                    : "menor"
                }}
              </b>

              que el mismo mes del año pasado
            </li>
            <li>
              Este año la presencia escolar ha
              {{
                getAverage(results.presente.salud) >
                getAverage(results.pasado.salud)
                  ? "mejorado"
                  : "empeorado"
              }}
              en un
              <b class="font-bold" style="font-family: CooperHewittTitle">
                {{
                  formatNumber(
                    getAverage(results.presente.salud) -
                      getAverage(results.pasado.salud),
                    2
                  )
                }}%
              </b>
              respecto del año pasado
            </li>
          </ul>-->
        </div>
      </div>
    </div>
    <div class="h-48 flex w-full px-5">
      <div
        class="h-full rounded-l-xl bg-gradient-to-bl from-sky-500 to-blue-500 w-1/6 flex flex-wrap justify-center items-center py-5"
      >
        <div class="w-full flex justify-center">
          <img
            src="@/assets/img/icono_estres.svg"
            class="h-24 fill-white"
            alt=""
          />
        </div>
        <h3 class="text-xl text-white">
          Salud <br />
          mental
        </h3>
      </div>
      <div
        class="flex w-5/6 h-full justify-left items-center rounded-r-xl shadow-xl bg-white p-3"
      >
        <div class="w-1/2 h-full flex flex-wrap justify-center">
          <div class="rounded-full w-60 text-white px-3 py-1 bg-sky-500">
            Consulta salud mental
          </div>
          <BarSummaryVue
            class="w-full"
            :pastData="results.pasado.mental"
            :presentData="results.presente.mental"
            :decimales="1"
            :yRange="[0, 5]"
            :unidad="''"
            :colors="['#ccc', '#2cbdc7']"
          ></BarSummaryVue>
        </div>
        <div class="w-1/2 h-full flex justify-left p-5">
          <div class="flex flex-wrap overflow-hidden h-full mr-5">
            <div
              class="w-full h-12 flex items-center justify-center text-slate-500 text-sm rounded-t-2xl mb-0 px-5"
            >
              Mes actual <br />
            </div>
            <div class="w-full flex justify-center">
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-sky-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ formatNumber(results.pasado.mental[currMonth - 1], 1) }}
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Ciclo anterior
                </div>
              </div>
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-sky-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ formatNumber(results.presente.mental[currMonth - 1], 1) }}
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Este ciclo
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap overflow-hidden h-full mr-5">
            <div
              class="w-full h-12 flex items-center justify-center text-slate-500 text-sm rounded-t-2xl mb-0 px-5"
            >
              Promedio acumulado <br />
            </div>
            <div class="w-full flex justify-center">
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-sky-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ formatNumber(getAverage(results.pasado.mental), 1) }}
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Ciclo anterior
                </div>
              </div>
              <div class="flex flex-wrap justify-center text-sm w-24">
                <div
                  class="border-4 border-sky-300 rounded-full h-16 w-16 flex justify-center items-center font-charter-bold text-xl"
                >
                  {{ formatNumber(getAverage(results.presente.mental), 1) }}
                </div>
                <div class="text-slate-600 flex w-full justify-center">
                  Este ciclo
                </div>
              </div>
            </div>
          </div>
          <!--
          <ul class="text-left list-disc">
            <li class="">
              Este mes la presencia escolar es un
              <b class="font-bold" style="font-family: CooperHewittTitle">
                {{
                  (results.presente.salud[currMonth - 1] -
                    results.pasado.salud[currMonth - 1])
                    | number
                }}%
                {{
                  results.presente.salud[currMonth - 1] >
                  results.pasado.salud[currMonth - 1]
                    ? "mayor"
                    : "menor"
                }}
              </b>

              que el mismo mes del año pasado
            </li>
            <li>
              Este año la presencia escolar ha
              {{
                getAverage(results.presente.salud) >
                getAverage(results.pasado.salud)
                  ? "mejorado"
                  : "empeorado"
              }}
              en un
              <b class="font-bold" style="font-family: CooperHewittTitle">
                {{
                  formatNumber(
                    getAverage(results.presente.salud) -
                      getAverage(results.pasado.salud),
                    2
                  )
                }}%
              </b>
              respecto del año pasado
            </li>
          </ul>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from "vue"
import BarSummaryVue from "./charts/BarSummary.vue"

const props = defineProps(["data"])

const results = ref(props.data)

const currMonth = ref(new Date().getMonth())

function formatNumber(num, decimales) {
  return num.toFixed(decimales).replace(/\./g, ",")
}

function getAverage(data) {
  const until = new Date().getMonth()
  let dataLength = 0
  let average = 0
  for (let i = 0; i < until; i++) {
    dataLength += data[i] ? 1 : 0
    average += data[i] ? data[i] : 0
  }
  console.log(until)
  return average / dataLength
}
</script>
