import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.0/+esm';

window.addEventListener('DOMContentLoaded', () => {
    //main request -> panel creation functionality

    async function getWeather(cityName) {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b209f82168a79c7d26725e6d0de7010b`
            );
            console.log(response);
        } catch (error) {
            console.error(error);
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
                <h1>${this.itemTemperature}&#176;</h1>
                <img src="https://openweathermap.org/img/wn/${this.itemIcon}.png" alt="" />
            </div>
            <div class="weather-panel__description">${this.itemDescription}</div>
            <div class="separator"></div>
            <div class="weather-panel__info">
                <div>
                    Humidity:<span>${this.itemHumidity}%</span>
                </div>
                <div>
                    Pressure:<span>${this.itemPressure}hPa</span>
                </div>
                <div>
                    Wind speed:<span>${this.itemWind}m/s</span>
                </div>
            </div>
        </div>`;
        }
    }

    //searchInput form

    const searchForm = document.querySelector('.search-input'),
        searchInput = searchForm.querySelector('.search-input > input'),
        searchBtn = searchForm.querySelector('.search-input > button');

    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();
    });

    //weather output (buttons and output field itself)

    const weatherButtons = document.querySelectorAll('.weather-button'),
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
