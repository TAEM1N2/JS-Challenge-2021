const API_KEY = "cd5f51d0a3394969ca53f7048e95ce8e";

function onGeoOk(position){
    const lat = position.coords.latitude; 
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;

    });
}
function onGeoError(){
    alert("Can't find you. No weather fot you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);