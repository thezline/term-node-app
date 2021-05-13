const { inquirerMenu, stop } = require('./helpers/inquirer');
const { getCityAndWeatherCase1 } = require('./controllers/city');
require('dotenv').config();

const main = async () => {
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                await getCityAndWeatherCase1();
                break;
        }

        if (opt !== 0) await stop();
    } while (opt !== 0);
}

main();