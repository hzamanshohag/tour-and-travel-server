import { Router, NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';

const userRoute = Router();

userRoute.post(
  '/create-user',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedbody =
        await UserValidation.createUserValidationSchema.parseAsync(req.body);
      req.body = parsedbody;
      next();
    } catch (error) {
      next(error);
    }
  },
  userController.createUser,
);

userRoute.get('/', userController.getUser);

userRoute.get('/:userId', userController.singleUser);
userRoute.put('/:id', userController.updateUser);
userRoute.delete('/:id', userController.deleteUser);
export default userRoute;
