import { getRepository } from 'typeorm';
import User from '../../models/User';

interface Request {
    id: string;

    name: string;

    email: string;

    password: string;
}

export default class UpdateUserService {
    public async execute({ id, name, email, password }: Request) {
        const usersRepository = getRepository(User);
        const checkUsersExists = await usersRepository.findOne({
            where: { id, email },
        });

        if (checkUsersExists) {
            throw Error('Email address already in use.');
        }
        const user = usersRepository.create({
            id,
            name,
            email,
            password,
        });
        await usersRepository.save(user);

        return user;
    }
}
