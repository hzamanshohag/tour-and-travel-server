import { model, Schema } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    bookSlots: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
