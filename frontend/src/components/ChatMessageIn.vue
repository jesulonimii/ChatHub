<template>

  <div class="w-full">
    <div class="h-fit w-fit float-left my-2 flex pr-8">

      <img :src=img class="rounded-full mx-2 w-10 h-10 border border-amber-300">

      <div class="bg-amber-300 h-fit w-full rounded-xl text-gray-900 px-3 py-2">
        <p class="mb-1 font-bold text-xs">{{ username }}</p>
        {{ message }}
        <p class="text-gray-600 text-xs mt-4">{{ time }}</p>
      </div>

    </div>
  </div>


</template>

<script setup>

defineProps({
  img: {
    type: String,
    default: "megaphone"
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})

</script>
