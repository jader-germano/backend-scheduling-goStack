import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/usersService/CreateUserService';
import UpdateAvatarUserService from '../services/usersService/UpdateAvatarUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const createUsersService = new CreateUserService();

    const { name, email, password } = request.body;

    return response.json(
        await createUsersService.execute({ name, email, password }),
    );
});

usersRouter.get('/:id', async (request, response) => {
    const { id } = request.params;

    const usersRepository = getCustomRepository(UsersRepository);

    const appointment = await usersRepository.findOne({
        where: { id },
    });
    return response.json(appointment);
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateAvatarUserService = new UpdateAvatarUserService();

        const users = await updateAvatarUserService.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });
        return response.json(users);
    },
);

export default usersRouter;
