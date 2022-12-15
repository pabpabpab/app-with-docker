import express from 'express';
import mongoose from 'mongoose';
import exphbs from 'express-handlebars';
import handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import path from 'path';
import todoRoutes from './routes/todos.js';

const __dirname = path.resolve()
const HOST = '0.0.0.0';
const PORT = process.env.PORT ?? 3000;

// создаем экземпляр сервера
const app = express();

// инициализируем hbs
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
});

// назначаем hbs ключ hbs
app.engine('hbs', hbs.engine);

// назначаем view engine
app.set('view engine', 'hbs');
// назначаем папку для вьюшек
app.set('views', './views');

// этот мидлвар чтобы можно было обращаться к req.body в пост-запросах в роутах
app.use(express.urlencoded({ extended: true }));
// указать экспрессу где статические файлы, типа index.css
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// подключаем роуты
app.use(todoRoutes);

// хост монги
const collectionName = 'todos';
const mongoUrl = `mongodb://${process.env.MONGO_CONTAINER_NAME}:${process.env.MONGO_CONTAINER_PORT}/${collectionName}`;
// подавить ворнинги
mongoose.set('strictQuery', true);

// функия старта приложения
async function start() {
    try {
        mongoose.connect(mongoUrl, {});

        app.listen(PORT, HOST,() => {
            console.log(`Server has been started on port http://localhost:${PORT}...`)
        })
    } catch (e) {
        console.log(e);
    }
}

// старт
start();














// Connection URL
// const url = 'mongodb://localhost:27017';
//const client = new MongoClient(url);

// Database Name
// const dbName = 'testDb';

/*
async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    // const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
    // console.log('Inserted documents =>', insertResult);

    const findResult = await collection.find({}).toArray();
    const f = findResult.map(i => i._id);
    console.log('Found documents =>', f);

    return 'done';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
*/

// npm install -D @types/express