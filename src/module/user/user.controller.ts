import { Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User Create Successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsers();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'All users  getting successfully',
    data: result,
  });
});

const singleUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await userService.singleUserData(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single user  getting successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await userService.updateUser(id, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'user Updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await userService.deleteUser(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users  delete successfully',
    data: {},
  });
});

export const userController = {
  createUser,
  getUser,
  singleUser,
  updateUser,
  deleteUser,
};
