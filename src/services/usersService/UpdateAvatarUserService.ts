import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import uploadConfig from '../../config/upload';

interface Request {
    user_id: string;
    avatarFileName: string;
}

export default class UpdateAvatarUserService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne(user_id);

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
        await usersRepository.save(user);
        delete user.password;
        return user;
    }
}
