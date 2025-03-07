function simulateClick(x, y) {
    let event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y
    });
  
    document.elementFromPoint(x, y)?.dispatchEvent(event);
  }
  
  // Example: Click at coordinates (100, 200)
  simulateClick(25, 677);

  document.addEventListener("click", function(event) {
    console.log(`Clicked at X: ${event.clientX}, Y: ${event.clientY}`);
  });

  /*
  // Ensure the carousel initializes when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      simulateClick(41, 675);
      simulateClick(41, 675);
      simulateClick(41, 675);
      simulateClick(41, 675);
      simulateClick(41, 675);
    }, 5000); // Wait 5000ms for elements to load
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const mediaElement = document.getElementById('radioPlayer'); // Change to your player ID
    if (mediaElement) {
      mediaElement.click();
      console.log("Simulated click on media player.");
    } else {
      console.warn("Media player not found.");
    }
  }, 6000);
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const mediaElement = document.getElementById('radioPlayer');
    if (mediaElement) {
      mediaElement.play().then(() => {
        console.log("Playback started!");
      }).catch(error => {
        console.warn("Autoplay blocked:", error);
      });
    }
  }, 7000);
});
document.addEventListener("click", () => {
  const mediaElement = document.getElementById("radioPlayer");
  if (mediaElement) {
    mediaElement.play().then(() => {
      console.log("Media started by user click.");
    }).catch(error => {
      console.warn("Play failed:", error);
    });
  }
}, { once: true }); // Runs only once*/
