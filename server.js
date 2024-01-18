import express from 'express';
import path from 'path';
import url from 'url';
import routes from './routes.js';
import bodyParser from 'body-parser';
const app = express();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

app.set('views', [
   path.resolve(__dirname, 'src', 'views', 'Home'),
   path.resolve(__dirname, 'src', 'views', 'Login')
])

app.set('view engine', 'ejs');
app.use(routes);

app.listen(3000, () => {
   console.log('Servidor http://localhost:3000');
})