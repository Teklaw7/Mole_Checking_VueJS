<template>
  <h1>Count : {{count}}</h1>
  <!-- <button @click="count++">Increment</button> -->
  <!-- <button @click="count--">Decrement</button> -->
  <button v-on:click="increment">Increment</button>
  <button v-on:click="decrement">Decrement</button>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(10)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

</script>

<style>
  h1 {
    color: blue;
  }
</style>
