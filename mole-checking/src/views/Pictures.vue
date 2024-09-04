<template>
    <div>
      <!-- Drag and Drop Zone -->
      <div
        class="drop-zone"
        :class="{ 'drop-zone-hover': isHovering }"
        @dragover.prevent="onDragOver"
        @drop.prevent="onDrop"
        @click="triggerFileInput"
        @dragenter.prevent="onDragEnter"
        @dragleave.prevent="onDragLeave"
      >
        Drag & drop images here or click to select
      </div>
      
      <!-- Hidden File Input -->
      <input
        type="file"
        ref="fileInput"
        @change="onFileChange"
        accept="image/*"
        multiple
        style="display: none"
      />
  
      <!-- Image Grid -->
      <div v-if="imageUrls.length" class="image-grid">
        <div v-for="(url, index) in imageUrls" :key="index" class="image-item">
          <img :src="url" alt="Uploaded Image" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Reactive array to store image URLs
  const imageUrls = ref([]);
  
  // Reference to the hidden file input
  const fileInput = ref(null);
  
  // Reactive state to manage the hover effect
  const isHovering = ref(false);
  
  // Function to handle file input change
  const onFileChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };
  
  // Function to handle files dropped in the drop zone
  const onDrop = (event) => {
    isHovering.value = false; // Reset hover state on drop
    const files = event.dataTransfer.files;
    handleFiles(files);
  };
  
  // Function to trigger the hidden file input
  const triggerFileInput = () => {
    fileInput.value.click();
  };
  
  // Function to handle drag over event
  const onDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
  };
  
  // Function to handle drag enter event
  const onDragEnter = () => {
    isHovering.value = true;
  };
  
  // Function to handle drag leave event
  const onDragLeave = () => {
    isHovering.value = false;
  };
  
  // Function to process files and generate image URLs
  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        imageUrls.value.push(imageUrl);
      }
    }
  };
  </script>
  
  <style scoped>
  .drop-zone {
    border: 2px dashed #ccc;
    padding: 100px;
    text-align: center;
    cursor: pointer;
    background-color: #f9f9f9;
    margin-top: 50px;
    margin-bottom: 50px;
    transition: background-color 0.3s ease;
  }
  
  /* Background color change when hovering over the drop zone */
  .drop-zone-hover {
    background-color: #d3ffd3; /* Light green background when hovering */
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .image-item img {
    width: 100%;
    height: auto;
    padding: 10px;
  }
  </style>
  