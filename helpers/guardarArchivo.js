import fs from 'fs';
export const guardarDB = (data) => {
    const archivo = './db/data.json';
    fs.writeFileSync(archivo, JSON.stringify(data));
}

export const leerDB = () => {
    if (fs.existsSync('./db/data.json') && fs.readFileSync('./db/data.json', { encoding: 'utf-8' }).length > 0) {
        const info = fs.readFileSync('./db/data.json', { encoding: 'utf-8' });
        const data = JSON.parse(info);
        return data;
    }
    return null;
}