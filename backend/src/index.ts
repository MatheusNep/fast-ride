import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response): Response => {
    return res.send('Hello, World!');
  })

const PORT = 8080;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
