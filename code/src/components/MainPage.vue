<template>
  <div class="relative" ref="root">
    <div class="w-full md:absolute sticky top-0 z-20">
      <nav class="w-full bg-black/[.6] h-18 py-5 sm:px-4 z-10">
        <div class="container flex justify-between items-center mx-auto">
          <a href="#home" class="flex items-center">
            <img
              src="@/assets/logo.svg"
              class="mx-3 h-9 md:h-9"
              alt="Minding Confort Logo"
            />
            <span
              class="self-center text-4xl font-ailerons font-semibold whitespace-nowrap text-white dark:text-white"
              ><h3 class="logo hidden md:block">confort</h3></span
            >
          </a>
          <div class="md:hidden flex justify-center gap-10 items-center w-full">
            <a
              class="menuPoint h-3 w-3 rounded-full border-white border-2"
              href="#home"
            ></a>
            <a
              class="menuPoint h-3 w-3 rounded-full border-white border-2"
              href="#como-funciona"
            ></a>
            <a
              class="menuPoint h-3 w-3 rounded-full border-white border-2"
              href="#tecnologia"
            ></a>
            <a
              class="menuPoint h-3 w-3 rounded-full border-white border-2"
              href="#tarifas"
            ></a>
            <a
              class="menuPoint h-3 w-3 rounded-full border-white border-2"
              href="#cotiza"
            ></a>
          </div>
          <div
            class="hidden justify-between items-center w-full xl:flex md:w-auto md:order-1"
          >
            <ul
              class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
            >
              <li class="menu-item">
                <a
                  href="#como-funciona"
                  class="block text-xl py-2 pr-4 pl-3 text-white rounded md:hover:text-sky-500 md:bg-transparent md:p-0 dark:text-white"
                  aria-current="page"
                  >Cómo funciona</a
                >
              </li>
              <li class="menu-item">
                <a
                  href="#tecnologia"
                  class="block text-xl py-2 pr-4 pl-3 ml-10 text-white hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-sky-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >Tecnología</a
                >
              </li>
              <li class="menu-item">
                <a
                  href="#tarifas"
                  class="block text-xl py-2 pr-4 pl-3 ml-10 text-white hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-sky-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >Tarifas</a
                >
              </li>
              <li class="menu-item">
                <a
                  href="#cotiza"
                  class="block text-xl py-2 pr-4 pl-3 ml-10 text-white hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-sky-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >Cotiza</a
                >
              </li>
              <li>
                <div
                  class="border-white rounded-full border-2 ml-14 px-4 md:hover:bg-white"
                >
                  <a
                    href="/login"
                    class="block text-xl py-2 pr-4 text-white hover:bg-white md:hover:bg-white md:border-0 md:hover:text-black md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >Ingresa | Demo</a
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <!-- top Banner ################################## -->
    <div id="home" class="scrollPoint top-banner relative w-full h-100 z-80">
      <div
        class="w-full h-screen bg-[url('@/assets/img/fondo_top_2.jpg')] md:bg-cover bg-[length:1200px] bg-center bg-no-repeat z-10"
        alt=""
      >
        <div class="w-full h-screen bg-black/[0.4]"></div>
        <h1
          class="absolute leading-snug text-white left-1/2 md:p-0 p-5 text-4xl xl:top-3/4 md:top-1/2 top-1/2 z-10 text-center md:w-2/3 w-full transform -translate-x-1/2 mix-blend-screen"
        >
          Sabemos de tu compromiso <br />
          con su educación y
          <br class="md:hidden block" />
          <div class="bg-white px-3 ml-3 inline-block rounded-md text-black">
            te ayudamos a cumplirlo
          </div>
        </h1>
      </div>
    </div>

    <!-- value proposition ################################## -->

    <div class="flex flex-col content-center items-center">
      <div class="md:w-1/2 w-full">
        <h1
          class="text-gray-700 leading-snug mt-20 text-4xl text-center w-full p-5 md:p-0"
        >
          Y para cumplirlo, tus hij@s necesitan y se merecen
          <div
            class="bg-gradient-to-r from-sky-600 inline-block to-blue-600 px-5 ml-3 rounded-md text-white"
          >
            espacios confortables
          </div>
        </h1>
      </div>

      <div class="w-full mt-20 relative h-60">
        <div
          class="absolute z-1 top-0 right-0 w-full bg-gradient-to-r from-sky-600 to-blue-600 xl:h-40 md:h-80 h-96"
        ></div>
        <div
          class="px-10 grid xl:grid-cols-6 grid-cols-3 md:gap-1 md:gap-y-0 gap-y-20 items-center"
        >
          <div
            v-for="(val, i) in comfortIcons"
            :key="i"
            class="xl:px-10 px-3 xl:pt-8 pt-6 xl:h-96 h-28 text-center"
          >
            <img
              class="xl:w-[90px] w-[60px] z-10 relative inline-block"
              :src="val.img"
              alt=""
            />
            <p
              class="relative z-10 xl:mt-10 mt-3 text-center xl:text-gray-700 text-white xl:text-2xl text-md"
            >
              {{ val.txt }}
            </p>
          </div>
        </div>
      </div>

      <div class="md:w-1/2 w-full mt-10">
        <h1
          class="text-gray-700 leading-snug md:mt-20 mt-40 text-4xl text-center w-full"
        >
          Porque un espacio confortable significa:
        </h1>
      </div>

      <div class="md:w-1/2 w-full mt-20">
        <div class="md:flex justify-center gap-40">
          <div
            v-for="(cifra, i) in cifras"
            :key="i"
            class="shadow-lg bg-gradient-to-tr md:w-60 w-full md:rounded-xl text-center p-12"
            :class="'from-' + cifra.color1 + ' to-' + cifra.color2"
          >
            <img class="w-40 inline-block mt-10" :src="cifra.icon" alt="" />
            <br />
            <h2 class="text-white leading-[25px] mt-10 text-2xl">
              {{ cifra.txt1 }} <br />
              <b class="text-4xl">{{ cifra.num }}</b> <br />
              {{ cifra.txt2 }}
            </h2>
          </div>
        </div>
      </div>

      <div class="md:w-1/2 w-full mt-10">
        <h1
          id="como-funciona"
          class="scrollPoint text-gray-700 leading-snug md:mt-20 mt-40 text-4xl text-center w-full"
        >
          Y haremos todo lo posible para que lo consigas
        </h1>
      </div>

      <div class="w-full mt-20">
        <div
          class="grid md:px-40 md:grid-cols-2 grid-cols-1 md:gap-10 gap-y-20 items-center"
        >
          <div
            class="w-full shadow-lg bg-white rounded-lg"
            v-for="(benefit, i) in benefits"
            :key="i"
          >
            <img class="rounded-t-lg" :src="benefit.img" alt="" />
            <div class="w-full shadow-lg p-5 xl:h-60 bg-white">
              <h1 class="text-gray-700 text-left text-xl mb-5">
                {{ benefit.title }}
              </h1>
              <p class="text-justify text-xl">{{ benefit.txt }}</p>
              <a
                v-bind:href="benefit.lnk"
                class="rounded-full mt-5 p-1 text-xl inline-block bg-gradient-to-r from-sky-500 to-blue-600 text-white xl:w-1/2 px-10 md:w-3/4"
                >{{ benefit.btn }}</a
              >
            </div>
          </div>
        </div>
      </div>

      <div class="md:w-1/2 w-full mt-10">
        <h1
          class="text-gray-700 leading-snug md:mt-20 mt-40 text-4xl text-center w-full"
        >
          Además, si eres
        </h1>
      </div>

      <div class="w-full mt-20">
        <div class="md:flex justify-center gap-20">
          <div
            class="xl:w-1/5 shadow-lg bg-white rounded-lg p-0"
            v-for="(segment, i) in segments"
            :key="i"
          >
            <div
              class="bg-gradient-to-tr from-orange-500 to-pink-600 h-60 w-full rounded-t-lg flex items-center justify-center text-center p-10"
            >
              <img class="h-40" :src="segment.icon" alt="" />
            </div>
            <div class="p-10 w-full h-full text-justify">
              <h1
                class="text-gray-700 leading-snug text-2xl text-center w-full"
              >
                {{ segment.title }}
              </h1>
              <p class="mt-5 text-xl">
                {{ segment.txt }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="md:w-1/2 w-full mt-5">
        <h1
          class="text-gray-700 leading-snug md:mt-20 mt-10 text-4xl text-center w-full"
        >
          Nuestra solución para medir
        </h1>
      </div>

      <div
        id="tecnologia"
        class="scrollPoint w-full md:mt-20 mt-10 md:h-[600px] h-96 bg-[url('@/assets/img/fondo_sensor.jpg')] md:bg-[length:1200px] bg-[length:600px] bg-center bg-no-repeat"
        alt=""
      ></div>

      <div class="w-full md:mt-20 mt-10 text-center">
        <h1 class="text-sky-500 leading-snug text-4xl text-center w-full">
          Estación <b class="font-ailerons">CONFORT</b>
        </h1>
        <h2 class="text-blue-800 text-3xl mt-5 mb-10">
          Medición cada 5 minutos de
        </h2>
        <div
          class="grid md:px-40 xl:grid-cols-4 grid-cols-2 md:gap-5 gap-y-20 items-center mt-5"
        >
          <div v-for="(sensor, i) in mediciones" :key="i">
            <div class="inline-block">
              <img class="md:h-20 h-20" v-bind:src="sensor.icon" alt="" />
            </div>
            <div>
              <h1
                class="text-sky-500 leading-snug md:text-3xl text-center w-full"
              >
                {{ sensor.txt }}
              </h1>
            </div>
          </div>
        </div>
        <div
          class="grid md:px-20 xl:grid-cols-2 md:gap-5 gap-y-20 items-center mt-5"
        >
          <div>
            <h2 class="text-blue-800 text-3xl md:mt-5 mt-10 mb-5 w-full">
              Comunicación por
            </h2>
            <h2 class="text-sky-500 text-3xl mt-2 w-full">Wifi-3G</h2>
          </div>
          <div>
            <h2 class="text-blue-800 text-3xl md:mt-5 md:mb-5 w-full">
              Tamaño de la estación
            </h2>
            <h2 class="text-sky-500 text-3xl mt-2 w-full">20 x 20 x 5 cm</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-5">
      <h1
        id="tarifas"
        class="scrollPoint text-gray-700 leading-snug md:mt-20 mt-10 text-4xl text-center w-full"
      >
        Detalles del servicio y tarifas
      </h1>
    </div>

    <div class="w-full md:mt-20 mt-10 text-center">
      <div
        class="grid grid-cols-1 md:gap-10 gap-y-20 items-center place-items-center"
      >
        <div
          class="xl:w-1/3 md:w-1/2 w-full bg-white shadow-lg rounded-lg"
          v-for="(tarifa, i) in tarifas"
          :key="i"
        >
          <div
            class="bg-gradient-to-r from-sky-500 to-blue-600 h-16 rounded-t-lg flex place-items-center p-5"
          >
            <h1 class="w-full text-left text-white text-2xl">
              {{ tarifa.title }}
            </h1>
          </div>
          <div class="text-left p-5 px-10">
            <h2 class="mb-2 text-xl">Incluye:</h2>
            <ul class="list-disc ml-5 mb-5 text-xl">
              <li v-for="(incl, j) in tarifa.includes" :key="j">{{ incl }}</li>
            </ul>
            <h2 class="text-right text-2xl">{{ tarifa.price }}</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-5">
      <h1
        class="text-gray-700 leading-snug md:mt-20 mt-10 text-2xl text-center w-full"
      >
        Condiciones generales de servicio
      </h1>
    </div>

    <div
      class="w-full mt-5 bg-gradient-to-tr from-sky-500 to-blue-600 text-white text-left p-5 flex place-items-center items-center justify-items-center justify-center"
    >
      <div class="md:w-1/3 w-full pt-5">
        <ul class="list-disc ml-5 mb-5 text-xl">
          <li>Mínimo de 10 salas/espacios por establecimiento</li>
          <li>
            Tarifa por sala sujeta a localización del establecimiento y
            complejidad de la instalación
          </li>
        </ul>
      </div>
    </div>

    <div class="w-full mt-5">
      <h1
        id="cotiza"
        class="scrollPoint text-gray-700 leading-snug md:mt-20 mt-10 text-4xl text-center w-full"
      >
        Contrata <b class="font-ailerons">confort</b>
      </h1>
    </div>

    <div class="w-full mt-10 xl:px-60 flex justify-center flex-wrap">
      <div
        class="w-2/3 grid grid-cols-6 self-center gap-y-5 place-self-center xl:place-items-start md:place-items-left place-items-center mt-10"
        v-for="(instruccion, i) in instrucciones"
        :key="i"
      >
        <div
          class="md:col-span-1 col-span-6 xl:col-start-2 md:col-start-2 col-start-0"
        >
          <div
            class="hexagon bg-gradient-to-tr from-lime-500 to-green-800 relative"
          >
            <div
              class="hexagon hexagon-content absolute center flex justify-center items-center bg-white"
            >
              <h1 class="text-2xl text-green-600">{{ i + 1 }}</h1>
            </div>
          </div>
        </div>

        <div class="md:col-span-3 col-span-6 text-left">
          <h1 class="text-2xl text-gray-700 w-full text-center md:text-left">
            {{ instruccion.title }}
          </h1>
          <br />
          <p class="text-xl">
            {{ instruccion.txt }}
          </p>
          <div
            class="flex gap-4 mt-5 justify-center md:justify-start"
            v-if="instruccion.btns.length > 1"
          >
            <a v-for="(btn, i) in instruccion.btns" :key="i" :href="btn.lnk">
              <img class="w-20" v-bind:src="btn.icon" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-20">
      <h1
        class="text-gray-700 leading-snug md:mt-10 mt-10 text-2xl text-center w-full"
        id="formulario"
      >
        Formulario de solicitud de contacto
      </h1>
      <p class="text-center w-full text-xl">
        Llena y envía el formulario y te contactaremos en menos de 48 horas
      </p>
    </div>

    <div
      class="w-full mt-5 md:px-20 bg-gradient-to-tr from-sky-500 to-blue-600 text-white text-left p-5 flex place-items-center items-center justify-items-center justify-center"
    >
      <div
        v-if="sentMail"
        class="md:w-1/3 h-40 flex flex-wrap justify-center items-center place-content-center"
      >
        <div class="w-full grid text-center text-2xl">
          Gracias por contactarnos <br />
          Nos pondremos en contacto en menos de 48 hrs
        </div>
      </div>
      <div class="md:w-2/5" v-if="!sentMail">
        <FormKit type="form" :actions="false" @submit="sendMail">
          <div class="w-full flex justify-center">
            <div class="w-full grid grid-cols-2 gap-x-10">
              <input class="hidden" v-model="formulario.honeypot" />
              <div class="col-span-2 mt-5">
                <p class="w-full text-center text-xl">
                  Nombre persona de contacto
                </p>
                <FormKit
                  type="text"
                  :validation="[
                    ['required'],
                    [
                      'matches',
                      /^([a-zA-Z]*) ([a-zA-Z]*) ?(?:[a-zA-Z]*)? ?(?:[a-zA-Z]*)? ?(?:[a-zA-Z]*)?$/,
                    ],
                  ]"
                  v-model="formulario.nombre"
                  :validation-messages="{
                    required: 'El nombre es requerido',
                    matches: 'Debe ingresar al menos un nombre y un apellido',
                  }"
                />
                <p class="w-full text-center mt-5 text-xl">
                  Nombre de establecimiento
                </p>
                <FormKit
                  type="text"
                  v-model="formulario.establecimiento"
                  :validation="[['required']]"
                  :validation-messages="{
                    required: 'El nombre del establecimiento es requerido',
                  }"
                />
              </div>
              <div class="md:col-span-1 col-span-2 mt-5">
                <p class="w-full text-center text-xl">Región</p>
                <FormKit
                  type="select"
                  :validation="[['required']]"
                  :validation-messages="{
                    required: 'Debe seleccionar una región',
                  }"
                  v-model="formulario.region"
                  placeholder="Selecciona una región"
                >
                  <option
                    v-for="(region, i) in regiones"
                    :key="i"
                    :value="region.region"
                  >
                    {{ region.region }}
                  </option>
                </FormKit>
                <p class="w-full text-center mt-5 text-xl">Comuna</p>

                <FormKit
                  v-model="formulario.comuna"
                  value=""
                  type="select"
                  :validation="[['required']]"
                  :validation-messages="{
                    required: 'Debe seleccionar una comuna',
                  }"
                >
                  <option
                    v-for="(comuna, i) in comunas"
                    :key="i"
                    :value="comuna"
                  >
                    {{ comuna }}
                  </option>
                </FormKit>
              </div>
              <div class="md:col-span-1 col-span-2 mt-5">
                <p class="w-full text-center text-xl">Teléfono</p>
                <FormKit
                  :validation="[['required'], ['matches', /^\+[0-9]{11}$/]]"
                  :validation-messages="{
                    required: 'El teléfono es requerido',
                    matches:
                      'El teléfono debe ser un número de 9 dígitos y partiendo con el código de país +(país) ej: +56912345678',
                  }"
                  type="text"
                  placeholder="+56123456789"
                  v-model="formulario.fono"
                />
                <p class="w-full text-center mt-5 text-xl">
                  Correo electrónico
                </p>
                <FormKit
                  class="w-full rounded-md mt-5 h-10 text-black px-5"
                  type="text"
                  :validation="[['required'], ['email']]"
                  :validation-messages="{
                    required: 'El correo electrónico es requerido',
                    email:
                      'El correo debe estar en el formato nombre@dominio.com',
                  }"
                  placeholder="persona@dominio.cl"
                  v-model="formulario.mail"
                />
              </div>
              <div class="col-span-2 mt-10 text-center flex justify-center">
                <FormKit
                  type="submit"
                  :classes="{
                    input: {
                      $reset: true,
                    },
                  }"
                  input-class="border-white border-2 w-80 block text-center rounded-full p-2 cursor-pointer hover:bg-white hover:text-sky-600 text-xl"
                  >Enviar solicitud</FormKit
                >
              </div>
            </div>
          </div>
        </FormKit>
      </div>
    </div>
    <div class="w-full xl:h-[450px] h-[600px] footer"></div>
    <div
      id="footer"
      class="w-full xl:h-[450px] h-[600px] footer bg-zinc-800 absolute bottom-0"
    >
      <div class="w-full flex justify-center">
        <div class="w-1/2 grid grid-cols-3 place-items-center">
          <div class="col-span-3 mb-10 mt-20">
            <p class="text-white text-center">
              <a href="">
                <img
                  class="w-20"
                  src="@/assets/img/icono_instragram.svg"
                  alt=""
                />
              </a>
            </p>
          </div>
          <div
            class="xl:col-span-1 col-span-3 flex justify-center items-center mt-5"
          >
            <img
              src="@/assets/img/telefono_blanco.svg"
              class="fill-white w-12 grayscale-0"
              alt=""
            />
            <p class="ml-5 text-white text-lg">+56 88 888 888</p>
          </div>
          <div
            class="xl:col-span-1 col-span-3 flex justify-center items-center mt-5"
          >
            <img
              src="@/assets/img/mapa_blanco.svg"
              class="fill-white w-12 grayscale-0"
              alt=""
            />
            <p class="ml-5 text-white text-lg">
              Av. Importante #8888, Santiago, Chile
            </p>
          </div>
          <div
            class="xl:col-span-1 col-span-3 flex justify-center items-center mt-5"
          >
            <img
              src="@/assets/img/mail_blanco.svg"
              class="fill-white w-12 grayscale-0"
              alt=""
            />
            <p class="ml-5 text-white text-lg">hola@confort.minding.ai</p>
          </div>
          <div class="col-span-3 mt-10">
            <p class="text-white text-center">
              <a href="">
                <img
                  class="h-20"
                  src="@/assets/img/minding_blanco.svg"
                  alt=""
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios"
import _ from "lodash"
import { ref, onMounted, getCurrentInstance, watch } from "vue"
//const props = defineProps(["mainData"])

