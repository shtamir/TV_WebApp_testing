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
  const dateElement = document.getElementById('date');
  const timeElement = document.getElementById('time');

  const now = new Date();
  /*
  // Format date as DD.MM.YYYY
  let day = String(now.getDate()).padStart(2, '0');
  let month = String(now.getMonth() + 1).padStart(2, '0');
  let year = now.getFullYear();
  
  // Format time as HH:MM:SS
  let hours = String(now.getHours()).padStart(2, '0');
  let mins = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Put it all together
  //const formattedDateTime = `${day}.${month}.${year}<BR>${hours}:${mins}:${seconds}`;
  */

  // Display it in the box
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('he-IL', options);
  const timeString = now.toLocaleTimeString('he-IL');
  dateElement.innerHTML = dateString;
  timeElement.innerHTML = timeString;
  
  //document.getElementById('timeDateBox').innerHTML = formattedDateTime;
}

// Load all data sources initially
function loadAllData() {
  // These functions are defined in their respective JS files
  //fetchWeather();
  fetchNewsBreaks();
  fetchMessagesFromGoogleSheet();
  fetchTodoListFromGoogleSheet();
  initPhotoCarousel();
}

// Set up timers for periodic refresh of data
function setupRefreshTimers() {
  // Refresh weather every 30 minutes
  //setInterval(fetchWeather, 30 * 60 * 1000);
  
  // Refresh news every 15 minutes
  setInterval(fetchNewsBreaks, 15 * 60 * 1000);
  
  // Refresh messages and todo lists every 5 minutes
  setInterval(fetchMessagesFromGoogleSheet, 5 * 60 * 1000);
  //setInterval(fetchTodoListFromGoogleSheet, 5 * 60 * 1000);

  // Refresh photo carousel every 10 minutes
  setInterval(initPhotoCarousel, 10 * 60 * 1000); // Refresh every 10 minutes

  // Check for refresh every 60 seconds (adjust as needed)
  setInterval(checkForRemoteRefresh, 60000);
}

// Helper function to show error states
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.innerHTML = message || 'An error occurred';
  element.classList.add('error-state');
  
  // Log to console for debugging
  console.error(`Error in ${elementId}: ${message}`);
}

// Refresh the page every 60 minutes (adjust as needed)
setTimeout(() => {
  location.reload();
}, 60 * 60 * 1000);  // 1 hour in milliseconds


function checkForRemoteRefresh() {
  fetch("refresh_trigger.txt") // URL of your remote refresh trigger
      .then(response => response.text())
      .then(data => {
          if (data.trim() === "refresh") {
              console.log("Remote refresh triggered!");
              location.reload(); // Reload the page
          }
          else {
            console.log(`No refresh triggered..`);
          }
      })
      .catch(error => console.error("Error checking refresh status:", error));
}
/*
function updateResolution() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  document.getElementById('resolutionBox').innerHTML = `Resolution: ${width} x ${height}`;
}


// Update resolution on load and when window resizes
document.addEventListener('DOMContentLoaded', updateResolution);*/
//
// Compare this snippet from js/data-sync.js:
window.addEventListener('resize', updateResolution);