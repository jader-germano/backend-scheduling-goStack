import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    findAllUsers(): Promise<User[] | undefined>;

    find(): Promise<User[] | undefined>;

    findUserById(id: string): Promise<User | undefined>;

    findUserByEmail(email: string): Promise<User | undefined>;

    create(data: ICreateUserDTO): Promise<User>;

    saveUser(user: User): Promise<User | undefined>;

    removeUser(id: string): Promise<boolean>;
}
