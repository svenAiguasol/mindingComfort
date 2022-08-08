import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import MainNav from "./components/MainNav.vue"
import AlertComp from "./components/AlertComp.vue"
import "./index.css"
import { plugin, defaultConfig } from "@formkit/vue"
import mitt from "mitt"
import generateFullData from "./services/dataGenerator"

const emitter = mitt()
const app = createApp(App)

app.use(router)
app.use(
  plugin,
  defaultConfig({
    config: {
      classes: {
        submit: "text-white",
        input: "w-full rounded-md mt-5 h-10 text-black px-5",
        message:
          "text-sm text-red-600 bg-red-100 px-2 py-1 rounded-md w-full flex flex-wrap",
      },
    },
  })
)
let data
async function getFullData() {
  //data = await generateFullData(3, 3, 5, 35)
  data = await generateFullData(2, 2, 7, 35)
  const limitValues = {
    calor: [24, 27, 30],
    frio: [18, 16, 14],
    humedad: [60, 75, 90],
    co2: [1000, 1500, 2000],
    ruido: [40, 50, 60],
  }
  app.component("MainNav", MainNav)
  app.component("AlertComp", AlertComp)

  app.provide("emitter", emitter)
  app.provide("router", router)
  app.provide("data", data)
  app.provide("limitValues", limitValues)
  app.mount("#app")
}
getFullData()
/*
const data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : generateFullData(3, 3, 5, 35)
*/
//localStorage.setItem("data", JSON.stringify(data))
