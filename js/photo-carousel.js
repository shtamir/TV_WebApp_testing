// photo-carousel.js - Photo carousel functionality for Yakinton 46 application

// Configuration for photo carousel
const photoConfig = {
  photos: [
    "images/carousel/pic1.jpeg",
    "images/carousel/pic2.jpeg",
    "images/carousel/pic2.jpg",
    "images/carousel/pic3.gif",
    "images/carousel/pic3.jpeg",
    "images/carousel/pic4.gif",
    "images/carousel/pic4.jpeg",
    "images/carousel/pic5.jpeg"
  ],
  interval: 3000 // Change photo every 10 seconds
};

// Variables to track the carousel state
let currentPhotoIndex = 0;
let photoElement = null;

// Initialize the photo carousel
function initPhotoCarousel() {
  photoElement = document.getElementById('photoElement');

  if (!photoElement) {
    console.error('Photo element not found!');
    return;
  }

  // Make sure at least one photo exists
  if (photoConfig.photos.length === 0) {
    console.error('No photos configured!');
    return;
  }

  // Preload images
  preloadImages();

  // Set the initial photo
  photoElement.src = photoConfig.photos[currentPhotoIndex];

  // Start the rotation interval
  setInterval(rotatePhotos, photoConfig.interval);
}

// Rotate to the next photo with a fade effect
function rotatePhotos() {
  if (!photoElement) return;

  // Fade out effect
  photoElement.style.transition = "opacity 1s ease-in-out";
  photoElement.style.opacity = 0;

  setTimeout(() => {
    // Update index and change the image
    currentPhotoIndex = (currentPhotoIndex + 1) % photoConfig.photos.length;
    photoElement.src = photoConfig.photos[currentPhotoIndex];

    // Fade in effect
    photoElement.style.opacity = 1;
  }, 1000); // Wait 1 second for fade-out
}

// Preload images for smoother transitions
function preloadImages() {
  photoConfig.photos.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Ensure the carousel initializes when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initPhotoCarousel();
});
