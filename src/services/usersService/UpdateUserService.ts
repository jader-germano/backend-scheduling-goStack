import { getRepository } from 'typeorm';
import User from '../../models/User';

interface Request {
    id: string;

    name: string;

    email: string;

    password: string;
}

export default class UpdateUserService {
    public async execute({
        id,
        name,
        email,
        password,
    }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const checkUsersExists = await usersRepository.find({
            where: { id, email },
        });

        if (checkUsersExists.length > 1) {
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
