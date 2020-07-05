import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
    public async findAllUsers(): Promise<User[] | null> {
        return (await this.find()) || null;
    }

    public async findUserById(id: string): Promise<User | null> {
        const user = await this.findOne({
            where: { id },
        });
        return user || null;
    }

    public async saveUser({
        id,
        name,
        email,
        password,
    }: User): Promise<User | null> {
        return this.save({ id, name, email, password });
    }

    public async removeUser(id: string): Promise<boolean> {
        const toRemove = await this.findOne({
            where: { id },
        });
        if (toRemove === null) {
            throw Error(`User with id '${id}' not found.`);
        }
        await this.delete(id);
        return true;
    }
}
