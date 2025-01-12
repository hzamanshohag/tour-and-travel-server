import { Iuser } from './user.interface';
import User from './user.model';

const createUser = async (payload: Iuser): Promise<Iuser> => {
  const result = await User.create(payload);
  return result;
};

const getUsers = async () => {
  const result = await User.find();
  return result;
};

const singleUserData = async (id: string) => {
  const result = await User.findById(id);
  //   const result = await User.findOne({ id});
  return result;
};

const updateUser = async (id: string, data: Iuser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  createUser,
  getUsers,
  singleUserData,
  updateUser,
  deleteUser,
};
