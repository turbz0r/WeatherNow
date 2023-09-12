import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.0/+esm';
window.addEventListener('DOMContentLoaded', () => {
    async function getWeather() {
        try {
            const response = await axios.get(
                'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b209f82168a79c7d26725e6d0de7010b'
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    getWeather();
});
