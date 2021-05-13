const { readInput, listCities } = require('../helpers/inquirer');
const Searches = require('../models/searches');

const searches = new Searches();

const getCityAndWeatherCase1 = async () => {
    // Input
    const city = await readInput('City: ');

    // Search the cities
    const cities = await searches.cities(city);

    // Select the city
    const id = await listCities(cities);
    const selectedCity = cities.find(c => c.id === id);

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
    console.log('Description: ', desc);
}

module.exports = { getCityAndWeatherCase1 }

