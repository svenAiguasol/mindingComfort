import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import MainNav from "./components/MainNav.vue"
import "./index.css"

const app = createApp(App)

app.use(router)
app.component("MainNav", MainNav)

app.mount("#app")
