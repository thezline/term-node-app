const inquirer = require('inquirer');
require('colors');

const options = [
    {
        type: 'list',
        name: 'option',
        message: 'Specify the action.',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} City`
            },
            /*{
                value: 2,
                name: `${'2.'.green} History`
            },*/
            {
                value: 0,
                name: `${'0.'.green} ${'Close'.red}`
            }
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('============================='.green);
    console.log('      Select an option'.white);
    console.log('============================='.green);

    const { option } = await inquirer.prompt(options);

    return option;
}

const stop = async () => {
    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'enter'.green} to continue...`
    }]

    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return '';
            }

            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    
    return desc;
}

const listCities = async (cities = []) => {
    const choices = cities.map((city, index) => {
        const idx = `${index + 1}.`.green;

        return {
            value: city.id,
            name: `${idx} ${city.name}`
        }
    });

    const quest = [
        {
            type: 'list',
            name: 'id',
            message: 'Select the city: ',
            choices
        }
    ]

    const { id } = await inquirer.prompt(quest);
    return id;
}

module.exports = {
    readInput,
    inquirerMenu,
    stop,
    listCities
}