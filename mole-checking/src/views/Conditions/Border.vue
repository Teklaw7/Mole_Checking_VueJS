<!-- <template>
    <h1>
        Border : The border or edges of the mole are ragged, blurred, or irregular
    </h1>
    <img src="../../../pictures/b.jpg"/>
</template> 

<script setup>

</script> -->


<template>
    <div>
      <h1>Border : The border or edges of the mole are ragged, blurred, or irregular</h1>
      <img src="../../../pictures/b.jpg"/>
      <h2>Upload a Mole Image</h2>
      <input type="file" @change="loadImage" />
      
      <canvas ref="canvas" style="border:1px solid black;"></canvas>
      
      <button @click="analyzeMoleBorder">Analyze Mole Border</button>
      
      <p>Irregularity Ratio: {{ irregularityRatio }}</p>
      <p>{{ resultMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const canvas = ref(null);
  const irregularityRatio = ref(0);
  const resultMessage = ref('');
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
  
  // Perform mole border analysis using OpenCV.js
  const analyzeMoleBorder = () => {
    if (!imgElement) {
      alert('Please upload an image first.');
      return;
    }
  
    const ctx = canvas.value.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
    const src = cv.matFromImageData(imgData);
  
    const height = src.rows;
    const width = src.cols;
    const margin = 20;
  
    // Initial mask for GrabCut
    const mask = new cv.Mat.zeros(height, width, cv.CV_8U);
  
    // Rectangle for GrabCut
    const rect = new cv.Rect(margin, margin, width - 2 * margin, height - 2 * margin);
  
    // Models for background and foreground
    const bgdModel = new cv.Mat();
    const fgdModel = new cv.Mat();
  
    // Apply GrabCut
    cv.grabCut(src, mask, rect, bgdModel, fgdModel, 5, cv.GC_INIT_WITH_RECT);
  
    // Generate binary mask
    const mask2 = new cv.Mat(height, width, cv.CV_8U);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        mask2.ucharPtr(i, j)[0] = (mask.ucharPtr(i, j)[0] == cv.GC_FGD || mask.ucharPtr(i, j)[0] == cv.GC_PR_FGD) ? 255 : 0;
      }
    }
  
    // Segment the mole
    const moleSegmented = new cv.Mat();
    cv.bitwise_and(src, src, moleSegmented, mask2);
  
    // Convert the segmented mole to grayscale
    const moleGray = new cv.Mat();
    cv.cvtColor(moleSegmented, moleGray, cv.COLOR_RGBA2GRAY);
  
    // Apply threshold to the grayscale mole image
    const thresh = new cv.Mat();
    cv.threshold(moleGray, thresh, 1, 255, cv.THRESH_BINARY);
  
    // Find contours
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
  
    if (contours.size() === 0) {
      alert("No contours found. Ensure the mole is clear in the image.");
      return;
    }
  
    // Find the largest contour
    const contour = contours.get(0);
  
    // Draw contour on the original image
    const color = new cv.Scalar(0, 255, 0);
    cv.drawContours(src, contours, 0, color, 2);
  
    // Calculate perimeter and area of the contour
    const perimeter = cv.arcLength(contour, true);
    const area = cv.contourArea(contour);
  
    // Compute irregularity ratio
    irregularityRatio.value = Math.pow(perimeter, 2) / (4 * Math.PI * area);
    
    if (irregularityRatio.value > 1.5) {
      resultMessage.value = "The mole has an irregular border (potential concern).";
    } else {
      resultMessage.value = "The mole's border looks regular.";
    }
  
    // Display result on the canvas
    const imgDataNew = new ImageData(new Uint8ClampedArray(src.data), src.cols, src.rows);
    ctx.putImageData(imgDataNew, 0, 0);
  
    // Clean up
    src.delete(); mask.delete(); rect.delete(); bgdModel.delete(); fgdModel.delete();
    mask2.delete(); moleSegmented.delete(); moleGray.delete(); thresh.delete(); contours.delete(); hierarchy.delete();
  };
  </script>

