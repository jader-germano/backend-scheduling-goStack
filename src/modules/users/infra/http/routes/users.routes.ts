import uploadConfig from '@config/upload';
import UserController from '@modules/users/infra/http/controllers/UserController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';

const usersRouter = Router();
const upload = multer(uploadConfig);
const userController = new UserController();

usersRouter.post('/', userController.save);

usersRouter.get('/', userController.searchAll);

usersRouter.get('/:id', ensureAuthenticated, userController.search);

usersRouter.delete('/:id', ensureAuthenticated, userController.delete);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userController.updateAvatar,
);

export default usersRouter;
