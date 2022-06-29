<template>
  <nav class="w-full bg-black/[.6] h-18 py-5 sm:px-4 z-10">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="#home" class="flex items-center">
        <img
          src="@/assets/logo.svg"
          class="mx-3 h-9 md:h-9"
          alt="Minding Comfort Logo"
        />
        <span
          class="self-center text-4xl font-ailerons font-semibold whitespace-nowrap text-white dark:text-white"
          ><h3 class="logo hidden md:block">COMFORT</h3></span
        >
      </a>
      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="mobile-menu"
        aria-expanded="false"
      ></button>
      <div class="flex items-center md:order-2">
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <!-- <span class="sr-only">Open main menu</span> -->
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
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
              class="border-white rounded-full border-2 ml-14 pr-2 pl-2 md:hover:bg-white"
            >
              <a
                href="#"
                class="block text-xl py-2 pr-4 pl-3 text-white hover:bg-white md:hover:bg-white md:border-0 md:hover:text-black md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Ingresa | Demo</a
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import axios from "../services/axios"
import { ref } from "vue"
const props = defineProps(["mainData"])
const mainData = props.mainData
</script>
