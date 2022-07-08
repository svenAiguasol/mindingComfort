import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import MainNav from "./components/MainNav.vue"
import AlertComp from "./components/AlertComp.vue"
import "./index.css"
import { plugin, defaultConfig } from "@formkit/vue"
import mitt from "mitt"

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

app.component("MainNav", MainNav)
app.component("AlertComp", AlertComp)

app.provide("emitter", emitter)
app.provide("router", router)
app.mount("#app")
