<template>
    <h1>Please login</h1>
    <form>
        <label for="username">Username:</label>
        <input v-model="userInput" type="text" id="username" name="username" >
        <label for="password">Password:</label>
        <input v-model="passwordInput" type="password" id="password" name="password">
        <button :disabled="!userInput.includes('@gmail.com') || !passwordInput" @click="clearValues">Login</button>
        <div v-if="!userInput.includes('@gmail.com')">Username has to include @gmail.com</div>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    const userInput = ref('');
    const passwordInput = ref('');

    const clearValues = () => {
        userInput.value = '';
        passwordInput.value = '';
    }
</script>

<style>
    button {
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }
</style>