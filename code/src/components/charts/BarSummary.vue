<template>
  <div
    class="chart-container relative flex justify-center items-center h-full px-5"
  >
    <div class="w-full h-full">
      <vue-echarts
        :option="barPlot"
        style="height: 100%"
        class="h-full"
        ref="chart"
      />
    </div>
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <img :src="icon" class="w-14" alt="" />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue"
import "echarts"
import { VueEcharts } from "vue3-echarts"

const props = defineProps([
  "pastData",
  "presentData",
  "colors",
  "decimales",
  "unidad",
  "yRange",
])

//console.log(props.yRange)
const barPlot = ref()
barPlot.value = {
  loadingOption: {
    text: "Loading...",
    color: "#c23531",
    textColor: "#c23531",
    maskColor: "rgba(255, 255, 255, 0.8)",
    zlevel: 0,
  },
  xAxis: {
    type: "category",
    showGrid: false,
    splitLine: {
      show: false,
    },
    data: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  yAxis: {
    type: "value",
    showGrid: false,
    min: props.yRange ? props.yRange[0] : 0,
    max: props.yRange ? props.yRange[1] : 100,
    splitLine: {
      show: false,
    },
    axisLabel: {
      formatter: "{value} " + props.unidad,
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
      return (
        obj.name + " : " + obj.value.toFixed(props.decimales) + props.unidad
      )
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
      type: "bar",
      data: props.pastData,
      color: props.colors[0],
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
    {
      name: "Año presente",
      type: "bar",
      color: props.colors[1],
      data: props.presentData,
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
  height: "60%",
}
</script>
