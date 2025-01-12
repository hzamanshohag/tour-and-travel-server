import express, { Request, Response } from 'express';
import userRoute from './module/user/user.router';
const app = express();
app.use(express.json());

app.use('/api/user', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Home Server Page 👌❎');
});

export default app;
