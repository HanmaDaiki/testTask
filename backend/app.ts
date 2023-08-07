import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './routes';

dotenv.config();

const { PORT = 8000 } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}
  url: http://localhost:${PORT}`);
});