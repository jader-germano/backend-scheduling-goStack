import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUsersService from '@modules/users/services/CreateUserService';
import SearchUserService from '@modules/users/services/SearchUserService';

describe('SearchUser', () => {
    it('should be able to search one user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUsersService(
            fakeUsersRepository,
            fakeHashProvider
        );
        const searchUser = new SearchUserService(
            fakeUsersRepository,
        );

        const user = await createUser.execute({
            email: 'email@email.com',
            name: 'newUser',
            password: '123456'
        });

        expect(await searchUser.search(user.id)).toEqual(
            user,
        );
    });

    it('should be able to search all users', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUsersService(
            fakeUsersRepository,
            fakeHashProvider
        );
        const searchUser = new SearchUserService(
            fakeUsersRepository,
        );

        const user = await createUser.execute({
            email: 'email@email.com',
            name: 'newUser',
            password: '123456'
        });

        const arrayUser = [];
        arrayUser.push(user);
        const arrayResponseUser = await searchUser.searchAll();
        console.log(arrayResponseUser);

        expect(arrayResponseUser).toContain(
            user,
        );
        expect(arrayResponseUser?.length).toBeGreaterThanOrEqual(
            arrayUser?.length,
        );

    });
});