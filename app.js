import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { deleteList, inquirerMenu, leerInput, pausa, confirm, multipleSelection } from './helpers/inquirer.js';
//const { mostrarMenu, pausa } = require('./helpers/mensajes');
import {Tareas} from './models/tareas.js';
const main = async() => {
    let opt = "";
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if ( tareasDB !== null ) {
        tareas.loadData(tareasDB);
    }
    
    do {
        opt = await inquirerMenu();
        switch( opt ) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listStatus();
                break;
            case '3':
                tareas.list(true);
                break;
            case '4':
                tareas.list(false);
                break;
            case '5':
                const ids = await multipleSelection(tareas.listadoArr);
                tareas.toggleCheck(ids);
                break;
            case '6':
                const id = await deleteList(tareas.listadoArr);
                if ( id != '0' ) {
                    const ok = await confirm('¿Está seguro?');
                    if ( ok ) {
                        tareas.delete(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while ( opt !== '0' )
    console.clear();
}
main();
