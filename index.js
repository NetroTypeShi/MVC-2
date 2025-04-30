import express from 'express';
import nunjucks from 'nunjucks';
import { User } from './models/user';
import {loggerBasic, loggerCustom} from "./middleware/log.js";
import session from 'express-session';
import SQLiteStore from 'connect-sqlite3';
const app = express();
app.use(loggerCustom);
const PORT = 3000;

const SQLiteStoreSession = SQLiteStore(session);

const sessionStore = new SQLiteStoreSession({
    db: 'sessions.sqlite',
    dir: "./db",
});

app.use(session(sessionConfig));

const sessionConfig = {
    strore: sessionStore,
    secret: "1234",
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}
const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.set('view engine', 'njk');

app.get('/users', (req, res) => {
    const users = [/* Lista de usuarios desde la base de datos */];
    res.render('usersTable', { users });
});

app.get('/auth', (req, res) => {
    res.render('register');
});

app.get('/', async (req, res) => {
    const usersRaw = await User.findAll();
    const users = usersRaw.map(user => {
        return {
            id: user.id,
            username: user.username,
            password: user.password
        }
    })
    console.log(users);
    
    res.render("test", {
        tittle: "Test nunjucks",
        desc : "probando nunjucks",
        users
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import authRouter from "./routes/auth.js";
app.use('/', authRouter);
