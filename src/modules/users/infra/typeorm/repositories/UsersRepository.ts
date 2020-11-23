import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

@EntityRepository(User)
export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async find(): Promise<User[] | undefined> {
        const users = this.ormRepository.find();
        return users;
    }

    public async findUserByEmail(email: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne({
            where: { email },
        });
        return user;
    }

    public async findUserById(id: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne({
            where: { id },
        });
        return user || undefined;
    }

    public async findAllUsers(): Promise<User[] | undefined> {
        return (await this.ormRepository.find()) || undefined;
    }

    public async create({ name, email, password }: ICreateUserDTO) {
        const user = this.ormRepository.create({
            name,
            email,
            password,
        });
        return user;
    }

    public async saveUser({
        id,
        name,
        email,
        password,
    }: User): Promise<User | undefined> {
        return this.ormRepository.save({ id, name, email, password });
    }

    public async delete(id: string): Promise<boolean | undefined> {
        const toRemove = await this.ormRepository.findOne({
            where: { id },
        });

        if (toRemove === null) {
            throw Error(`User with id '${id}' not found.`);
        }

        await this.ormRepository.delete(id);

        return true;
    }
}
