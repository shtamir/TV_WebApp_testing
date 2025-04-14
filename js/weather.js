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

