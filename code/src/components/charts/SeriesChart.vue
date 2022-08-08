<template>
  <div
    v-if="!loadingChart"
    class="chart-container relative flex justify-center items-center h-full px-5"
  >
    <div class="w-full h-full">
      <vue-echarts
        :option="linePlot"
        style="height: 100%"
        class="h-full"
        ref="chart"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue"
import "echarts"
import { VueEcharts } from "vue3-echarts"
import moment from "moment"

const props = defineProps([
  "seriesData",
  "timeData",
  "color",
  "decimales",
  "unidad",
  "ventana",
  "firstMoment",
  "yRange",
  "confortBands",
])

let yAxisData = props.seriesData
let xAxisData = props.timeData

const loadingChart = ref(true)

//console.log(props.yRange)
const linePlot = ref()

const newData = setTimeWindow(props.ventana, props.firstMoment)

linePlot.value = getNewChart(
  newData.time,
  newData.data,
  props.unidad,
  props.yRange,
  props.decimales,
  props.confortBands
)

watch(props, function (newVal) {
  if (props.ventana) {
    loadingChart.value = true
    const newData = setTimeWindow(props.ventana, props.firstMoment)
    linePlot.value = getNewChart(
      newData.time,
      newData.data,
      props.unidad,
      props.yRange,
      props.decimales,
      props.confortBands
    )
    loadingChart.value = false
  }
})

loadingChart.value = false

function setTimeWindow(mode, firstMoment) {
  let lastMoment
  switch (mode) {
    case "dia":
      firstMoment = firstMoment
        ? firstMoment
        : moment(new Date()).subtract(1, "days")
      lastMoment = moment(firstMoment).add(1, "days")
      break
    case "semana":
      firstMoment = firstMoment
        ? firstMoment
        : moment(new Date()).subtract(1, "weeks")
      firstMoment =
        firstMoment >= moment(new Date()).subtract(1, "weeks")
          ? moment(new Date()).subtract(1, "weeks")
          : firstMoment
      lastMoment = moment(firstMoment).add(1, "weeks")
      break
    case "anyo":
      firstMoment = firstMoment
        ? firstMoment
        : moment(new Date()).subtract(1, "years")
      firstMoment =
        firstMoment >= moment(new Date()).subtract(1, "years")
          ? moment(new Date()).subtract(1, "years")
          : firstMoment
      lastMoment = moment(firstMoment).add(1, "years")
      break
  }
  let auxData = []
  let auxTime = []
  //console.log(firstMoment)
  //console.log(lastMoment)
  for (let i = 0; i < yAxisData.length; i++) {
    if (moment(xAxisData[i]).isBetween(firstMoment, lastMoment)) {
      auxData.push(yAxisData[i])
      auxTime.push(xAxisData[i])
    }
  }
  //console.log(auxData)
  //console.log(auxTime)
  return {
    data: auxData,
    time: auxTime,
  }
}

function getNewChart(
  xAxisData,
  yAxisData,
  unidad,
  yRange,
  decimales,
  confortBands
) {
  let chart = {
    loadingOption: {
      text: "Loading...",
      color: "#c23531",
      textColor: "#c23531",
      maskColor: "rgba(255, 255, 255, 0.8)",
      zlevel: 0,
    },
    xAxis: {
      type: "category",
      //showGrid: false,
      /*splitLine: {
      show: false,
    },*/
      data: xAxisData,
      formatter: function (value) {
        return value
      },
    },
    yAxis: {
      type: "value",
      showGrid: false,
      min: yRange ? yRange[0] : 0,
      max: yRange ? yRange[1] : 100,
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: "{value} " + unidad,
      },
    },
    /*title: {
    show: false,
    text: "",
    left: "center",
    top: "bottom",
    textStyle: {
      color: "#777",
    },
  },*/
    grid: {
      show: false,
      width: "100%",
      height: "70%",
      left: "0",
      right: "0",
      top: "10px",
      containLabel: true,
    },
    tooltip: {
      trigger: "item",
      //formatter: ([{ b: b }, { c: c }]) => `${b}<br/>${c.toFixed(2)}`,
      //valueFormatter: (value) => value.toFixed(2),
      //formatter: "{b}: {c}%", //{a} <br/>{b}: {c}
      formatter: function (obj) {
        return obj.name + " : " + obj.value.toFixed(decimales) + unidad
      },
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      show: false,
      orient: "horizontal",
      bottom: "center",
      data: ["Direct", "Indirect", "Direct and Indirect"],
    },
    series: [
      {
        name: "Año pasado",
        type: "line",
        data: yAxisData,
        lineStyle: {
          width: 0.5,
        },

        markArea: { data: [] },
      },
    ],
    visualMap: {
      show: false,
      pieces: [],
    },
  }
  confortBands.map((band) => {
    const colorBand = [
      {
        yAxis: band.range[0],
        itemStyle: {
          color: band.color,
        },
      },
      {
        yAxis: band.range[1],
        itemStyle: {
          color: band.color,
        },
      },
    ]
    const visualRange = {
      gt: band.range[0],
      lte: band.range[1],
      color: band.lineColor,
    }
    chart.visualMap.pieces.push(visualRange)
  })
  return chart
}
</script>
