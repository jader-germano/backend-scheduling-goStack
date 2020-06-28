import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/appointmentsService/CreateAppointmentsService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const createAppointmentsService = new CreateAppointmentsService();

        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        return response.json(
            await createAppointmentsService.execute({
                provider_id,
                date: parsedDate,
            }),
        );
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

appointmentsRouter.get('/:id', async (request, response) => {
    const { id } = request.params;
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointment = await appointmentsRepository.findByIds([id]);
    return response.json(appointment);
});

export default appointmentsRouter;
