const axios = require('axios');
const fs = require('fs');

class Searches {
    historyArray = [];
    path = './files/file.json';

    constructor() {
        this.readFile();
    }

    get historyCap() {
        return this.historyArray.map(city => {
            let words = city.split(' ');
            words = words.map(w => w[0].toUpperCase() + w.substring(1));

            return words.join(' ');
        });
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

    get paramsOpenWeather() {
        return {
            appid: process.env.OPEN_WEATHER_TOKEN,
            units: 'metric',
            lang: 'en'
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

    setHistory(city = '') {
        if(this.historyArray.includes(city.toLowerCase())) {
            return;
        }

        this.historyArray = this.historyArray.splice(0, 4)

        this.historyArray.unshift(city.toLowerCase());
        this.saveInFile();
    }

    saveInFile() {
        const payload = {
            historyArray: this.historyArray
        }

        fs.writeFileSync(this.path, JSON.stringify(payload));
    }

    readFile() {
        if(!fs.existsSync(this.path)) return;

        const info = fs.readFileSync(this.path, { encoding: 'utf8' });
        const data = JSON.parse(info)

        this.historyArray = data.historyArray;
        console.log(this.historyArray)
    }
}

module.exports = Searches;