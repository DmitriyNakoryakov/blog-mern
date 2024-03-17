import express from 'express';

import mongoose from 'mongoose';

import { loginValidation, registerValidation, postCreateValidation } from './validations.js'

import checkAuth from './utils/checkAuth.js';

import { UserController, PostController } from './controllers/index.js';

mongoose
.connect('mongodb+srv://nakoryakoff42:EFlHK6K261mS9div@cluster0.a0ya2yf.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB not ok', err))

const app = express();

app.use(express.json());

app.post('/auth/login',loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

//app.get('/posts',PostController.getAll);
//app.get('/posts:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
//app.delete('/posts', PostController.remove);
//app.patch('/posts', PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});
