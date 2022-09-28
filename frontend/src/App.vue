<template>


  <main>

    <RouterView  :socket=socket />

  </main>


</template>

<script setup>
import {RouterLink, RouterView} from 'vue-router'

import io from 'socket.io-client'

const socket = io('http://localhost:5000')


</script>


