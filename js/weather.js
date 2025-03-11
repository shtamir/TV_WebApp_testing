// weather.js - Weather functionality for Yakinton 46 application using AccuWeather

// weather.js - Loads the WeatherWidget.io script

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
})(document, 'script', 'weatherwidget-io-js');


/*  
// weather.js - Fetching 3-Day Forecast from AccuWeather API



// Configuration for AccuWeather API
const accuweatherConfig = {
    apiKey: "aWDQcxJwFX5sPZOtkyWdc5c3n7drkBL9",  // Replace with your AccuWeather API key
    locationKey: "213181",  // Haifa's AccuWeather location key
    hours: 12,  // Get the next 12-hour forecast
    lang: "he", // Hebrew language
    days: 3     // Fetch 3 days only
  };
function fetchWeather() {
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/${accuweatherConfig.days}day/${accuweatherConfig.locationKey}?apikey=${accuweatherConfig.apiKey}&language=${accuweatherConfig.lang}&metric=true`;
  
    document.getElementById("weatherBox").innerHTML = '<div class="loading-indicator">Loading weather...</div>';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let forecastHTML = "<strong>Next 3 Days Forecast:</strong><br>";
  
        data.DailyForecasts.forEach(day => {
          let date = new Date(day.Date).toLocaleDateString("he-IL", { weekday: "long" });
          let minTemp = day.Temperature.Minimum.Value;
          let maxTemp = day.Temperature.Maximum.Value;
          let condition = day.Day.IconPhrase;
  
          forecastHTML += `${date}: ${minTemp}°C - ${maxTemp}°C, ${condition}<br>`;
        });
  
        document.getElementById("weatherBox").innerHTML = forecastHTML;
      })
      .catch(err => {
        console.error("Weather fetch error:", err);
        document.getElementById("weatherBox").innerHTML = "Weather data unavailable";
      });
  }
  
  // Run fetchWeather when the page loads
  document.addEventListener("DOMContentLoaded", fetchWeather);
    */


