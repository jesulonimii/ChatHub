<template>
  <main class="flex h-screen w-full flex-col ">

    <div class="w-full h-[10%] bg-amber-300 flex justify-center items-center border-b border-gray-800 sticky top-0">
      <p class="font-outfit text-gray-800 py-2">ChatHub</p>
    </div>
    
    <form @submit="handleEnterPress" class="w-full bg-gray-200 dark:bg-gray-900 justify-center items-center text-black dark:text-white h-full flex flex-col py-8 px-8 lg:px-[30%]">

      <p id="info"></p>
      <input @keyup="checkUsername($event)" v-model=username type="text" class="w-full py-4 px-4 focus:border border-amber-300 rounded-md outline-0" placeholder="Enter a username">
      <router-link type="submit" id="next"  v-if="username" :to="`/chat?username=${username}`"  class="hidden w-full p-4 bg-amber-500 my-4 h-[10%] rounded-md flex justify-center items-center text-white">
        Continue as {{username}}
      </router-link>
      <router-link to="/chat" class="text-amber-500 w-fit my-4">Continue with Random name</router-link>

    </form>

  </main>
</template>

<script setup>
import IconButton from "../components/IconButton.vue";
import BotMessage from "../components/BotMessage.vue";
import ChatMessageIn from "../components/ChatMessageIn.vue";
import ChatMessageOut from "../components/ChatMessageOut.vue";

import {ref} from "vue";

const emit = defineEmits(['setUsername'])

const props = defineProps({
  socket: {
    type: Object,
    required: false,
  },
  username: {
    type: String,
  }
})

const socket =props.socket

function handleEnterPress(e){
  e.preventDefault(); // Otherwise the form will be submitted
  sendMsg()
}

function checkUsername(event) {
  if(event.target.value.trim() === '') {
    document.getElementById('info').hidden = true
  }
  else {
    document.getElementById('info').hidden = false
  }

  socket.emit('check-username', event.target.value.trim());
}



socket.on('username-taken', (data) => {

  if (data.taken){
    document.querySelector('#info').innerHTML = `${data.username} is taken`;
    document.querySelector('#info').setAttribute('class', 'my-2 w-full text-center text-red-500 bg-red-100 border rounded-md p-4');
    document.querySelector('#next').setAttribute('class', 'hidden w-full p-4 bg-amber-500 my-4 h-[10%] rounded-md flex justify-center items-center text-white')


  }
  else {
    document.querySelector('#info').innerHTML = `${data.username} is available`;
    document.querySelector('#info').setAttribute('class', 'my-2 w-full text-center text-green-500 bg-green-100 border rounded-md p-4');
    document.querySelector('#next').setAttribute('class', 'w-full p-4 bg-amber-500 my-4 h-[10%] rounded-md flex justify-center items-center text-white')
  }

 })










</script>
