import inquirer from 'inquirer';
import colors from 'colors';




export const inquirerMenu = async() => {
    //console.clear();
    console.log('===========================');
    console.log('   Seleccione una opción');
    console.log('===========================\n');
    const opt = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: '¿Qué desea hacer?\n',
            choices: [{
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '7',
                name: `${'7.'.green} Borrar todas las tarea(s)`
            },
            {
                value: '8',
                name: `${'8.'.green} Editar tarea \n`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir \n`
            }
        ]
        }
    ]);
    console.log();
    return opt.option;
}

export const pausa = async () => {
    console.log('\n');
    const stop = await inquirer.prompt([
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]);
    return stop;
}


export const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}


export const deleteList = async ( tareas ) => {
    console.log();
    let counter = 0;
    const choices = tareas.map(tarea => {
        counter++;
        return {
            value: tarea.id,
            name: `${counter}. ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Cancelar'
    });
    
    const option = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]);
    return option.id;
}

export const confirm = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

export const multipleSelection = async ( tareas ) => {
    console.log();
    let counter = 0;
    const choices = tareas.map(tarea => {
        counter++;
        return {
            value: tarea.id,
            name: `${counter}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    
    const option = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]);
    return option.ids;
}


