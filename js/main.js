// main.js - Core functionality for Yakinton 46 application

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Start the clock
  initClock();
  
  // Load all data sources
  loadAllData();
  
  // Set up periodic refresh for dynamic data
  setupRefreshTimers();
});

// Initialize the clock/calendar
function initClock() {
  updateTimeAndDate();
  setInterval(updateTimeAndDate, 1000);
}

// Update the time and date display
function updateTimeAndDate() {
  const now = new Date();
  
  // Format date as DD.MM.YYYY
  let day = String(now.getDate()).padStart(2, '0');
  let month = String(now.getMonth() + 1).padStart(2, '0');
  let year = now.getFullYear();
  
  // Format time as HH:MM:SS
  let hours = String(now.getHours()).padStart(2, '0');
  let mins = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Put it all together
  const formattedDateTime = `${day}.${month}.${year}<BR>${hours}:${mins}:${seconds}`;
  
  // Display it in the box
  document.getElementById('timeDateBox').innerHTML = formattedDateTime;
}

// Load all data sources initially
function loadAllData() {
  // These functions are defined in their respective JS files
  fetchWeather();
  fetchNewsBreaks();
  fetchMessagesFromGoogleSheet();
  fetchTodoListFromGoogleSheet();
  initPhotoCarousel();
}

// Set up timers for periodic refresh of data
function setupRefreshTimers() {
  // Refresh weather every 30 minutes
  setInterval(fetchWeather, 30 * 60 * 1000);
  
  // Refresh news every 15 minutes
  setInterval(fetchNewsBreaks, 15 * 60 * 1000);
  
  // Refresh messages and todo lists every 5 minutes
  setInterval(fetchMessagesFromGoogleSheet, 5 * 60 * 1000);
  //setInterval(fetchTodoListFromGoogleSheet, 5 * 60 * 1000);
}

// Helper function to show error states
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.innerHTML = message || 'An error occurred';
  element.classList.add('error-state');
  
  // Log to console for debugging
  console.error(`Error in ${elementId}: ${message}`);
}

// Refresh the page every 30 minutes (adjust as needed)
setTimeout(() => {
  location.reload();
}, 1 * 60 * 1000);  // 1 minutes in milliseconds
