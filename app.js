let valueSearch = document.getElementById("searchInput");
let cityName = document.getElementById("cityName");
let temp = document.getElementById("temp");
let desc = document.getElementById("desc");
let humidity = document.getElementById("humidity");

let weatherIcon = document.getElementById("weatherIcon");
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = valueSearch.value.trim();
    if (!city) return;
    getWeatherData(city);
});

const apiKey = "bd12bc9b154f474fb2a71623253011";
const getWeatherData = (city) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
            cityName.textContent = data.location.name || "";
            temp.innerHTML = Math.round(data.current.temp_c) + "&deg;C";
            desc.textContent = data.current.condition.text || "";
            humidity.textContent =  data.current.humidity + "%";
            weatherIcon.src = data.current.condition.icon;
        })
        .catch(err => {
            cityName.textContent = "Not found";
            temp.textContent = "";
            desc.textContent = "";
            humidity.textContent = "";
            weatherIcon.src = "";
        });
};