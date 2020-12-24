import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import CreateUsersService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('DeleteUser', () => {
    it('should be able to remove an User', async () => {
        const fakeAppointmentsRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUsersService(
            fakeAppointmentsRepository,
            fakeHashProvider
        );
        const deleteUser = new DeleteUserService(
            fakeAppointmentsRepository,
        );

        const user = await createUser.execute({
            email: 'email@email.com',
            name: 'newUser',
            password: 'password'
        });

        expect(deleteUser.delete(user.id)).toBeTruthy();
    });

});
