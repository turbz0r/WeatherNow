import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.0/+esm';

window.addEventListener('DOMContentLoaded', () => {
    //main request -> panel creation functionality

    async function getWeather(cityName) {
        let response;
        try {
            response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b209f82168a79c7d26725e6d0de7010b`
            );
            return response;
        } catch (error) {
            throw new Error(`Error ocurred.\n Could not fetch data.\n Status: ${response.status}`);
        }
    }

    //     itemName(response.data.name),
    //     itemTemperature(response.data.main.temp),
    //     itemHumidity(response.data.main.humidity),
    //     itemPressure(reposnse.data.main.pressure),
    //     itemWeatherDescription(response.data.weather[0].description),
    //     itemIcon(response.data.weather[0].icon),
    //     itemWind(response.data.wind.speed);

    class WeatherCard {
        constructor(itemName, itemTemperature, itemIcon, itemDescription, itemHumidity, itemPressure, itemWind) {
            this.itemName = itemName;
            this.itemTemperature = itemTemperature;
            this.itemIcon = itemIcon;
            this.itemDescription = itemDescription;
            this.itemHumidity = itemHumidity;
            this.itemPressure = itemPressure;
            this.itemWind = itemWind;
        }

        appendCard() {
            const card = document.createElement('div');
            card.classList.add('weather-panel');
            card.innerHTML = `<div class="weather-panel__wrapper">
            <div class="weather-panel__city">${this.itemName}</div>
            <div class="separator"></div>
            <div class="weather-panel__temp">
                <h1>${(+this.itemTemperature - 272.15).toFixed()}&#176;</h1>
                <img src="https://openweathermap.org/img/wn/${this.itemIcon}.png" alt="" />
            </div>
            <div class="weather-panel__description">${this.itemDescription}</div>
            <div class="separator"></div>
            <div class="weather-panel__info">
                <div>
                    Humidity:<span> ${this.itemHumidity}</span> %
                </div>
                <div>
                    Pressure:<span> ${this.itemPressure}</span> hPa
                </div>
                <div>
                    Wind speed:<span> ${this.itemWind}</span> m/s
                </div>
            </div>
        </div>`;
            weatherOutput.append(card);
        }
    }

    //searchInput form

    const searchForm = document.querySelector('.search-input'),
        searchInput = searchForm.querySelector('.search-input > input'),
        searchBtn = searchForm.querySelector('.search-input > button');

    function fixedSearchValue(item) {
        const string = item.toLowerCase();

        return `${string[0].toUpperCase()}${string.slice(1)}`;
    }

    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (searchInput.value.length < 2) {
            return false;
        }

        getWeather(fixedSearchValue(searchInput.value)).then((response) => {
            new WeatherCard(
                response.data.name,
                response.data.main.temp,
                response.data.weather[0].icon,
                response.data.weather[0].description,
                response.data.main.humidity,
                response.data.main.pressure,
                response.data.wind.speed
            ).appendCard();
        });
    });

    //weather output (buttons and output field itself)

    const weatherButtons = document.querySelectorAll('.weather-button'),
        weatherOutput = document.querySelector('.weather-output'),
        weatherWrapper = document.querySelector('.weather-output__wrapper');

    function buttonsReset() {
        weatherButtons.forEach((item) => {
            if (item.classList.contains('button-active')) {
                item.classList.remove('button-active');
            }
        });
    }

    weatherWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('weather-button')) {
            buttonsReset();
            event.target.classList.add('button-active');
        }
    });
});
