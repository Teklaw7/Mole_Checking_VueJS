<template>
  <Header></Header>
  <HeaderConditions></HeaderConditions>
  <RouterView></RouterView>
</template>

<script setup>
  import Header from './components/Header/Header.vue';
  import HeaderConditions from './components/Header/HeaderConditions.vue'
  document.title = 'Mole Checking';

  import { ref } from 'vue';
</script>

