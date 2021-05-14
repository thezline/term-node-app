const { readInput, listCities } = require('../helpers/inquirer');
const Searches = require('../models/searches');

const searches = new Searches();

const getCityAndWeather = async () => {
    // Input
    const city = await readInput('City: ');

    // Search the cities
    const cities = await searches.cities(city);

    // Select the city
    const id = await listCities(cities);
    const selectedCity = cities.find(c => c.id === id);

    // Save the city in the object in searches (or in DB)
    searches.setHistory(selectedCity.name);

    // Weather result
    const weather = await searches.weather(selectedCity.lat, selectedCity.lng);
    const { min, max, desc, temp } = weather;   

    // Output
    console.clear();
    console.log('\n------ Result: -----\n'.bold.green);
    console.log('City: ', selectedCity.name);
    console.log('Lat: ', selectedCity.lat);
    console.log('Lng: ', selectedCity.lng);
    console.log('Temp: ', temp);
    console.log('Max: ', max);
    console.log('Min: ', min);
    console.log('Description:', desc);
}

const getHistoryOfCities = () => {
    searches.historyCap.forEach((city, index) => {
        const idx = `${index + 1}.`.green;
        console.log(`${idx} ${city}`);
    }); 
}

module.exports = { getCityAndWeather, getHistoryOfCities }

