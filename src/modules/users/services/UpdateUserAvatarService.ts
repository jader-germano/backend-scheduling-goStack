import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
    user_id: string;
    avatarFileName: string;
}

@injectable()
export default class UpdateAvatarUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProider: IStorageProvider
    ) {

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
            await this.storageProider.deleteFile(user.avatar);
        }
        const fileName = await this.storageProider.saveFile(avatarFileName);


        user.avatar = fileName;

        await this.usersRepository.saveUser(user);

        return user;
    }
}
