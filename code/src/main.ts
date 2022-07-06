import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import MainNav from "./components/MainNav.vue"
import AlertComp from "./components/AlertComp.vue"
import "./index.css"
import mitt from "mitt"

const emitter = mitt()
const app = createApp(App)

app.use(router)
app.component("MainNav", MainNav)
app.component("AlertComp", AlertComp)

app.provide("emitter", emitter)
app.provide("router", router)
app.mount("#app")