window.addEventListener("scroll", handleScroll)

const pointers = document.getElementsByClassName("scrollPoint")
const points = document.getElementsByClassName("menuPoint")
console.log(pointers.length)
function handleScroll(evt) {
  //console.log(pointers.length)
  //console.log(window.scrollY)
  var active = false
  for (let i = 0; i < pointers.length; i++) {
    const pointer = pointers[i]
    const rect = pointer.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      points[i].classList.add("active")
      active = true
    } else {
      points[i].classList.remove("active")
    }
  }
}

const comfortIcons = ref()
comfortIcons.value = [
  {
    img: new URL("../assets/img/icono_frio.svg", import.meta.url).href,
    txt: "Frescos",
  },
  {
    img: new URL("../assets/img/icono_calor.svg", import.meta.url).href,
    txt: "Abrigados",
  },
  {
    img: new URL("../assets/img/icono_humedad.svg", import.meta.url).href,
    txt: "Sin excesos de humedad",
  },
  {
    img: new URL("../assets/img/icono_ruido.svg", import.meta.url).href,
    txt: "Con buena acústica",
  },
  {
    img: new URL("../assets/img/icono_iluminacion.svg", import.meta.url).href,
    txt: "Bien iluminados",
  },
  {
    img: new URL("../assets/img/icono_co2.svg", import.meta.url).href,
    txt: "Con niveles de CO2 adecuados",
  },
]
const benefits = ref()
benefits.value = [
  {
    title: "Monitorear las condiciones",
    img: new URL("../assets/img/value_spec_1.png", import.meta.url).href,
    txt: "Con nuestra red de monitoreo, sabes en cada momento las condiciones de cada aula, lo que te permite focalizar esfuerzos y reaccionar de manera ágil.",
    btn: "ver tecnología",
    lnk: "#tecnologia",
  },
  {
    title: "Clasificar, analizar y recomendar",
    img: new URL("../assets/img/value_spec_2.png", import.meta.url).href,
    txt: "Gracias a los reportes sabes cuáles son las aulas que requieren más atención, y qué problemas tiene cada aula. De esta es mucho más fácil encontrar soluciones específicas.",
    btn: "ver demo",
    lnk: "/demo",
  },
  {
    title: "Acompañarte en el proceso",
    img: new URL("../assets/img/value_spec_3.png", import.meta.url).href,
    txt: "Recibe recomendaciones tecnológicas específicas para cada aula de manera automática y solicita el acompañamiento contínuo para hacer tus proyectos realidad.",
    btn: "Ver detalles del servicio y tarifas",
    lnk: "#tarifas",
  },
  {
    title: "Integrar a la comunidad",
    img: new URL("../assets/img/value_spec_4.png", import.meta.url).href,
    txt: "Con nuestro sistema de alertas, puedes involucrar a profesores y personal auxiliar para tomar acciones inmediatas ante eventualidades. Por ejemplo, '¡ventila la sala al salir al recreo porfavor!'.",
    btn: "Ver detalles del servicio y tarifas",
    lnk: "#tarifas",
  },
]

