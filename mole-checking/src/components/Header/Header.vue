<template>
    <header>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/pictures">Pictures</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
    </header>

</template>

<script setup>
</script>

<style>
    header {
        display: flex;
        justify-content: space-around;
        padding: 1%;
        background-color: #333;
        color: white;
    }

    a {
        color: rgb(255, 255, 255);
        text-decoration: none;
        font-size: 1.5em;
    }

    a:hover {
        text-decoration: underline;
    }
</style>