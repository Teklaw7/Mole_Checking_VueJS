<template>
    <div>
      <h1>Asymmetry : One half of the mole does not match the other half</h1>
      <img src="../../../pictures/a.jpg"/>
      
      <h2>Upload an Image</h2>
      <input type="file" @change="loadImage" />
      
      <!-- Display the uploaded image -->
      <canvas ref="canvas" style="border:1px solid black;"></canvas>
      
      <!-- Button to process the image -->
      <button @click="processImage">Process Image</button>
      
      <p>Result: {{ result }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Define the necessary refs and state
  const canvas = ref(null);
  const result = ref('');
  let imgElement = null;
  
  // Load the image and draw it on canvas
  const loadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      imgElement = img;
      
      img.onload = () => {
        const ctx = canvas.value.getContext('2d');
        canvas.value.width = img.width;
        canvas.value.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    };
    
    reader.readAsDataURL(file);
  };
  
  // Process the image to detect asymmetry
  const processImage = () => {
    if (!imgElement) {
      alert('Please upload an image first.');
      return;
    }
  
    // Create a new OpenCV image matrix from the canvas
    const ctx = canvas.value.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
    
    const src = cv.matFromImageData(imgData);
    const gray = new cv.Mat();
    
    // Convert to grayscale
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    
    // Threshold the image
    const thresh = new cv.Mat();
    cv.threshold(gray, thresh, 127, 255, cv.THRESH_BINARY);
  
    // Morphological Opening
    const kernel = cv.Mat.ones(5, 5, cv.CV_8U);
    const opening = new cv.Mat();
    cv.morphologyEx(thresh, opening, cv.MORPH_OPEN, kernel);
  
    // Invert and flip the image
    cv.bitwise_not(opening, opening);
    const pivot_opening = new cv.Mat();
    cv.flip(opening, pivot_opening, 1);
  
    // Compute union, intersection, and XOR
    const union = computeUnion(opening, pivot_opening);
    const intersection = computeIntersection(opening, pivot_opening);
    const xor = computeXor(opening, pivot_opening);
  
    // Compute asymmetry and dice coefficient
    const asymmetryValue = asymmetryComputation(union, xor);
    const diceValue = diceComputation(intersection, opening, pivot_opening);
  
    // Set result based on the asymmetry value
    if (asymmetryValue < 0.8) {
      result.value = `Asymmetry: ${asymmetryValue}, Dice: ${diceValue}. The lesion is malignant.`;
    } else {
      result.value = `Asymmetry: ${asymmetryValue}, Dice: ${diceValue}. The lesion is benign.`;
    }
  
    // Clean up
    src.delete(); gray.delete(); thresh.delete(); kernel.delete(); opening.delete(); pivot_opening.delete();
  };
  
  // Utility Functions (Now implemented)
  const computeUnion = (mat1, mat2) => {
    const union = new cv.Mat();
    cv.bitwise_or(mat1, mat2, union);
    return union;
  };
  
  const computeIntersection = (mat1, mat2) => {
    const intersection = new cv.Mat();
    cv.bitwise_and(mat1, mat2, intersection);
    return intersection;
  };
  
  const computeXor = (mat1, mat2) => {
    const xor = new cv.Mat();
    cv.bitwise_xor(mat1, mat2, xor);
    return xor;
  };
  
  const asymmetryComputation = (union, xor) => {
    const unionSum = cv.countNonZero(union);
    const xorSum = cv.countNonZero(xor);
    if (unionSum === 0) return 1;
    return xorSum / unionSum;
  };
  
  const diceComputation = (intersection, mat1, mat2) => {
    const intersectionSum = cv.countNonZero(intersection);
    const mat1Sum = cv.countNonZero(mat1);
    const mat2Sum = cv.countNonZero(mat2);
    if ((mat1Sum + mat2Sum) === 0) return 1;
    return (2 * intersectionSum) / (mat1Sum + mat2Sum);
  };
  </script>


<style>
    div {
        align-content: center;
    }
</style>
