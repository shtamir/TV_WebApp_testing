// Playlist configuration
const playlist = [
    "audio/music_1.mp3",
    "audio/music_2.mp3"
  ];
  
let currentTrackIndex = 0;
const mediaElement = document.getElementById("radioPlayer");
const fileNameElement = document.getElementById("mediaFileName");

// Function to play the current track and update UI
function loadTrack(index) {
  if (index < 0) {
      index = playlist.length - 1; // Loop to last song if at the beginning
  } else if (index >= playlist.length) {
      index = 0; // Loop to first song if at the end
  }

  currentTrackIndex = index;
  mediaElement.src = playlist[currentTrackIndex];
  mediaElement.play().catch(error => console.warn("Autoplay blocked:", error));

  // Update file name display
  displayMediaFileName();
}

// Function to play next track
function playNextTrack() {
  loadTrack(currentTrackIndex + 1);
}

// Function to play previous track
function playPreviousTrack() {
  loadTrack(currentTrackIndex - 1);
}

// Load the first track and play it
function initPlaylist() {
  if (playlist.length > 0) {
    loadTrack(0);
    mediaElement.src = playlist[0]; // Set first song
    mediaElement.play().catch(error => console.warn("Autoplay blocked:", error));
  }
}
  
// Event listener for when a song ends
mediaElement.addEventListener("ended", playNextTrack);

// Play and Pause Functions
function playAudio() {
  mediaElement.play();
}

function pauseAudio() {
  mediaElement.pause();
}

document.addEventListener("DOMContentLoaded", function() {
  displayMediaFileName();
  initPlaylist();
});

// Display the media file name
function displayMediaFileName() {
  const audio = document.getElementById("radioPlayer");
  const fileNameElement = document.getElementById("mediaFileName");

  // Extract file name from the src attribute
  let filePath = audio.src;
  let fileName = filePath.substring(filePath.lastIndexOf("/") + 1); // Get only the file name

  fileNameElement.textContent = fileName; // Set the file name in the span
}

// Start the playlist after the user interacts with the page
document.addEventListener("click", () => {
  initPlaylist();
}, { once: true }); // Ensures it runs only once

// End of radio-player.js