import { saveDB, readDB } from './helpers/saveFile.js';
import { deleteList, inquirerMenu, input, pause, confirm, multipleSelection, editTasks } from './helpers/inquirer.js';
import {Tasks} from './models/tasks.js';
const main = async() => {
    let opt = "";
    const $tasks = new Tasks();
    const tasksDB = readDB();
    if ( tasksDB !== null ) {
        $tasks.loadData(tasksDB);
    }
    
    do {
        opt = await inquirerMenu();
        switch( opt ) {
            case '1':
                const desc = await input('Descripción: ');
                $tasks.createTask(desc);
                break;
            case '2':
                $tasks.listStatus();
                break;
            case '3':
                $tasks.list(true);
                break;
            case '4':
                $tasks.list(false);
                break;
            case '5':
                const ids = await multipleSelection($tasks.arrayList);
                $tasks.toggleCheck(ids);
                break;
            case '6':
                const id = await deleteList($tasks.arrayList);
                if ( id != '0' ) {
                    const ok = await confirm('¿Está seguro?');
                    if ( ok ) {
                        $tasks.delete(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
            case '7':
                const edit = await editTasks($tasks.arrayList);
                if ( edit != '0' ) {
                    const ok = await confirm('¿Está seguro?');
                    if ( ok ) {
                        const desc = await input('Descripción: ');
                        $tasks.edit(edit, desc);
                        console.log('Tarea editada');
                    }
                }
                break;

        }
        saveDB($tasks.arrayList);
        await pause();
    } while ( opt !== '0' )
    console.clear();
}
main();
