const { inquirerMenu, stop } = require('./helpers/inquirer');
const { getCityAndWeather, getHistoryOfCities } = require('./controllers/city');
require('dotenv').config();

const main = async () => {
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                await getCityAndWeather();
                break;

            case 2:
                getHistoryOfCities();
                break;
        }

        if (opt !== 0) await stop();
    } while (opt !== 0);
}

main();