<template>
  <Header></Header>
  <img src="../pictures/mole-checking.jpg" alt="Mole Checking" />
  <RouterView></RouterView>
</template>

<script setup>
  import Header from './components/Header/Header.vue';
</script>

<style>
  img {
    width: 100%;
  }
</style> 
