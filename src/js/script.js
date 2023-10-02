import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.0/+esm';
import { key } from '../js/API-key.js';

window.addEventListener('DOMContentLoaded', () => {
    //main request -> panel creation functionality

    async function getWeather(cityName) {
        let response;
        try {
            response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`);
            return response;
        } catch (error) {
            throw new Error(`Error ocurred.\n Could not fetch data.\n Status: ${error.response.status}`);
        }
    }

    //     itemName(response.data.name),
    //     itemTemperature(response.data.main.temp),
    //     itemHumidity(response.data.main.humidity),
    //     itemPressure(reposnse.data.main.pressure),
    //     itemWeatherDescription(response.data.weather[0].description),
    //     itemIcon(response.data.weather[0].icon),
    //     itemWind(response.data.wind.speed);

    async function getFiveDayWeather(cityName) {
        let response;
        try {
            response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`);
            return response;
        } catch (error) {
            throw new Error(`Error ocurred.\n Could not fetch data.\n Status: ${error.response.status}`);
        }
    }

    //output cards creation out of resolved data
    class WeatherCard {
        constructor(
            itemName,
            itemTemperature,
            itemIcon,
            itemDescription,
            itemHumidity,
            itemPressure,
            itemWind,
            itemDate
        ) {
            this.itemName = itemName;
            this.itemTemperature = itemTemperature;
            this.itemIcon = itemIcon;
            this.itemDescription = itemDescription;
            this.itemHumidity = itemHumidity;
            this.itemPressure = itemPressure;
            this.itemWind = itemWind;
            this.itemDate = itemDate;
        }

        appendCard(container) {
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
            container.append(card);
        }

        appendFiveDayCards(container) {
            const card = document.createElement('div');
            card.classList.add('weather-panel');
            card.innerHTML = `<div class="weather-panel__wrapper">
            <div class="weather-panel__date">${this.itemDate}</div>
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

            container.append(card);
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

    window.addEventListener('click', (event) => {
        if (event.target === searchInput) {
            searchForm.style.border = '1px solid #22a39f';
        } else {
            searchForm.style.border = '1px solid transparent';
        }
    });

    //weather output (buttons and output field itself)

    const weatherButtons = document.querySelectorAll('.weather-button'),
        weatherButtonsWrapper = document.querySelector('.weather-buttons__wrapper'),
        weatherOutput = document.querySelector('.weather-output'),
        weatherContainers = document.querySelectorAll('.weather-panels'),
        weatherWrapper = document.querySelector('.weather-output__wrapper'),
        errorInput = document.querySelector('.input-error');

    function activeReset() {
        for (let i = 0; i < weatherButtons.length; i++) {
            if (weatherButtons[i].classList.contains('button-active')) {
                weatherButtons[i].classList.remove('button-active');
            }
            if (weatherContainers[i].classList.contains('panels-active')) {
                weatherContainers[i].classList.remove('panels-active');
            }
        }
    }

    function filterList(arr) {
        return arr.filter((item) => {
            let result = item.dt_txt.split(' ');
            if (result[1] === '15:00:00') {
                return item;
            }
        });
        // return arr.filter((element, index) => index % 8 === 7);
    }

    weatherButtonsWrapper.addEventListener('click', (event) => {
        activeReset();
        if (event.target.id === 'btn-fivedays') {
            event.target.classList.add('button-active');
            weatherContainers[1].classList.add('panels-active');
        } else {
            event.target.classList.add('button-active');
            weatherContainers[0].classList.add('panels-active');
        }
    });

    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        errorInput.style.display = 'none';

        if (searchInput.value.length < 1 || searchInput.value.trim().length === 0) {
            return false;
        }

        if (weatherOutput.dataset.activePlace === searchInput.value.toLowerCase()) {
            return false;
        }

        weatherContainers[0].innerHTML = '';
        weatherContainers[1].innerHTML = '';
        weatherContainers[1].dataset.fetched = 'false';

        activeReset();
        weatherContainers[0].classList.add('panels-active');
        weatherButtons[0].classList.add('button-active');

        getWeather(fixedSearchValue(searchInput.value))
            .then((response) => {
                if (!weatherWrapper.classList.contains('weather-acitve')) {
                    weatherWrapper.classList.add('weather-active');
                }

                weatherOutput.dataset.activePlace = response.data.name.toLowerCase();
                weatherContainers[1].dataset.fetched = 'false';

                new WeatherCard(
                    response.data.name,
                    response.data.main.temp,
                    response.data.weather[0].icon,
                    response.data.weather[0].description,
                    response.data.main.humidity,
                    response.data.main.pressure,
                    response.data.wind.speed
                ).appendCard(weatherContainers[0]);
            })
            .catch((err) => {
                if (err.toString().includes('404')) {
                    errorInput.style.display = 'block';
                    searchForm.style.border = '1px solid red';
                }
                console.error(err);
            });
    });

    weatherButtons[1].addEventListener('click', (event) => {
        if (weatherContainers[1].dataset.fetched === 'true') {
            return false;
        }

        getFiveDayWeather(fixedSearchValue(weatherOutput.dataset.activePlace))
            .then((response) => {
                weatherContainers[1].dataset.fetched = 'true';
                let result = filterList(response.data.list);

                result.forEach((item) => {
                    new WeatherCard(
                        response.data.city.name,
                        item.main.temp,
                        item.weather[0].icon,
                        item.weather[0].description,
                        item.main.humidity,
                        item.main.pressure,
                        item.wind.speed,
                        item.dt_txt.split(' ')[0]
                    ).appendFiveDayCards(weatherContainers[1]);
                });
            })
            .catch((err) => {
                console.error(err);
            });
    });
});
