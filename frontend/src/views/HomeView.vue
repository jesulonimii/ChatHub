<template>
  <main class="flex h-screen w-full flex-col ">

    <div class="w-full h-[10%] bg-amber-300 flex justify-center items-center border-b border-gray-800 sticky top-0">
      <p class="font-outfit text-gray-800 py-2">ChatHub ⚡</p>
    </div>
    
    <div id="msg-ctn" class="w-full overflow-y-auto bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full flex flex-col py-8 px-2 lg:px-80">

      <div v-for="x in messages" class="flex" :key="x.id" >
        <BotMessage  v-if="x.username === 'bot'" :message=x.message />
        
        <div v-else class="flex w-full">
          <ChatMessageOut v-if="x.username === username" :message=x.message :username=x.username :img="img2" :time="x.time" />
          <ChatMessageIn v-else :message=x.message :username=x.username :img="img" :time="x.time"  />
        </div>


      </div>

    </div>

    <form @submit="handleEnterPress" class="w-full bg-amber-300 h-[10%] flex lg:px-80 sticky bottom-0">

      <div class="w-full flex p-1">
        <input id="input" type="text" class="outline-0 w-full px-4 p bg-amber-200" placeholder="Type a message..."/>
      </div>
      <IconButton type="submit" @click="sendMsg()" icon="message" link="" class="w-[15%] flex justify-center items-center text-white dark:text-gray-900 bg-amber-300"/>


    </form>

  </main>
</template>

<script setup>
import IconButton from "../components/IconButton.vue";
import BotMessage from "../components/BotMessage.vue";
import ChatMessageIn from "../components/ChatMessageIn.vue";
import ChatMessageOut from "../components/ChatMessageOut.vue";

import {ref} from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const img = "https://jesulonimii.codes/img/me.jpg"
const img2 = "https://media.istockphoto.com/vectors/person-gray-photo-placeholder-man-vector-id1202490454?k=20&m=1202490454&s=612x612&w=0&h=G-CL9QvsuJbGV7QcchGsAPS3njcJ-hheqni9MS_A9-8="

var nameList = [
  'Time','Past','Future','Dev',
  'Fly','Flying','Soar','Soaring','Power','Falling',
  'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
  'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
  'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
  'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
  'Mine','Your','Worst','Enemy','Hostile','Force','Video',
  'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
  'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
  'Script','Writer','Near','Close','Open','Cube','Circle',
  'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
  'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
  'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
  'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
  'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
  'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
  'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
  'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
  'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
  'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
  'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich',
  'Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey',   'Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy',
  'Girl','Vortex','Paradox'
];


const props = defineProps({
  socket: {
    type: Object,
    required: false,
  }
})
const socket = props.socket

let username = route.query.username
if (!username) {
  const r1 = Math.floor(Math.random() * nameList.length);
  const r2 = Math.floor(Math.random() * nameList.length);
  route.query.username = `${nameList[r1]} ${nameList[r2]}`
  username = route.query.username
}

const messagesContainer = document.querySelector('#msg-ctn')

//display messages
let messages = ref([])
socket.on('message', msg => {

  messages.value.push(msg)

  messagesContainer.scrollTop = messagesContainer.scrollHeight



})


function handleEnterPress(e){
  e.preventDefault(); // Otherwise the form will be submitted
  sendMsg()
}

const sendMsg = () => {
  const input = document.querySelector('#input')


  const msg = input.value.trim()

  const messagePayload = {
    username: username,
    message: msg
  }

  if (msg !== '') {
    socket.emit('chatMessage', messagePayload)
    input.value = ''
    input.focus()
  }


}



const data = {username: username, id: socket.id};
socket.emit('logged-in', data);

</script>
