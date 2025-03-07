// weather.js - Weather functionality for Yakinton 46 application

// Configuration for weather
const weatherConfig = {
  city: 'Haifa', // Default city
  units: 'metric', // metric for Celsius
  lang: 'he' // Hebrew language
};

// Fetch weather data from OpenWeatherMap API
function fetchWeather() {
  // In production, this API key should be handled server-side to prevent exposure
  const apiKey = '86f54368cbb0bca4035b2fada47d3dd1';
  const city = weatherConfig.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${weatherConfig.units}&lang=${weatherConfig.lang}`;
  
  // Show loading state
  document.getElementById('weatherBox').innerHTML = '<div class="loading-indicator">Loading weather...</div>';
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Weather API responded with status ${response.status}`);
      }
      return response.json();
    })
    .then(weatherData => {
      // Extract and format weather data
      const temp = Math.round(weatherData.main.temp); // Round to nearest integer
      const condition = weatherData.weather[0].description;
      
      // Update the weather display
      document.getElementById('weatherBox').innerHTML = `${condition}<br>${temp}°C`;
    })
    .catch(err => {
      console.error('Weather fetch error:', err);
      showError('weatherBox', 'Weather data unavailable');
    });
}
