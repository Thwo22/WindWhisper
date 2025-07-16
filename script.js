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
const weatherContainer = document.querySelector("#weather-data")

//funcoes

const getWeatherData = async (city) => {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();

    return data
};

//abaixo, estão todas os campos que serão preenchidos pelas informações trazidas pela API.
const showWeatherData = async (city) => {
    
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;

    tempElement.innerText = parseInt(data.main.temp);

    descElement.innerText = data.weather[0].description;

    weatherIConElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    umidityElement.innerText = `${data.main.humidity}%`;

    windElement.innerText = `${data.wind.speed}km/h`;

    const countryCode = data.sys.country.toLowerCase();
    countryImgElement.setAttribute("src", `https://flagcdn.com/16x12/${countryCode}.png`);
    
    weatherContainer.classList.remove("hide");
};

//eventos
    //Função do Botão que pesquisa a cidade
    searchBtn.addEventListener("click", (e) => {

    e.preventDefault()

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city);
    }
});

