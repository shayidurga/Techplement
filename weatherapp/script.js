document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('search');
    const cityElement = document.getElementById('city');
    const tempElement = document.getElementById('temp');
    const conditionElement = document.getElementById('condition');
    const windSpeedElement = document.getElementById('wind-speed');
    const humidityElement = document.getElementById('humidity');
    const weatherIconElement = document.getElementById('weather-icon');

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const city = searchInput.value;
            fetchWeatherData(city);
        }
    });

    async function fetchWeatherData(city) {
        const apiKey = 'f381842597b518fd56bdd46dec883b41';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            const weatherData = {
                city: data.name,
                temp: `${Math.round(data.main.temp)}°C`,
                condition: data.weather[0].main,
                windSpeed: `${data.wind.speed} km/h`,
                humidity: `${data.main.humidity}%`,
                icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            };

            updateWeatherUI(weatherData);
        } catch (error) {
            alert(error.message);
        }
    }

    function updateWeatherUI(data) {
        cityElement.textContent = data.city;
        tempElement.textContent = data.temp;
        conditionElement.textContent = data.condition;
        windSpeedElement.textContent = data.windSpeed;
        humidityElement.textContent = data.humidity;
        weatherIconElement.src = data.icon;
    }
});
