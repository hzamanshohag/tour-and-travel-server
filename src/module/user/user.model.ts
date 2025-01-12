import { model, Schema } from 'mongoose';
import { Iuser } from './user.interface';

const userSchema = new Schema<Iuser>({
  name: {
    type: String,
    required: true,
    minlength: [3, 'name is too small'],
    maxlength: [20, 'name is very long'],
  },
  age: {
    type: Number,
    required: [true, 'please enter your age'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: '{VALUE} is not valid',
    },
    immutable: true,
  },
  photo: String,
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: '{VALUE} is not valid',
    },
    required: true,
    default: 'user',
  },
  userStatus: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: '{VALUE} is not valid',
    },
    required: true,
    default: 'active',
  },
});

// userSchema.pre('find', function (this, next) {
//   this.find({
//     userStatus: { $ne: 'active' },
//   });
//   next();
// });

// userSchema.post('find', function (docs, next) {
//   docs.forEach((doc: Iuser) => {
//     doc.name = doc.name.toUpperCase();
//   });
//   next();
// });

const User = model<Iuser>('User', userSchema);

export default User;
