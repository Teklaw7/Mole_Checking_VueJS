<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<script setup>
  import Header from './components/Header/Header.vue';
  document.title = 'Mole Checking';
</script>

