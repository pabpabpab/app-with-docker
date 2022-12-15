import express from 'express';
import dotenv from 'dotenv/config';
import path from 'path';
import fs from 'fs';

// Constants

const PORT = 8080;
const HOST = '0.0.0.0';
/*
const PORT = 3000;
const HOST = 'localhost';
*/
const __dirname = process.cwd();

// App
const app = express();
app.get('/', async (req, res) => {
    //res.send(`Hello World! ${__dirname}<br>`);
    await readDB(res);
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT} ${__dirname}`);
});

async function readDB(res) {
    let filePath = path.join(__dirname, 'db', 'db.txt');
    const log1 = `Now is ${Date.now()}<br>\n`;
    if (!fs.existsSync(filePath)) {
        await fs.writeFile(filePath, log1, (err) => console.log(err));
    }

    await fs.writeFile(filePath, log1, { flag: 'a' }, (err) => console.log(err));

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(data);
    });
}

