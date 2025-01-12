import { Router } from 'express';
import { userController } from './user.controller';

const userRoute = Router();

userRoute.post('/create-user', userController.createUser);

userRoute.get('/', userController.getUser);

userRoute.get('/:userId', userController.singleUser);
userRoute.put('/:id', userController.updateUser);
userRoute.delete('/:id', userController.deleteUser);
export default userRoute;
