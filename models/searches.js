const axios = require('axios');

class Searches {
    history = [''];

    constructor() {
        //TODO: will read database if it exists
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_TOKEN,
            'cachebuster': 1620936728814,
            'autocomplete': true,
            'language': 'en',
            'limit': 5
        }
    }

    async cities(city = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsMapBox

            });

            const res = await instance.get();

            return res.data.features.map(city => ({
                id: city.id,
                name: city.place_name,
                lng: city.center[0],
                lat: city.center[1]
            }));
        } catch (error) {
            return [];
        }
    }
    
    get paramsOpenWeather() {
        return {
            appid: process.env.OPEN_WEATHER_TOKEN,
            units: 'metric',
            lang: 'en'
        }
    }

    async weather(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const res = await instance.get();
            const { weather, main } = res.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Searches;