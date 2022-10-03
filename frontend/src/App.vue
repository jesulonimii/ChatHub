<template>


  <main>

    <RouterView  :socket=socket />

  </main>


</template>

<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'

import io from 'socket.io-client'

const route = useRoute()
const socketAddress = import.meta.env.VITE_SOCKET_ADDRESS || `${window.location.hostname}:5000`

const socket = io(socketAddress)

</script>


