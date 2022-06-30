<template>
  <div class="relative" ref="root">
    <!-- top Banner ################################## -->
    <div id="home" class="top-banner relative w-full h-100">
      <div
        class="w-full h-screen bg-[url('@/assets/img/fondo_top.jpg')] md:bg-cover bg-[length:1200px] bg-center bg-no-repeat"
        alt=""
      >
        <div class="w-full h-screen bg-black/[0.4]"></div>
        <h1
          class="absolute leading-snug text-white left-1/2 text-4xl xl:top-3/4 md:top-1/2 top-1/2 z-10 text-center md:w-2/3 w-full transform -translate-x-1/2 mix-blend-screen"
        >
          Sabemos de tu compromiso con su educación <br />
          y queremos <br class="md:hidden block" />
          <span class="bg-white pl-3 pr-3 ml-3 rounded-md text-black"
            >ayudarte a cumplirlo</span
          >
        </h1>
      </div>
    </div>

    <!-- value proposition ################################## -->

    <div class="flex flex-col content-center items-center">
      <div class="md:w-1/2 w-full">
        <h1
          class="text-gray-700 leading-snug mt-20 text-4xl text-center w-full"
        >
          Y para cumplirlo, tus niños necesitan y se merecen
          <span
            class="bg-gradient-to-r from-sky-600 to-blue-600 pl-3 pr-3 ml-3 rounded-md text-white"
            >espacios confortables</span
          >
        </h1>
      </div>

      <div class="w-full mt-20 relative h-60">
        <div
          class="absolute z-1 top-0 right-0 w-full bg-gradient-to-r from-sky-600 to-blue-600 xl:h-40 md:h-80 h-96"
        ></div>
        <div
          class="px-20 grid xl:grid-cols-6 grid-cols-3 md:gap-1 md:gap-y-0 gap-y-20 items-center"
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
              class="relative z-10 xl:mt-10 mt-3 text-center xl:text-gray-700 text-white xl:text-xl text-sm"
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
            class="bg-gradient-to-tr shadow-lg from-lime-500 to-green-700 md:w-60 w-full md:h-96 md:rounded-xl text-center p-12"
          >
            <img
              class="w-28 inline-block mt-10"
              src="@/assets/img/icono_enfermedad.svg"
              alt=""
            />
            <br />
            <h2 class="text-white leading-[25px] mt-10 text-xl">
              Hasta <br />
              <b class="text-4xl">50%</b> <br />
              menos de enfermedades
            </h2>
          </div>
          <div
            class="bg-gradient-to-tr shadow-lg from-fuchsia-700 to-violet-700 md:w-60 w-full md:h-96 md:rounded-xl text-center p-12"
          >
            <img
              class="w-28 inline-block mt-10"
              src="@/assets/img/icono_rendimiento.svg"
              alt=""
            />
            <br />
            <h2 class="text-white leading-[25px] mt-10 text-xl">
              Hasta <br />
              <b class="text-4xl">15%</b> <br />
              más de rendimiento
            </h2>
          </div>

          <div
            class="bg-gradient-to-tr shadow-lg from-orange-600 to-rose-600 md:w-60 w-full md:h-96 md:rounded-xl text-center p-12"
          >
            <img
              class="w-28 inline-block mt-10"
              src="@/assets/img/icono_comunidad.svg"
              alt=""
            />
            <br />
            <h2 class="text-white leading-[25px] mt-10 text-xl">
              Garantizado,
              <b class="text-4xl">100%</b> <br />
              comunidad más feliz
            </h2>
          </div>
        </div>
      </div>

      <div class="md:w-1/2 w-full mt-10">
        <h1
          id="como-funciona"
          class="text-gray-700 leading-snug md:mt-20 mt-40 text-4xl text-center w-full"
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
            <div class="w-full shadow-lg p-5 bg-white">
              <h1 class="text-gray-700 text-left text-xl mb-5">
                {{ benefit.title }}
              </h1>
              <p class="text-justify">{{ benefit.txt }}</p>
              <a
                v-bind:href="benefit.lnk"
                class="rounded-full mt-5 p-1 text-lg inline-block bg-gradient-to-r from-sky-500 to-blue-600 text-white xl:w-1/2 px-10 md:w-3/4"
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
              <p class="mt-5">
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
        class="w-full md:mt-20 mt-10 md:h-[600px] h-96 bg-[url('@/assets/img/fondo_sensor.jpg')] md:bg-[length:1200px] bg-[length:600px] bg-center bg-no-repeat"
        alt=""
      ></div>

      <div class="w-full md:mt-20 mt-10 text-center">
        <h1 class="text-sky-500 leading-snug text-4xl text-center w-full">
          Estación comfort
        </h1>
        <h2 class="text-blue-800 text-3xl mt-5 mb-10">
          Medición c/5 minutos de
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
              Tamaño del dispositivo
            </h2>
            <h2 class="text-sky-500 text-3xl mt-2 w-full">20 x 20 x 5 cm</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-5">
      <h1
        id="tarifas"
        class="text-gray-700 leading-snug md:mt-20 mt-10 text-4xl text-center w-full"
      >
        Tarifas de servicio
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
            <h2 class="mb-2">Incluye:</h2>
            <ul class="list-disc ml-5 mb-5">
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
        <ul class="list-disc ml-5 mb-5">
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
        class="text-gray-700 leading-snug md:mt-20 mt-10 text-4xl text-center w-full"
      >
        Contrata Minding Comfort
      </h1>
    </div>

    <div class="w-full mt-10 xl:px-60 flex justify-center flex-wrap">
      <div
        class="w-2/3 grid grid-cols-6 self-center gap-y-5 place-self-center place-items-center md:place-items-left mt-10"
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
          <p>
            Llámanos, escríbenos, llena el formularo, ven a vernos, cómo gustes
          </p>
          <div
            class="flex gap-4 mt-5 justify-center md:justify-start"
            v-if="instruccion.btns.length > 1"
          >
            <img
              class="w-20"
              v-for="(btn, i) in instruccion.btns"
              :key="i"
              v-bind:src="btn.icon"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-20">
      <h1
        class="text-gray-700 leading-snug md:mt-10 mt-10 text-2xl text-center w-full"
      >
        Formulario de solicitud de servicio
      </h1>
      <p class="text-center w-full">
        Llena y envía el formulario y te contactaremos en menos de 48 horas
      </p>
    </div>

    <div
      class="w-full mt-5 px-20 bg-gradient-to-tr from-sky-500 to-blue-600 text-white text-left p-5 flex place-items-center items-center justify-items-center justify-center"
    >
      <div class="md:w-1/3 flex justify-center">
        <div class="w-full grid grid-cols-2 gap-x-10">
          <div class="col-span-2 mt-5">
            <p class="w-full text-center">Nombre persona de contacto</p>
            <input
              class="w-full rounded-md mt-5 h-10 text-black p-5"
              type="text"
            />
            <p class="w-full text-center mt-5">Nombre de establecimiento</p>
            <input
              class="w-full rounded-md mt-5 h-10 text-black p-5"
              type="text"
            />
          </div>
          <div class="col-span-1 mt-5">
            <p class="w-full text-center">Región</p>
            <input
              class="w-full rounded-md mt-5 h-10 text-black p-5"
              type="text"
            />
            <p class="w-full text-center mt-5">Comuna</p>
            <input
              class="w-full rounded-md mt-5 h-10 text-black p-5"
              type="text"
            />
          </div>
          <div class="col-span-1 mt-5">
            <p class="w-full text-center">Teléfono</p>
            <input
              class="w-full rounded-md mt-5 h-10 text-black p-5"
              type="text"
            />
            <p class="w-full text-center mt-5">Correo electrónico</p>
            <input
              class="w-full rounded-md mt-5 h-10 text-black p-5"
              type="text"
            />
          </div>
          <div class="col-span-2 mt-10 text-center flex justify-center">
            <a
              class="border-white border-2 w-80 block text-center rounded-full p-2"
              >Enviar solicitud</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="w-full xl:h-[450px] h-[600px] footer"></div>
    <div
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
            <p class="ml-5 text-white text-lg">holacomfort.minding.ai</p>
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
import { ref, onMounted, getCurrentInstance } from "vue"
const props = defineProps(["mainData"])
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
    txt: "Suficientemente iluminados",
  },
  {
    img: new URL("../assets/img/icono_co2.svg", import.meta.url).href,
    txt: "Con niveles de CO2 aceptables",
  },
]
const benefits = ref()
benefits.value = [
  {
    title: "Monitorizar las condiciones",
    img: new URL("../assets/img/value_spec_1.png", import.meta.url).href,
    txt: "Con nuestra red de monitoreo, sabrás en cada momento las condiciones de cada aula, lo que te permitirá saber cuáles son.",
    btn: "ver tecnología",
    lnk: "#tecnologia",
  },
  {
    title: "Clasificar, analizar y recomendar",
    img: new URL("../assets/img/value_spec_2.png", import.meta.url).href,
    txt: "Gracias a los reportes sabrás cuáles son las aulas que requieren más atención, y qué problemas tiene cada aula. De esta es mucho más fácil encontrar soluciones específicas.",
    btn: "ver demo",
    lnk: "/demo",
  },
  {
    title: "Acompañarte en el proceso",
    img: new URL("../assets/img/value_spec_3.png", import.meta.url).href,
    txt: "Recibe recomendaciones tecnológicas específicas para cada aula de manera automática y solicita el acompañamiento contínuo para hacer tus proyectos realidad.",
    btn: "ver tarifas de servicio",
    lnk: "#tarifas",
  },
  {
    title: "Integrar a la comunidad",
    img: new URL("../assets/img/value_spec_4.png", import.meta.url).href,
    txt: "Con nuestro sistema de alertas, puedes involucrar a profesores y personal auxiliar para tomar acciones inmediatas ante eventualidades. Por ejemplo, '¡ventila la sala al salir al recreo porfavor!'.",
    btn: "ver tarifas de servicio",
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
    txt: "Te ayudamos a presentar tu proyecto al programa público de mejoramiento de infraestructura escolar, directamente con la ASE",
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
    price: "A convenir / mes",
  },
]
const instrucciones = ref()
instrucciones.value = [
  {
    title: "Declara tu interés",
    txt: "Llámanos, escríbenos, llena el formularo, ven a vernos, cómo gustes.",
    btns: [
      {
        icon: new URL("../assets/img/icono_telefono.svg", import.meta.url).href,
        lnk: "",
      },
      {
        icon: new URL("../assets/img/icono_mail.svg", import.meta.url).href,
        lnk: "",
      },
      {
        icon: new URL("../assets/img/icono_formulario.svg", import.meta.url)
          .href,
        lnk: "",
      },
      {
        icon: new URL("../assets/img/icono_mapa.svg", import.meta.url).href,
        lnk: "",
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
</style>
