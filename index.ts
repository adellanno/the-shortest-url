import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import decodeRoute from './src/routes/decode/decode'
import encodeRoute from './src/routes/encode/encode'
import helmet from 'helmet';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(helmet())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send(`Server is running on port ${port}`);
});

app.use('/decode', decodeRoute)
app.use('/encode', encodeRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});