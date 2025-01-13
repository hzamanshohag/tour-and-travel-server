import mongoose from 'mongoose';
import Tour from '../tour/tour.model';
import User from '../user/user.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingInDB = async (payload: IBooking) => {
  // const { user, tour, bookSlots } = payload;
  // const IsUserExist = await User.findById(user);
  // if (!IsUserExist) {
  //   throw new Error('User not found');
  // }
  // const tourData = await Tour.findById(tour);
  // if (!tourData) {
  //   throw new Error('Tour not found');
  // }
  // const totalPrice = tourData.price * bookSlots;
  // payload.totalPrice = totalPrice;
  // payload.bookingStatus = 'pending';

  // if (tourData.availableSeats < bookSlots) {
  //   throw new Error('Not enough seats available');
  // }
  // const booking = await Booking.create(payload);

  // const updatedTour = await Tour.findByIdAndUpdate(
  //   tour,
  //   { $inc: { availableSeats: -bookSlots } },
  //   { new: true },
  // );
  // if (!updatedTour) {
  //   throw new Error('Failed to update tour');
  // }
  // return booking;

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { user, tour, bookSlots } = payload;
    const IsUserExist = await User.findById(user);
    if (!IsUserExist) {
      throw new Error('User not found');
    }
    const tourData = await Tour.findById(tour);
    if (!tourData) {
      throw new Error('Tour not found');
    }
    const totalPrice = tourData.price * bookSlots;
    payload.totalPrice = totalPrice;
    payload.bookingStatus = 'pending';
    if (tourData.availableSeats < bookSlots) {
      throw new Error('Not enough seats available');
    }
    const booking = await Booking.create([payload], { session });
    const updatedTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      { $inc: { availableSeats: -bookSlots } },
      { new: true },
    );
    if (!updatedTour) {
      throw new Error('Failed to update tour');
    }
    await session.commitTransaction();
    await session.endSession();
    return booking[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const updateBookingInDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const currentBooking = await Booking.findByIdAndUpdate(
      id,
      {
        bookingStatus: 'cancelled',
        totalPrice: 0,
      },
      { new: true, session: session },
    );
    if (!currentBooking) {
      throw new Error('Booking not found');
    }
    //updateBookSlots
    await Tour.findByIdAndUpdate(
      currentBooking?.tour,
      {
        $inc: { availableSeats: +currentBooking.bookSlots },
      },
      { new: true, session: session },
    );
    await session.commitTransaction();
    await session.endSession();
    return currentBooking;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
const getAllBookingInDB = async () => {
  const result = await Booking.find();
  return result;
};

export const BookingService = {
  createBookingInDB,
  updateBookingInDB,
  getAllBookingInDB,
};
