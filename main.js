let currentCity = "Caracas";
let units = "metric";

let city = document.querySelector(".city-name");
let dateTime = document.querySelector(".datetime"); 
let forecast = document.querySelector(".forecast");
let temperature = document.querySelector(".temperature");
let weatherIcon = document.querySelector(".weather-icon");
let minMax = document.querySelector(".temperature-minmax");
let realFeel = document.querySelector(".real-feel");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");

document.querySelector(".searchbox").addEventListener('submit', e => {
    let search = document.querySelector(".search-for");
    // prevent default action
    e.preventDefault();
    // change current city
    currentCity = search.value;
    // get weather forecast 
    getWeather();
    // clear form
    search.value = ""
})

// units
document.querySelector(".unit-celsius").addEventListener('click', () => {
    if(units !== "metric"){
        // change to metric
        units = "metric"
        // get weather forecast 
        getWeather()
    }
})

document.querySelector(".unit-farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        // change to imperial
        units = "imperial"
        // get weather forecast 
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone / 3600; // convert seconds to hours 

   const date = new Date(timestamp * 1000);
   
   const options = {
       weekday: "long",
       day: "numeric",
       month: "long",
       year: "numeric",
       hour: "numeric",
       minute: "numeric",
       timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
       hour12: true,
   }
   return date.toLocaleString("en-US", options)
  
}

function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY = 'aead1c600343c8aeab9d5f9f7817e759'
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
    console.log(data)
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone);
    forecast.innerHTML = `<p>${data.weather[0].main}`
    temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weatherIcon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    minMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
    realFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    humidity.innerHTML = `${data.main.humidity}%`
    wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}`
    pressure.innerHTML = `${data.main.pressure} hPa`
})
}
document.body.addEventListener('load', getWeather())