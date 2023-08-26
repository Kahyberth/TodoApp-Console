import { Task } from "./task.js";
import colors from 'colors';
export class Tasks {
    constructor(){
        this._listado = {};
    }

    get arrayList() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    createTask(desc='') {
        const tarea = new Task(desc);
        this._listado[tarea.id] = tarea;
    }

    loadData(data) {
        data.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listStatus( ) {
        console.log();
        let counter = 0;
        this.arrayList.forEach(tarea => {
            counter++;
            if ( tarea.completadoEn !== null ) {
                console.log(` ${counter.toString().green}. ${tarea.desc} :: ${'Completada'.green}`);
            }
            else {
                console.log(` ${counter.toString().green}. ${tarea.desc} :: ${'Pendiente'.red}`)
            }
        });
    }

    list(status = true) {
        console.log();
        let counter = 0;
        this.arrayList.forEach(tarea => {
            counter++;
            if (tarea.completadoEn !== null && status) {
                console.log(` ${counter.toString().green}. ${tarea.desc} :: ${'Completada'.green}`);
            } 
            if (tarea.completadoEn === null && !status) {
                console.log(`${counter.toString().green}. ${tarea.desc} :: ${'Pendiente'.red}`)
            }
        });
    }

    delete(id = '') { 
          if (this._listado[id]) {
                delete this._listado[id];
            }   
    }

    toggleCheck = async ( ids ) => {
        const choices = ids.forEach( id => {
            const task = this._listado[id];
            if ( !task.completadoEn ) {
                task.completadoEn = new Date().toISOString();
            }
        });
        this.arrayList.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

    edit = async ( id, desc ) => {
        this._listado[id].desc = desc;
    }
}