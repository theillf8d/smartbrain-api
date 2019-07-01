const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [{
        id: 123,
        name: "John",
        email: "john@gmail.com",
        password: "cookies",
        entries: 0,
        joined: new Date()
    },
    {
        id: 124,
        name: "Sally",
        email: "sally@yahoo.com",
        password: "salad",
        entries: 0,
        joined: new Date()
    }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === Number(id)) {
            found = true;
            return res.json(user);
        }
    })

    if (!found) {
        res.status(404).json('User not found');
    }
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        // res.json('success');
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    database.users.push({
        id: 125,
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    res.send(database.users[database.users.length - 1]);
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    database.users.forEach(user => {
        console.log(user.id, id);
        if (user.id === Number(id)) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })

    if (!found) {
        res.status(404).json('User not found');
    }
})

const port = 3000;
app.listen(3000, () => {
    console.log(`server listening on port ${port}`);
});
