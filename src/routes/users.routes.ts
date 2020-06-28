import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/usersService/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
    try {
        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.find();
        return response.json(users);
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

usersRouter.post('/', async (request, response) => {
    try {
        const createUsersService = new CreateUserService();

        const { name, email, password } = request.body;

        return response.json(
            await createUsersService.execute({ name, email, password }),
        );
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

usersRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const usersRepository = getCustomRepository(UsersRepository);

        const appointment = await usersRepository.findOne({
            where: { id },
        });
        return response.json(appointment);
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

export default usersRouter;
