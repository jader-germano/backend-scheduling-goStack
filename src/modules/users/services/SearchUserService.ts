import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class SearchUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository) { }

	public async search(id: string): Promise<User | undefined> {
		return this.usersRepository.findUserById(id);
	}

	public async searchAll(): Promise<User[] | undefined> {
		return this.usersRepository.find();
	}

}
