<template>
  <main class="flex h-screen w-full flex-col dark">

    <div class="w-full h-[10%] bg-amber-300 flex justify-center items-center border-b border-gray-800 sticky top-0">
      <p class="font-outfit text-gray-800 py-2">ChatHub</p>
    </div>
    
    <div class="w-full bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full flex flex-col py-8 px-2 lg:px-80">
      
      <div class="h-fit w-full my-2 flex pr-8">

        <img :src=img class="rounded-full mx-2 w-10 h-10 border border-amber-300">
        
        <div class="bg-amber-300 h-fit w-full rounded-xl text-gray-900 px-3 py-2">
          <p class="mb-1 font-bold text-xs">Jesulonimii</p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at cum delectus doloribus excepturi fuga impedit ipsa laboriosam laudantium magni, nemo perspiciatis quae quam reprehenderit similique voluptas voluptatibus? Officiis, soluta?
          <p class="text-gray-600 text-xs mt-4">7:00 PM</p>
        </div>
        
      </div>

      <ChatMessageOut   time="7.00 pm" message='Lorem ipsum ejokw eujksikje esjkes ejk ed' username='Me' />


      <div v-for="x in messages" class="flex" id="msg-ctn" :key="x.id" >
        <BotMessage  v-if="x.username === 'bot'" :message=x.message />

        <ChatMessageIn  v-else-if="x.username !== 'bot'" :time="x.time" :message=x.message :username=x.username :key="updateKey" />

      </div>



    </div>

    <div class="w-full bg-amber-300 h-[10%] flex lg:px-80 sticky bottom-0">
      <div class="w-full flex p-1">
        <input id="input" type="text" class="outline-0 w-full px-4 p bg-amber-200" placeholder="Type a message..."/>
      </div>
      <IconButton @click="sendMsg()" icon="message" link="" class="w-[15%] flex justify-center items-center text-white dark:text-gray-900 bg-amber-300"/>


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
  },
  name: {
    type: String,
    required: true,
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
