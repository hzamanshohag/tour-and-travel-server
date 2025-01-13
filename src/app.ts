import express, { NextFunction, Request, Response } from 'express';
import userRoute from './module/user/user.router';
import { StatusCodes } from 'http-status-codes';
import tourRouter from './module/tour/tour.route';
import bookingRouter from './module/booking/booking.router';
const app = express();
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/tour', tourRouter);
app.use('/api/booking', bookingRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Home Server Page 👌❎');
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
app.use((err: any, req: Request, res: Response,next:NextFunction) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: err.message, error: err });
});

export default app;
