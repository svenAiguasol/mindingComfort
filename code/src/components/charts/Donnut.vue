<template>
  <div class="chart-container relative flex justify-center items-center">
    <div class="w-full">
      <vue-echarts :option="donnut" :style="{ height: '200px' }" ref="chart" />
    </div>
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <img :src="icon" class="w-14" alt="" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import "echarts"
import { VueEcharts } from "vue3-echarts"

const props = defineProps(["data", "colors", "icon"])
console.log(props.data)

const icon = ref()
icon.value = props.icon
/*const chart = ref(null)
chart.setOption({
  loadingOption: {
    text: "Loading...",
    color: "#c23531",
    textColor: "#333",
    maskColor: "rgba(255, 255, 255, 0.8)",
    zlevel: 0,
  },
})*/

const donnut = ref()
donnut.value = {
  loadingOption: {
    text: "Loading...",
    color: "#c23531",
    textColor: "#c23531",
    maskColor: "rgba(255, 255, 255, 0.8)",
    zlevel: 0,
  },
  color: props.colors
    ? props.colors
    : ["#8CC63F", "#FAEC21", "#F5911E", "#BF272D"],
  title: {
    text: "",
    left: "center",
    top: "center",
    textStyle: {
      color: "#ccc",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{d}%", //{a} <br/>{b}: {c}
  },
  legend: {
    show: false,
    orient: "horizontal",
    bottom: "center",
    data: ["Direct", "Indirect", "Direct and Indirect"],
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: ["60%", "70%"],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: "center",
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "30",
            fontWeight: "bold",
          },
        },
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: props.data,
    },
  ],
}
</script>
