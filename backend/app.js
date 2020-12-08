import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware';

import blogPostRoutes from './routes/blogPosts';
import projectRoutes from './routes/projects';
import technologyRoutes from './routes/technologies';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';

const app = express();

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

const db = `${mongoUri}/${dbName}`;

console.log('db', db);

app.use(express.json());

app.use(cors());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use('/blogposts', blogPostRoutes);
app.use('/projects', projectRoutes);
app.use('/technologies', technologyRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res, next) => {
  res.send('Hello new world!');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log('App listen to ' + port);
});

app.use(notFound);

app.use(errorHandler);
