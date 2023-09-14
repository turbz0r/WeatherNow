import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.0/+esm';

window.addEventListener('DOMContentLoaded', () => {
    // async function getWeather() {
    //     try {
    //         const response = await axios.get(
    //             'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b209f82168a79c7d26725e6d0de7010b'
    //         );
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async function getWeather() {
    //     try {
    //         const response = await axios.get(
    //             'https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=b209f82168a79c7d26725e6d0de7010b'
    //         );
    //         console.log(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // getWeather();

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