const segments = ref()
segments.value = [
  {
    icon: new URL("../assets/img/icono_maleta.svg", import.meta.url).href,
    title: "Administrador/a de colegio o jardín privado",
    txt: "Te ponemos en contacto con proveedores y te acompañamos en el desarrollo de tu proyecto de mejora",
  },
  {
    icon: new URL("../assets/img/icono_escudo.svg", import.meta.url).href,
    title: "Administrador/a de colegio o jardín público",
    txt: "Te ayudamos a presentar tu proyecto al programa público de mejoramiento de infraestructura escolar, directamente con la Agencia de Sostenibilidad Energética",
  },
  {
    icon: new URL("../assets/img/icono_padre.svg", import.meta.url).href,
    title: "Parte de una comunidad de apoderados",
    txt: "Te ayudamos a impulsar las iniciativas de apoderados que estén relacionadas con el mejoramiento de las aulas. ",
  },
]

const mediciones = ref()
mediciones.value = [
  {
    icon: new URL("../assets/img/icono_sensor_calor.svg", import.meta.url).href,
    txt: "Temperatura",
  },
  {
    icon: new URL("../assets/img/icono_sensor_ruido.svg", import.meta.url).href,
    txt: "Ruido",
  },
  {
    icon: new URL("../assets/img/icono_sensor_co2.svg", import.meta.url).href,
    txt: "Dióxido de carbono",
  },
  {
    icon: new URL("../assets/img/icono_sensor_humedad.svg", import.meta.url)
      .href,
    txt: "Humedad",
  },
]

