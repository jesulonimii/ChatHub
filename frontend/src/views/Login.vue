<template>
  <main class="flex h-screen w-full flex-col ">

    <div class="w-full h-[10%] bg-amber-300 flex justify-center items-center border-b border-gray-800 sticky top-0">
      <p class="font-outfit text-gray-800 py-2">ChatHub</p>
    </div>
    
    <div class="w-full bg-gray-200 dark:bg-gray-900 justify-center items-center text-black dark:text-white h-full flex flex-col py-8 px-8 lg:px-[30%]">

      <p  class="my-2">Your username will be {{ username }}</p>
      <input v-model=username type="text" class="w-full py-4 px-4 focus:border border-amber-300 rounded-md outline-0" placeholder="Enter a username">
      <router-link v-if="username" :to="`/chat?username=${username}`" @click="login" class="w-full p-4 bg-amber-500 my-4 h-[10%] rounded-md flex justify-center items-center text-white">
        Login
      </router-link>

      <router-link to="/chat" class="text-amber-500 w-fit my-4">Continue with Random name</router-link>

    </div>

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

function login() {
  const data = {username: props.username, id: socket.id};
  socket.emit('login', data);
}










</script>
