import cors from 'cors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes';

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', (req: Request, res: Response): Response => {
  return res.send(`Hello, World! ${process.env.PORT}`);
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