const tarifas = ref()
tarifas.value = [
  {
    title: "Servicio base por sala",
    includes: [
      "Red monitorización por sala",
      "Reportes diarios, semanales y mensuales",
      "Recomendaciones de mejoras",
    ],
    price: "desde $ 15.000 / mes x sala",
  },
  {
    title: "Servicio de alertas",
    includes: [
      "Incorporación de usuarios ilimitada",
      "Mensajería por Whatsapp",
      "Geolocalización de sala y usuario",
    ],
    price: "$ 2.000 / mes x sala",
  },
  {
    title: "Servicio de acompañamiento",
    includes: [
      "Apoyo a la postulación de programas de subsidio",
      "Desarrollo de la ingeniería del proyecto",
      "Apoyo en la gestión del desarrollo del proyecto",
    ],
    price: "A convenir",
  },
]
const instrucciones = ref()
instrucciones.value = [
  {
    title: "Declara tu interés",
    txt: "Llámanos, escríbenos y agenda una visita a tu establecimiento educacional.",
    btns: [
      {
        icon: new URL("../assets/img/icono_telefono.svg", import.meta.url).href,
        lnk: "#footer",
      },
      {
        icon: new URL("../assets/img/icono_mail.svg", import.meta.url).href,
        lnk: "#footer",
      },
      {
        icon: new URL("../assets/img/icono_formulario.svg", import.meta.url)
          .href,
        lnk: "#formulario",
      },
      {
        icon: new URL("../assets/img/icono_mapa.svg", import.meta.url).href,
        lnk: "#footer",
      },
    ],
  },
  {
    title: "Vamos a terreno",
    txt: "Uno de nuestros instaladores acudirá al establecimiento, levantará los datos de cada aula y posteriormente instalará la red de monitorización.",
    btns: [{ icon: new URL("../assets/img/", import.meta.url).href, lnk: "" }],
  },
  {
    title: "Recibe los beneficios",
    txt: "Te capacitamos a ti y a tu equipo a usar las herramientas y cuidar la red de monitorización.",
    btns: [{ icon: new URL("../assets/img/", import.meta.url).href, lnk: "" }],
  },
]

