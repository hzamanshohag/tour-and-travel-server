import { Router } from 'express';
import { BookingController } from './booking.controller';

const bookingRouter = Router();

bookingRouter.post('/create-booking', BookingController.createBooking);
bookingRouter.patch('/:id', BookingController.updateBooking);
bookingRouter.get('/', BookingController.getAllBooking);

export default bookingRouter;
