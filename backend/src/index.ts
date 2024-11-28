import cors from 'cors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes';
import connectToDatabase from './config/database';
import { checkDrivers } from './controllers/driversController';

connectToDatabase();

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/', router);
checkDrivers();
app.get('/', (req: Request, res: Response): Response => {
  return res.send(`Hello, World! ${process.env.PORT}`);
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
