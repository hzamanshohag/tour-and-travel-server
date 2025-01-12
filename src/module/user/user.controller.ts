import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await userService.createUser(payload);

    res.json({
      status: true,
      message: 'User Create Successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers();
    res.json({
      status: true,
      message: 'All users data',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const singleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userService.singleUserData(userId);
    res.json({
      status: true,
      message: 'User data',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await userService.updateUser(id, data);
      res.json({
        status: true,
        message: 'Update user successfully',
        data: result,
      });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const deleteUser = async(req: Request, res: Response)=>{
  try {
    const id = req.params.id;
     await userService.deleteUser(id);
     res.json({
       status: true,
       message: 'Delete user successfully',
       result:{},
     });
     
  } catch (error) {
     res.json({
       status: false,
       message: 'Something went wrong',
       error,
     });
  }
}

export const userController = {
  createUser,
  getUser,
  singleUser,
  updateUser,
  deleteUser,
};
