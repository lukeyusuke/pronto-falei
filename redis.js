import session from 'express-session';
import RedisStore from "connect-redis";
import {createClient} from "redis";

let redisClient = createClient({
   password: process.env.REDIS_PASSWORD,
   socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
   }
});

redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
   client: redisClient,
   prefix: "",
})

const sessionInit = (app) => {
    app.use(session({
        name: 'appSession',
        store: redisStore,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 60000 }
     }));
}

export { sessionInit, redisClient }