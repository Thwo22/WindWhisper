//variáveis e seleção de elementos
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIConElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const countryImgElement = document.querySelector("h2 img");

//funcoes

const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_KEY}&lang=pt_br`

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();

    return data
};

const showWeatherData = async (city) => {
    
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;

    tempElement.innerText = parseInt(data.main.temp);

    descElement.innerText = data.weather[0].description;

    weatherIConElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}.png`);

    umidityElement.innerText = `${data.main.humidity}%`;

    windElement.innerText = `${data.wind.speed}km/h`;
    
    console.log(data);
};

//eventos
    //Função do Botão que pesquisa a cidade
    searchBtn.addEventListener("click", (e) => {

    e.preventDefault()

    const city = cityInput.value;

    showWeatherData(city);
});

