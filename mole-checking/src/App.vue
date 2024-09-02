<template>
  <h1>Todo List</h1>

  <form action="" @submit.prevent="addTodo">
    <fieldset role="group">
      <input v-model="newTodo" type="text" placeholder="Tasks to do" />
      <button :disabled="newTodo.length == 0">Add</button>
    </fieldset>
  </form>
  
  <div v-if="todos.length == 0"> You have no tasks </div>
  <div v-else>
    <ul>
      <li v-for="todo in sortedTodos()" :key="todo.date" :class="{done : todo.done}">
        <label>
          <input type="checkbox" v-model="todo.done" />
          {{ todo.title }}
        </label>
      </li>
    </ul>
    <label>
      <input type="checkbox" v-model="hideDone"> Hide Done Tasks 
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([])

const newTodo = ref('')

const addTodo = () => {
  todos.value.push({
    title: newTodo.value,
    done: false,
    date: Date.now()
  })
  newTodo.value = ''
}

const sortedTodos = () => {
  const sortedTodos = todos.value.toSorted((a, b) => a.done > b.done ? 1 : -1)
  if (hideDone.value) {
    return sortedTodos.filter(todo => !todo.done)
  }
  else {
    return sortedTodos
  }
}

const hideDone = ref(false)
  
</script>

<style>
  .done {
    opacity: .5;
    text-decoration: line-through;
  }
</style>