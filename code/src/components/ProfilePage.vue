<template>
  <div class="flex justify-center h-screen items-center bg-white">
    <div class="relative w-1/3 h-1/3">
      <div
        class="rounded-full bg-slate-200 h-40 w-40 absolute left-1/2 transform -translate-y-1/2"
      ></div>
      <div class="w-full bg-white shadow-md rounded-2xl mt-20 h-96 pt-24 px-10">
        <h3 class="text-2xl w-full mb-5">Usuario Demo</h3>
        <p class="text-md text-slate-700 w-full">
          Este perfil tiene permisos reducidos, si quieres acceder al producto
          completo, puedes llenar el formulario de la página principal y
          solicitar el servicio.
        </p>
        <div class="flex w-full justify-center mt-14">
          <a
            @click="closeSession()"
            class="border-2 border-slate-600 hover:bg-slate-600 p-4 rounded-full hover:text-white cursor-pointer w-40"
            >Cerrar sesión</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
function closeSession() {
  localStorage.removeItem("token")
  window.location.href = "/"
}
</script>
