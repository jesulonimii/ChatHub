<template>
  <main class="flex h-screen w-full flex-col ">

    <div class="w-full h-[10%] bg-amber-300 flex justify-center items-center border-b border-gray-800 sticky top-0">
      <p class="font-outfit text-gray-800 py-2">ChatHub</p>
    </div>
    
    <div class="w-full bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full flex flex-col py-8 px-8 lg:px-80">

      <p  class="my-2">Your username will be {{ uname }}</p>
      <input v-model="uname" type="text" class="py-4 px-4 focus:border border-amber-300 rounded-md outline-0" placeholder="Enter a username">
      <router-link to="/chat" :name=uname class="p-4 bg-red-500 my-4 h-[10%] rounded-md flex justify-center items-center text-white">Login</router-link>

    </div>

  </main>
</template>

<script setup>
import IconButton from "../components/IconButton.vue";
import BotMessage from "../components/BotMessage.vue";
import ChatMessageIn from "../components/ChatMessageIn.vue";
import ChatMessageOut from "../components/ChatMessageOut.vue";

import {ref} from "vue";

const img = "https://jesulonimii.codes/img/me.jpg"


const props = defineProps({
  socket: {
    type: Object,
    required: false,
  }
})
const socket = props.socket

let messages = ref([])
const container = document.querySelector('#msg-ctn')

socket.on('message', async msg => {

  messages.value.push(msg)


})

const sendMsg = () => {



  const input = document.querySelector('#input')
  const msg = input.value.trim()

  if (msg !== '') {
    socket.emit('chatMessage', msg)
    input.value = ''
  }


}

</script>
