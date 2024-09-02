<template>
  <h1 :style="{color: count > 5 ? 'red' : 'green'}">Count : {{count}}</h1>
  <!-- Hide or show something with a condition -->
  <!-- <div v-show="count >= 10">Count is greater than or equal to 10</div> --> 
  <!-- <div v-if="count >= 5">Count is greater than or equal to 5</div>
  <div v-else>Count is less than 5</div> -->

  <!-- Use button and functions on click -->
  <!-- <button @click="count++">Increment</button> -->
  <!-- <button @click="count--">Decrement</button> -->
  <button v-on:click="increment">Increment</button>
  <button v-on:click="decrement">Decrement</button>

    <form action="" @submit.prevent="addMovie">
      <input type="text" v-model="newMovie">
      <button >Add Movie</button>
    </form>


    <!-- Example of loop -->
    <ul>
      <li v-for="movie in movies">
        {{movie}} <button @click="deleteMovie(movie)">Delete</button>
        <button @click.prevent="modifyMovie(movie)">Modify</button>
      </li>
    </ul>

</template>

<script setup>
import { ref } from 'vue'


const newMovie = ref('')
const movies = ref(['The Matrix', 'The Matrix Reloaded', 'The Matrix Revolutions'])
const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

// const addMovie = (event) => {
//   event.preventDefault()
//   movies.value.push(newMovie.value)
//   newMovie.value = ''
// }

const addMovie = () => {
  movies.value.push(newMovie.value)
  newMovie.value = ''
}

const deleteMovie = (movie) => {
  movies.value = movies.value.filter(m => m !== movie)
}

const modifyMovie = (movie) => {
  const newTitle = prompt('Enter new title')
  movies.value = movies.value.map(m => m === movie ? newTitle : m)
}

</script>

<style>
  h1 {
    color: blue;
  }
</style>
