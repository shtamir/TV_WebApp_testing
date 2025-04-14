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
    //console.log(`Clicked at X: ${event.clientX}, Y: ${event.clientY}`);
  });

  