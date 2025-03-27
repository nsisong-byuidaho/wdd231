document.addEventListener("DOMContentLoaded", async () => {
    const currentTemp = document.querySelector("#current-temp");
    const weatherIcon = document.querySelector("#weather-icon");
    const captionDesc = document.querySelector("#weather-desc");
    const windspeed = document.querySelector("#windspeed");
    const forecastContainer = document.getElementById("forecast");

    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=4.6412&lon=7.9209&units=metric&appid=a32df498498c55f671c773e36d83b3da";
    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=4.6412&lon=7.9209&units=metric&appid=a32df498498c55f671c773e36d83b3da";

    try {
        console.log("Fetching weather data...");
        const weatherResponse = await fetch(weatherURL);
        if (!weatherResponse.ok) throw new Error("Weather API failed");
        const weatherData = await weatherResponse.json();
        console.log("Weather Data:", weatherData);

        // Extract weather details
        const temperature = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].description;
        const windSpeedValue = weatherData.wind.speed;
        const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

        currentTemp.textContent = `${temperature}°C`;
        captionDesc.textContent = description;
        windspeed.textContent = `${windSpeedValue} m/s`;

        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        // Fetch Forecast Data
        console.log("Fetching forecast data...");
        const forecastResponse = await fetch(forecastURL);
        if (!forecastResponse.ok) throw new Error("Forecast API failed");
        const forecastData = await forecastResponse.json();
        console.log("Forecast Data:", forecastData);

        // Process forecast data
        let dailyForecasts = {};
        forecastData.list.forEach((item) => {
            const date = item.dt_txt.split(" ")[0];
            if (!dailyForecasts[date] && item.dt_txt.includes("12:00:00")) {
                dailyForecasts[date] = item;
            }
        });

        // Clear previous forecast
        forecastContainer.innerHTML = "";

        // Display next 3 days
        let index = 0;
        for (let date in dailyForecasts) {
            if (index < 3) {
                const temp = Math.round(dailyForecasts[date].main.temp);
                const icon = `https://openweathermap.org/img/wn/${dailyForecasts[date].weather[0].icon}.png`;

                // Create forecast card
                const forecastCard = document.createElement("div");
                forecastCard.classList.add("forecast-card");
                forecastCard.innerHTML = `
                    <p><strong>${date}</strong></p>
                    <p>${temp}°C</p>
                    <img src="${icon}" alt="Weather icon" width="50px">
                `;
                forecastContainer.appendChild(forecastCard);
                index++;
            }
        }

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
});
