const apiKey = "4a7f691694b715f01243a71d17cb635e"; // 🔹 replace with your real key later
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weatherResult = document.getElementById("weather-result");

searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim();
  if (cityName) {
    getWeather(cityName);
  } else {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      weatherResult.innerHTML = `<p>City not found. Try again.</p>`;
      return;
    }

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
      <p><strong>${temp}°C</strong></p>
      <p>${desc}</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}
