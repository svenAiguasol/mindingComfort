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
import * as echarts from "echarts/core"
import "echarts/lib/chart/line"

//import { yAxis } from "echarts/components"
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
  "bloquesHorarios",
])

let yAxisData = []
//let xAxisData = props.timeData
let xAxisData = []

for (let i = 0; i < props.timeData.length; i++) {
  const dateTime = moment(props.timeData[i]).format("YYYY-MM-DD HH:mm")
  xAxisData.push(dateTime)
  yAxisData.push([dateTime, props.seriesData[i]])
}

//console.log(yAxisData)

const loadingChart = ref(true)

//console.log(props.yRange)
const linePlot = ref()

function getBlocks(fullTimeStrip) {
  // timestrip contiene un array de bloques de tiempo de la forma:
  /*
    0 => [0,1,...], lunes,
    1 => [0,1,...], martes,
    ...
    6 => [0,1,...], domingo,
  */
  let blocks = []
  let ti = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
  let t
  //console.log(hi)
  let block
  for (let i = 0; i < fullTimeStrip.length; i++) {
    t = new Date(ti.getTime() + (i * 1000 * 3600) / 4)

    if (fullTimeStrip[i] == 1 && fullTimeStrip[i - 1] == 0) {
      block = { hi: t, hf: 0 }
    }
    if (fullTimeStrip[i] == 1 && fullTimeStrip[i + 1] == 0) {
      block.hf = new Date(ti.getTime() + ((i + 1) * 1000 * 3600) / 4)
      blocks.push(block)
    }
  }
  return blocks
}

const blocks = getBlocks(props.bloquesHorarios)
//console.log(blocks)
//let xRange = setTimeWindow(props.ventana, props.firstMoment)
//console.log(xRange)
linePlot.value = getNewChart(
  xAxisData,
  yAxisData,
  props.unidad,
  //xRange,
  props.yRange,
  props.decimales,
  props.confortBands,
  blocks
)
setTimeWindow(props.ventana, props.firstMoment)
watch(props, function (newVal) {
  if (newVal.ventana) {
    //xRange = setTimeWindow(props.ventana, props.firstMoment)
    linePlot.value = getNewChart(
      xAxisData,
      yAxisData,
      props.unidad,
      //xRange,
      props.yRange,
      props.decimales,
      props.confortBands,
      blocks
    )
    setTimeWindow(props.ventana, props.firstMoment)
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
        : moment(new Date()).startOf("week")
      firstMoment =
        firstMoment >= moment(new Date()).subtract(1, "weeks")
          ? moment(new Date()).startOf("week")
          : firstMoment
      lastMoment = moment(firstMoment).add(1, "weeks")
      break
    case "anyo":
      const comienzoAnyo = moment(new Date(new Date().getFullYear(), 0, 0))
      firstMoment = firstMoment ? firstMoment : comienzoAnyo
      firstMoment =
        firstMoment >= moment(new Date()).subtract(1, "years")
          ? comienzoAnyo
          : firstMoment
      lastMoment = moment(firstMoment).add(1, "years")
      break
  }
  console.log(firstMoment)
  linePlot.value.xAxis.min = firstMoment.format("YYYY-MM-DD HH:mm")
  linePlot.value.xAxis.max = lastMoment.format("YYYY-MM-DD HH:mm")

  /*return [
    firstMoment.format("YYYY-MM-DD HH:mm"),
    lastMoment.format("YYYY-MM-DD HH:mm"),
  ]*/
  /*linePlot.value.xAxis.min = firstMoment.format("YYYY-MM-DD HH:mm")
  linePlot.value.xAxis.max = lastMoment.format("YYYY-MM-DD HH:mm")*/
  //let auxData = []
  //let auxTime = []
  //console.log(firstMoment)
  //console.log(lastMoment)
  /*for (let i = 0; i < yAxisData.length; i++) {
    if (moment(xAxisData[i]).isBetween(firstMoment, lastMoment)) {
      auxData.push(yAxisData[i])
      auxTime.push(xAxisData[i])
    }
  }*/
  //console.log(auxData)
  //console.log(auxTime)
  /*return {
    data: auxData,
    time: auxTime,
  }*/
}

function getNewChart(
  xAxisData,
  yAxisData,
  unidad,
  //xRange,
  yRange,
  decimales,
  confortBands,
  bloquesHorarios
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
      type: "time",
      formatter: function (value) {
        return moment(value).format("Y-m-d HH:mm")
      },
      /*min: xRange[0],
      max: xRange[1],*/
      axisLabel: {
        formatter: function (value) {
          return moment(new Date(value)).format("Y-MM-DD HH:mm")
        },
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
      trigger: "axis",
      formatter: function (obj) {
        return (
          obj[0].data[0] + " : " + obj[0].data[1].toFixed(decimales) + unidad
        )
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
          width: 1,
        },
        markArea: {
          data: [],
        },
        symbol: "none",
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
  bloquesHorarios.map((bloque) => {
    const colorBand = [
      {
        xAxis: bloque.hi, //"2022-08-09 08:30",
        itemStyle: {
          color: "#ccc",
        },
      },
      {
        xAxis: bloque.hf, //"2022-08-09 09:30",
        itemStyle: {
          color: "#ccc",
        },
      },
    ]
    chart.series[0].markArea.data.push(colorBand)
  })

  return chart
}
</script>
