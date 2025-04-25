import express from 'express';
import nunjucks from 'nunjucks';
import { User } from './models/user';
const app = express();
const PORT = 3000;

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.set('view engine', 'njk');

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

