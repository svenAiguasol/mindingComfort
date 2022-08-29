<template>
  <div class="root">
    <div
      class="flex w-full h-screen place-items-center justify-items-center justify-center items-center bg-white"
    >
      <div
        class="w-1/3 flex flex-wrap p-20 items-center justify-center bg-white shadow-lg rounded-lg"
      >
        <h3 class="text-[54px] font-ailerons">
          <img src="@/assets/logo.svg" class="w-20 inline-block" alt="" />
          CONFORT
        </h3>
        <input
          class="w-full mt-10 bg-gray-100 shadow-sm h-10 px-5 rounded-md"
          type="text"
          placeholder="usuario"
          v-model="form.user"
          @keydown.enter="login()"
        />
        <input
          class="w-full mt-10 bg-gray-100 shadow-sm h-10 px-5 rounded-md"
          type="password"
          placeholder="contraseña"
          v-model="form.pass"
          @keydown.enter="login()"
        />

        <button
          class="w-full mt-10 bg-sky-500 hover:bg-blue-600 text-white h-10 rounded-md"
          v-on:click="login()"
          @keydown.enter="login()"
        >
          Ingresar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "../services/axios"
import { ref, inject } from "vue"

//const emit = defineEmits(["addAlert"])
const emitter = inject("emitter")
const router = inject("router")

const form = ref()
form.value = {
  user: "",
  pass: "",
}

function login() {
  if (form.value.user == "") {
    emitter.emit("addAlert", { type: "error", txt: "Ingrese un usuario" })
  }
  if (form.value.user == "administrador" && form.value.pass == "demo") {
    localStorage.setItem("token", "demo")
    location.href = "plataforma-administrador/dashboard"
  } else if (form.value.user == "apoderado" && form.value.pass == "demo") {
    localStorage.setItem("token", "demo")
    location.href = "plataforma-apoderados/pupilos"
  } else {
    emitter.emit("addAlert", {
      type: "error",
      txt: "Usuario o contraseña incorrectos",
    })
  }
}
</script>
