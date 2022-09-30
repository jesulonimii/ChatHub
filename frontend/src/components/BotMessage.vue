<template>

  <div class="h-fit my-2 w-full flex justify-center items-center text-gray-500">
    <i :class="[`uil uil-${icon} mx-2 ${animateIcon}`]"></i>
    <p>{{ message }}</p>
  </div>


</template>

<script setup>

defineProps({
  icon: {
    type: String,
    default: "megaphone"
  },
  animateIcon: {
    type: String
  },
  message: {
    type: String,
    required: true
  }
})

</script>
