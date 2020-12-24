import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '12345',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12345');
    });

    it('should not be able to create two appointments on the same date/time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );
        const appointmentsDate = new Date();

        await createAppointment.execute({
            date: appointmentsDate,
            provider_id: '12345',
        });
        await expect(
            createAppointment.execute({
                date: appointmentsDate,
                provider_id: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to cancel an Appintment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '12345',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12345');
    });
    it('should be able to cancel an Appintment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '12345',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12345');
    });
});
