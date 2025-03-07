// Playlist configuration
const playlist = [
    "audio/music_1.mp3",
    "audio/music_2.mp3"
  ];
  
  let currentTrackIndex = 0;
  const mediaElement = document.getElementById("radioPlayer");
  
  // Function to play the next track
  function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Loop through playlist
    mediaElement.src = playlist[currentTrackIndex]; // Load next track
    mediaElement.play().catch(error => console.warn("Autoplay blocked:", error));
  }
  
  // Load the first track and play it
  function initPlaylist() {
    if (playlist.length > 0) {
      mediaElement.src = playlist[0]; // Set first song
      mediaElement.play().catch(error => console.warn("Autoplay blocked:", error));
    }
  }
  
  // Event listener for when a song ends
  mediaElement.addEventListener("ended", playNextTrack);
  
  // Start the playlist after the user interacts with the page
  document.addEventListener("click", () => {
    initPlaylist();
  }, { once: true }); // Ensures it runs only once
  
  function playAudio() {
    const audio = document.getElementById("radioPlayer");
    audio.play();
}

function pauseAudio() {
    const audio = document.getElementById("radioPlayer");
    audio.pause();
}

document.addEventListener("DOMContentLoaded", function() {
  displayMediaFileName();
});

function displayMediaFileName() {
  const audio = document.getElementById("radioPlayer");
  const fileNameElement = document.getElementById("mediaFileName");

  // Extract file name from the src attribute
  let filePath = audio.src;
  let fileName = filePath.substring(filePath.lastIndexOf("/") + 1); // Get only the file name

  fileNameElement.textContent = fileName; // Set the file name in the span
}