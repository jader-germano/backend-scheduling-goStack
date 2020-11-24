import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';
import SearchAppointmentsService from '@modules/appointments/services/SearchAppointmentsService';

describe('SearchAppointment', () => {
    it('should be able to search one appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );
        const searchAppointment = new SearchAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '12345',
        });

        expect(await searchAppointment.search(appointment.id)).toEqual(
            appointment,
        );
    });

    it('should be able to search all appointments', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );
        const searchAppointment = new SearchAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '12345',
        });

        const arrayAppointment = [];
        arrayAppointment.push(appointment);
        const arrayResponseAppointment = await searchAppointment.searchAll();

        expect(arrayResponseAppointment).toBeGreaterThanOrEqual(
            arrayAppointment.length,
        );
    });
});
