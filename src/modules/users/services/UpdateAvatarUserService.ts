import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
    user_id: string;
    avatarFileName: string;
}

@injectable()
export default class UpdateAvatarUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository) {

    }

    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const user = await this.usersRepository.findUserById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticate users can change Avatar.',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        await this.usersRepository.saveUser(user);
        delete user.password;

        return user;
    }
}
