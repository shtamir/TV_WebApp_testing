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
  