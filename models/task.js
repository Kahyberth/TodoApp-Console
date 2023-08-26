import { v4 as uuidv4, v4 } from 'uuid';
export class Task {
    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
}