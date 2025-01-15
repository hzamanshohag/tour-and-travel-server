import express, { Request, Response } from 'express';
import userRoute from './module/user/user.router';
import tourRouter from './module/tour/tour.route';
import bookingRouter from './module/booking/booking.router';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { StatusCodes } from 'http-status-codes';
const app = express();
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/tour', tourRouter);
app.use('/api/booking', bookingRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Home Server Page 👌❎');
});

app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, message: 'Route not found' });
});

export default app;
