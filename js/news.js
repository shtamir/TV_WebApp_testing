// news.js - News functionality for Yakinton 46 application

// Configuration for news feed
const newsConfig = {
  feedUrl: 'https://rss.walla.co.il/feed/22',
  maxItems: 20, // Maximum items to fetch
  displayItems: 3, // Number of items to display at once
  cycleIntervalMs: 10000 // Rotation interval (10 seconds)
};

// Global variables for news handling
let allNewsItems = [];
let currentIndex = 0;
let newsInterval = null;

// Fetch news from RSS feed
function fetchNewsBreaks() {
  
  console.log("Fetching news at", new Date().toLocaleTimeString());
  // Show loading state
  document.getElementById('newsContainer').innerHTML = '<div class="loading-indicator">Loading news...</div>';
  
  fetch(newsConfig.feedUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`News feed responded with status ${response.status}`);
      }
      return response.text();
    })
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      // Process RSS feed data
      const items = data.querySelectorAll("item");
      const topItems = Array.from(items).slice(0, newsConfig.maxItems);

      // Parse and format each news item
      allNewsItems = topItems.map(item => {
        const title = item.querySelector("title")?.textContent || "No title";
        const link = item.querySelector("link")?.textContent || "#";
        const description = item.querySelector("description")?.textContent || "-";
        const pubDateText = item.querySelector("pubDate")?.textContent;

        // Format the date
        let pubDateDisplay = "";
        if (pubDateText) {
          const dateObj = new Date(pubDateText);
          const hours = String(dateObj.getHours()).padStart(2, '0');
          const minutes = String(dateObj.getMinutes()).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          pubDateDisplay = `${day}/${month}, ${hours}:${minutes}`;
        }

        return {
          title: title,
          link: link,
          description: description,
          pubDate: pubDateDisplay
        };
      });

      // Reset and start the news cycling
      startCyclingNews();
    })
    .catch(error => {
      console.error("Error fetching RSS:", error);
      showError('newsContainer', 'News feed temporarily unavailable');
    });
}

// Start cycling through news items
function startCyclingNews() {
  // Clear any existing interval
  if (newsInterval) {
    clearInterval(newsInterval);
  }
  
  // Reset index
  currentIndex = 0;
  
  // Show first batch immediately
  renderNewsBatch();

  // Set up interval for cycling
  newsInterval = setInterval(() => {
    currentIndex = (currentIndex + newsConfig.displayItems) % allNewsItems.length;
    renderNewsBatch();
  }, newsConfig.cycleIntervalMs);
}

// Render a batch of news items
function renderNewsBatch() {
  // If no news items, show error
  if (allNewsItems.length === 0) {
    document.getElementById('newsContainer').innerHTML = '<div class="error-state">No news items available</div>';
    return;
  }

  // Get container and create list
  const container = document.getElementById("newsContainer");
  container.innerHTML = "";
  const ul = document.createElement("ul");
  ul.classList.add("horizontal-list");

  // Calculate how many items to show (handle case when fewer items than display count)
  const itemsToShow = Math.min(newsConfig.displayItems, allNewsItems.length);

  // Create and append list items
  for (let i = 0; i < itemsToShow; i++) {
    const itemIndex = (currentIndex + i) % allNewsItems.length;
    const newsItem = allNewsItems[itemIndex];
    const li = document.createElement("li");
    
    li.innerHTML = `
      <small class="date-span">${newsItem.pubDate}</small><br>
      <span class="title-span">${newsItem.title}</span><br>
      `;
    ul.appendChild(li);
    // <span class="desc-span">${newsItem.description}</span><br>
  }

  // Append to container
  container.appendChild(ul);
}