const comunas = ref()
comunas.value = []
function getComunas() {
  console.log(formulario.value.region)
  const coms = regiones.value.filter(
    (region) => region.region === formulario.value.region
  )[0].comunas
  console.log(coms)
  comunas.value = coms
}

const sentMail = ref()
sentMail.value = false
async function sendMail() {
  console.log("sendMail")
  axios.post("/sendMail", { cuerpo: formulario.value }).then((res) => {
    if (res.status === 200) {
      sentMail.value = true
    }
  })
}

const cifras = ref()
cifras.value = [
  {
    txt1: "Hasta",
    num: "50%",
    txt2: "menos de enfermedades",
    color1: "sky-300",
    color2: "sky-700",
    icon: new URL("../assets/img/icono_enfermedad.svg", import.meta.url).href,
  },
  {
    txt1: "Hasta",
    num: "15%",
    txt2: "más de rendimiento académico",
    color1: "lime-500",
    color2: "green-600",
    icon: new URL("../assets/img/icono_estudio.svg", import.meta.url).href,
  },
  {
    txt1: "Garantizado",
    num: "100%",
    txt2: "comunidad más feliz",
    color1: "orange-400",
    color2: "orange-600",
    icon: new URL("../assets/img/icono_comunidad.svg", import.meta.url).href,
  },
]

