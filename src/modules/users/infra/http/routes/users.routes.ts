import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../../../repositories/UsersRepository';
import CreateUserService from '../../../services/CreateUserService';
import UpdateAvatarUserService from '../../../services/UpdateAvatarUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const createUsersService = new CreateUserService();

    const { name, email, password } = request.body;

    return response.json(
        await createUsersService.execute({ name, email, password }),
    );
});

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return response.json(users);
});

usersRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const { id } = request.params;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
        where: { id },
    });

    const returnResponse = user || {
        message: `No user found.`,
        response: `id: ${id}`,
    };

    return response.json(returnResponse);
});

usersRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
    const { id } = request.params;
    const usersRepository = getCustomRepository(UsersRepository);

    const removed = await usersRepository.removeUser(id);

    const removedStatus = {
        message: `Successfully deleted: ${removed}`,
        response: `${removed}`,
    };
    return response.json(removedStatus);
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
