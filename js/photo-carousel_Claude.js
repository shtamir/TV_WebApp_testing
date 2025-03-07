// photo-carousel.js - Photo carousel functionality for Yakinton 46 application

// Configuration for photo carousel
const photoConfig = {
  photos: [
    "images/pic1.jpeg",
    "images/pic2.jpeg",
    "images/pic3.jpeg",
    "images/pic4.jpeg",
    "images/pic5.jpeg"
  ],
  interval: 1000//15000 // Change photo every 15 seconds
};

// Variables to track the carousel state
let currentPhotoIndex = 0;
let photoInterval = null;

// Initialize the photo carousel
function initPhotoCarousel() {
  // Set the initial image
  const photoElement = document.getElementById('photoElement');
  if (!photoElement) {
    console.error('Photo element not found!');
    return;
  }
  
  // Make sure at least one photo exists
  if (photoConfig.photos.length === 0) {
    console.error('No photos configured!');
    return;
  }
  
  // Set initial photo
  photoElement.src = photoConfig.photos[0];
  
  // If only one photo, don't set up rotation
  if (photoConfig.photos.length <= 1) {
    return;
  }
  
  // Set up rotation interval
  photoInterval = setInterval(rotatePhotos, photoConfig.interval);
}

// Rotate to the next photo
function rotatePhotos() {
  const photoElement = document.getElementById('photoElement');
  if (!photoElement) return;
  
  // Calculate next index
  currentPhotoIndex = (currentPhotoIndex + 1) % photoConfig.photos.length;
  
  // Apply fade-out effect
  photoElement.style.opacity = 0;
  
  // After fade out, change the source and fade back in
  setTimeout(() => {
    photoElement.src = photoConfig.photos[currentPhotoIndex];
    photoElement.style.opacity = 1;
  }, 500); // Half second for fade-out
}

// Function to preload images for smoother transitions
function preloadImages() {
  photoConfig.photos.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Preload images when the script loads
preloadImages();