const formulario = ref()
formulario.value = {
  honeypot: "",
  region: "",
  comuna: "",
}
const regiones = ref()

watch(
  () => _.cloneDeep(formulario.value),
  (currentValue, oldValue) => {
    console.log(currentValue)
    console.log(oldValue)
    getComunas()
  }
)
regiones.value = [
  {
    region: "Arica y Parinacota",
    comunas: ["Arica", "Camarones", "Putre", "General Lagos"],
  },
  {
    region: "Tarapacá",
    comunas: [
      "Iquique",
      "Alto Hospicio",
      "Pozo Almonte",
      "Camiña",
      "Colchane",
      "Huara",
      "Pica",
    ],
  },
  {
    region: "Antofagasta",
    comunas: [
      "Antofagasta",
      "Mejillones",
      "Sierra Gorda",
      "Taltal",
      "Calama",
      "Ollagüe",
      "San Pedro de Atacama",
      "Tocopilla",
      "María Elena",
    ],
  },
  {
    region: "Atacama",
    comunas: [
      "Copiapó",
      "Caldera",
      "Tierra Amarilla",
      "Chañaral",
      "Diego de Almagro",
      "Vallenar",
      "Alto del Carmen",
      "Freirina",
      "Huasco",
    ],
  },
  {
    region: "Coquimbo",
    comunas: [
      "La Serena",
      "Coquimbo",
      "Andacollo",
      "La Higuera",
      "Paiguano",
      "Vicuña",
      "Illapel",
      "Canela",
      "Los Vilos",
      "Salamanca",
      "Ovalle",
      "Combarbalá",
      "Monte Patria",
      "Punitaqui",
      "Río Hurtado",
    ],
  },
  {
    region: "Valparaíso",
    comunas: [
      "Valparaíso",
      "Casablanca",
      "Concón",
      "Juan Fernández",
      "Puchuncaví",
      "Quintero",
      "Viña del Mar",
      "Isla de Pascua",
      "Los Andes",
      "Calle Larga",
      "Rinconada",
      "San Esteban",
      "La Ligua",
      "Cabildo",
      "Papudo",
      "Petorca",
      "Zapallar",
      "Quillota",
      "Calera",
      "Hijuelas",
      "La Cruz",
      "Nogales",
      "San Antonio",
      "Algarrobo",
      "Cartagena",
      "El Quisco",
      "El Tabo",
      "Santo Domingo",
      "San Felipe",
      "Catemu",
      "Llaillay",
      "Panquehue",
      "Putaendo",
      "Santa María",
      "Quilpué",
      "Limache",
      "Olmué",
      "Villa Alemana",
    ],
  },
  {
    region: "Región del Libertador Gral. Bernardo O’Higgins",
    comunas: [
      "Rancagua",
      "Codegua",
      "Coinco",
      "Coltauco",
      "Doñihue",
      "Graneros",
      "Las Cabras",
      "Machalí",
      "Malloa",
      "Mostazal",
      "Olivar",
      "Peumo",
      "Pichidegua",
      "Quinta de Tilcoco",
      "Rengo",
      "Requínoa",
      "San Vicente",
      "Pichilemu",
      "La Estrella",
      "Litueche",
      "Marchihue",
      "Navidad",
      "Paredones",
      "San Fernando",
      "Chépica",
      "Chimbarongo",
      "Lolol",
      "Nancagua",
      "Palmilla",
      "Peralillo",
      "Placilla",
      "Pumanque",
      "Santa Cruz",
    ],
  },
  {
    region: "Región del Maule",
    comunas: [
      "Talca",
      "Constitución",
      "Curepto",
      "Empedrado",
      "Maule",
      "Pelarco",
      "Pencahue",
      "Río Claro",
      "San Clemente",
      "San Rafael",
      "Cauquenes",
      "Chanco",
      "Pelluhue",
      "Curicó",
      "Hualañé",
      "Licantén",
      "Molina",
      "Rauco",
      "Romeral",
      "Sagrada Familia",
      "Teno",
      "Vichuquén",
      "Linares",
      "Colbún",
      "Longaví",
      "Parral",
      "Retiro",
      "San Javier",
      "Villa Alegre",
      "Yerbas Buenas",
    ],
  },
  {
    region: "Región de Ñuble",
    comunas: [
      "Cobquecura",
      "Coelemu",
      "Ninhue",
      "Portezuelo",
      "Quirihue",
      "Ránquil",
      "Treguaco",
      "Bulnes",
      "Chillán Viejo",
      "Chillán",
      "El Carmen",
      "Pemuco",
      "Pinto",
      "Quillón",
      "San Ignacio",
      "Yungay",
      "Coihueco",
      "Ñiquén",
      "San Carlos",
      "San Fabián",
      "San Nicolás",
    ],
  },
  {
    region: "Región del Biobío",
    comunas: [
      "Concepción",
      "Coronel",
      "Chiguayante",
      "Florida",
      "Hualqui",
      "Lota",
      "Penco",
      "San Pedro de la Paz",
      "Santa Juana",
      "Talcahuano",
      "Tomé",
      "Hualpén",
      "Lebu",
      "Arauco",
      "Cañete",
      "Contulmo",
      "Curanilahue",
      "Los Álamos",
      "Tirúa",
      "Los Ángeles",
      "Antuco",
      "Cabrero",
      "Laja",
      "Mulchén",
      "Nacimiento",
      "Negrete",
      "Quilaco",
      "Quilleco",
      "San Rosendo",
      "Santa Bárbara",
      "Tucapel",
      "Yumbel",
      "Alto Biobío",
    ],
  },
  {
    region: "Región de la Araucanía",
    comunas: [
      "Temuco",
      "Carahue",
      "Cunco",
      "Curarrehue",
      "Freire",
      "Galvarino",
      "Gorbea",
      "Lautaro",
      "Loncoche",
      "Melipeuco",
      "Nueva Imperial",
      "Padre las Casas",
      "Perquenco",
      "Pitrufquén",
      "Pucón",
      "Saavedra",
      "Teodoro Schmidt",
      "Toltén",
      "Vilcún",
      "Villarrica",
      "Cholchol",
      "Angol",
      "Collipulli",
      "Curacautín",
      "Ercilla",
      "Lonquimay",
      "Los Sauces",
      "Lumaco",
      "Purén",
      "Renaico",
      "Traiguén",
      "Victoria",
    ],
  },
  {
    region: "Región de Los Ríos",
    comunas: [
      "Valdivia",
      "Corral",
      "Lanco",
      "Los Lagos",
      "Máfil",
      "Mariquina",
      "Paillaco",
      "Panguipulli",
      "La Unión",
      "Futrono",
      "Lago Ranco",
      "Río Bueno",
    ],
  },
  {
    region: "Región de Los Lagos",
    comunas: [
      "Puerto Montt",
      "Calbuco",
      "Cochamó",
      "Fresia",
      "Frutillar",
      "Los Muermos",
      "Llanquihue",
      "Maullín",
      "Puerto Varas",
      "Castro",
      "Ancud",
      "Chonchi",
      "Curaco de Vélez",
      "Dalcahue",
      "Puqueldón",
      "Queilén",
      "Quellón",
      "Quemchi",
      "Quinchao",
      "Osorno",
      "Puerto Octay",
      "Purranque",
      "Puyehue",
      "Río Negro",
      "San Juan de la Costa",
      "San Pablo",
      "Chaitén",
      "Futaleufú",
      "Hualaihué",
      "Palena",
    ],
  },
  {
    region: "Región Aisén del Gral. Carlos Ibáñez del Campo",
    comunas: [
      "Coihaique",
      "Lago Verde",
      "Aisén",
      "Cisnes",
      "Guaitecas",
      "Cochrane",
      "O’Higgins",
      "Tortel",
      "Chile Chico",
      "Río Ibáñez",
    ],
  },
  {
    region: "Región de Magallanes y de la Antártica Chilena",
    comunas: [
      "Punta Arenas",
      "Laguna Blanca",
      "Río Verde",
      "San Gregorio",
      "Cabo de Hornos (Ex Navarino)",
      "Antártica",
      "Porvenir",
      "Primavera",
      "Timaukel",
      "Natales",
      "Torres del Paine",
    ],
  },
  {
    region: "Región Metropolitana de Santiago",
    comunas: [
      "Cerrillos",
      "Cerro Navia",
      "Conchalí",
      "El Bosque",
      "Estación Central",
      "Huechuraba",
      "Independencia",
      "La Cisterna",
      "La Florida",
      "La Granja",
      "La Pintana",
      "La Reina",
      "Las Condes",
      "Lo Barnechea",
      "Lo Espejo",
      "Lo Prado",
      "Macul",
      "Maipú",
      "Ñuñoa",
      "Pedro Aguirre Cerda",
      "Peñalolén",
      "Providencia",
      "Pudahuel",
      "Quilicura",
      "Quinta Normal",
      "Recoleta",
      "Renca",
      "Santiago",
      "San Joaquín",
      "San Miguel",
      "San Ramón",
      "Vitacura",
      "Puente Alto",
      "Pirque",
      "San José de Maipo",
      "Colina",
      "Lampa",
      "Tiltil",
      "San Bernardo",
      "Buin",
      "Calera de Tango",
      "Paine",
      "Melipilla",
      "Alhué",
      "Curacaví",
      "María Pinto",
      "San Pedro",
      "Talagante",
      "El Monte",
      "Isla de Maipo",
      "Padre Hurtado",
      "Peñaflor",
    ],
  },
]
</script>
<style>
.score {
  height: 7px;
  width: 7px;
}
.grey-title-block {
  display: inline-block;
  height: 35px;
  width: 12px;
  background-color: #333;
  margin-right: 30px;
}
.hexagon {
  position: relative;
  height: 80px;
  width: 80px;
}
.hexagon,
.hexagon:before {
  -webkit-clip-path: polygon(
    50% 0%,
    100% 25%,
    100% 75%,
    50% 100%,
    0% 75%,
    0% 25%
  );
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
.hexagon-content {
  top: 12px;
  left: 12px;
  height: calc(100% - 24px);
  width: calc(100% - 24px);
}
.menuPoint.active {
  background-color: #fff;
}
</style>
