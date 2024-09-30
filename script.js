const apiKey = "f3feba0010a4a2050349a3cf2fc999e2"; // Replace with your actual API key
const weatherInfo = document.getElementById("weather-info");
const locationInput = document.getElementById("location-input");
const searchBtn = document.getElementById("search-btn");

function getWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherInfo(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfo.textContent = "Error fetching weather data. Please try again.";
        });
}

function displayWeatherInfo(data) {
    const location = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherInfo.innerHTML = `
        <p>Location: ${location}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

searchBtn.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
        getWeatherData(location);
    } else {
        alert("Please enter a location.");
    }
});

// Get user's current location
navigator.geolocation.getCurrentPosition(
    position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayWeatherInfo(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherInfo.textContent = "Error fetching weather data. Please try again.";
            });
    },
    error => {
        console.error("Error getting user's location:", error);
        weatherInfo.textContent = "Error getting user's location. Please enter a location manually.";
    }
);