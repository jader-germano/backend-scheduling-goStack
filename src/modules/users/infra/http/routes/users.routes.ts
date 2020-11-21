import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';
import CreateUserService from '../../../services/CreateUserService';
import UpdateAvatarUserService from '../../../services/UpdateAvatarUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.post('/', async (request, response) => {
    const usersRepository = new UsersRepository();
    const createUsersService = new CreateUserService(usersRepository);

    const { name, email, password } = request.body;

    return response.json(
        await createUsersService.execute({ name, email, password }),
    );
});

/* usersRouter.get('/', ensureAuthenticated, async (request, response) => {
    const users = await this.usersRepository.find();
    return response.json(users);
});

usersRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const { id } = request.params;

    const user = await this.usersRepository.findUserById(id
    );

    const returnResponse = user || {
        message: `No user found.`,
        response: `id: ${id}`,
    };

    return response.json(returnResponse);
});

usersRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
    const { id } = request.params;

    const removed = await this.usersRepository.removeUser(id);

    const removedStatus = {
        message: `Successfully deleted: ${removed}`,
        response: `${removed}`,
    };
    return response.json(removedStatus);
}); */

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const usersRepository = new UsersRepository();
        const updateAvatarUserService = new UpdateAvatarUserService(usersRepository);

        const users = await updateAvatarUserService.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });
        return response.json(users);
    },
);

export default usersRouter;
