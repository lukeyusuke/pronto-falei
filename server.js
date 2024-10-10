import 'dotenv/config';
const app = express();
import express from 'express';
import path from 'path';
import url from 'url';
import routes from './routes.js';
import bodyParser from 'body-parser';
import { sessionInit, redisClient } from './redis.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

sessionInit(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

app.set('views', [
   path.resolve(__dirname, 'src', 'views', 'Home'),
   path.resolve(__dirname, 'src', 'views', 'Login'),
   path.resolve(__dirname, 'src', 'views', 'Register'),
   path.resolve(__dirname, 'src', 'views', 'Vent'),
   path.resolve(__dirname, 'src', 'views', 'Profile'),
])

app.set('view engine', 'ejs');
app.use(routes);

app.listen(3000, () => {
   console.log(`Servidor http://localhost:3000`);
})