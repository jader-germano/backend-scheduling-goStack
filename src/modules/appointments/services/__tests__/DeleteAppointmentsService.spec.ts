import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';
import DeleteAppointmentsService from '@modules/appointments/services/DeleteAppointmentsService';

describe('DeleteAppointment', () => {
    it('should be able to cancel an Appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );
        const deleteAppointment = new DeleteAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '12345',
        });

        expect(deleteAppointment.delete(appointment.id)).toBeTruthy();
    });
});
