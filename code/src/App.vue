<template>
  <div ref="root">
    <div class="w-full absolute top-0 z-10">
      <AlertComp ref="alertComp" />
    </div>
    <div class="flex">
      <div class="flex-column w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import axios from "./services/axios"
import AlertComp from "./components/AlertComp.vue"

const mainData = ref()

const getMain = async () => {
  try {
    const data = await (await axios.get("getMain")).data
    mainData.value = data.sven_disciplines
  } catch (err) {
    console.log(err)
  }
}
//getMain()

onMounted(() => {
  const thisInstance = getCurrentInstance()
  var section = thisInstance.refs.root.querySelectorAll(".section")
  var sections = {}
  var i = 0
  Array.prototype.forEach.call(section, function (e) {
    sections[e.id] = e.offsetTop
  })
  window.onscroll = function () {
    var scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        document.querySelector(".active").setAttribute("class", " ")
        document
          .querySelector("a[href*=" + i + "]")
          .setAttribute("class", "active")
      }
    }
  }
})
</script>
<style>
#app {
  font-family: CooperHewittBody;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app h1,
h2,
h3,
h4,
h5 {
  font-family: CooperHewittTitle;
}
#app {
  background-color: #f6f6f6;
}
#app .logo {
  font-family: ailerons;
}
.popupbox {
  background-color: #2c3e50;
  color: #fff;
  padding: 15px;
  border-radius: 10px;
}
</style>
