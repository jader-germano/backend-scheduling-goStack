import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';

const appointmentsRouter = Router();


appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = new AppointmentsRepository();

    const { id } = request.params;

    const appointments = appointmentsRepository.findById(id) || appointmentsRepository.findAll();

    return response.json(appointments);
});


appointmentsRouter.post('/', async (request, response) => {
    const appointmentsRepository = new AppointmentsRepository();

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentsService = new CreateAppointmentsService
        (appointmentsRepository,
    );

    return response.json(
        await createAppointmentsService.execute({
            provider_id,
            date: parsedDate,
        }),
    );
});

appointmentsRouter.get('/:id', async (request, response) => {
    const appointmentsRepository = new AppointmentsRepository();

    const { id } = request.params;

    const appointment = await appointmentsRepository.findById(id);

    const returnResponse = appointment || {
        message: `No appointment found.`,
        response: `id: ${id}`,
    };
    return response.json(returnResponse);
});

appointmentsRouter.delete('/:id', async (request, response) => {
    const appointmentsRepository = new AppointmentsRepository();

    const { id } = request.params;
    const createAppointmentsService = new CreateAppointmentsService
        (appointmentsRepository,
    );
    const removed = await appointmentsRepository.removeAppointment(id);

    const removedStatus = {
        message: `Successfully deleted: ${removed}`,
        response: `${removed}`,
    };
    return response.json(removedStatus);
});

export default appointmentsRouter;
