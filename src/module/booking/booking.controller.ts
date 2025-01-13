import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await BookingService.createBookingInDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Booking Create Successfully',
    data: result,
  });
});
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.updateBookingInDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Booking Updated Successfully',
    data: result,
  });
});
const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingInDB();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'All Booking are retrieved Successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  updateBooking,
  getAllBooking,
};
