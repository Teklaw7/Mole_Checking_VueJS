<template>
  <h1>Count : {{count}}</h1>
  <!-- <div v-show="count >= 10">Count is greater than or equal to 10</div> -->
  <div v-if="count >= 5">Count is greater than or equal to 5</div>
  <div v-else>Count is less than 5</div>
  <!-- <button @click="count++">Increment</button> -->
  <!-- <button @click="count--">Decrement</button> -->
  <button v-on:click="increment">Increment</button>
  <button v-on:click="decrement">Decrement</button>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)

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
