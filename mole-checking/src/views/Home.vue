<template>
  <img src="../../pictures/mole-checking.jpg" alt="Mole Checking" />
  <h1>To check if a mole is a source of cancer you need to check some values : </h1>
  <ul>
    <li><strong><RouterLink to="/asymmetry">Asymmetry : </RouterLink></strong> One half of the mole does not match the other half</li>
    <li><strong><RouterLink to="/border">Border : </RouterLink></strong> The border or edges of the mole are ragged, blurred, or irregular</li>
    <li><strong><RouterLink to="/color">Color : </RouterLink></strong> The mole has different colors or it has shades of tan, brown, black, blue, white, or red</li>
    <li><strong><RouterLink to="/diameter">Diameter : </RouterLink></strong> The diameter of the mole is larger than the eraser of a pencil</li>
    <li><strong><RouterLink to="/evolution">Evolution : </RouterLink></strong> The mole appears different from others and/or changing in size, color, shape</li>
  </ul>
  <img src="../../pictures/abcde.jpg"/>
</template>

<script setup>
  
</script>

<style>
  img {
    width: 100%;
  }

  h1 {
    text-align: center;
    padding-top: 10%;
  }

  ul {
    padding: 3%;
  }

  li {
    margin: 5%;
    font-size: 250%;
  }

  strong {
    font-size: 100%;
  }

</style> 
