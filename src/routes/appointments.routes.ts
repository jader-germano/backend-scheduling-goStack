import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentsService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
    try {
        const createAppointment = new CreateAppointmentsService(
            appointmentsRepository,
        );

        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        return response.json(
            createAppointment.execute({
                provider,
                date: parsedDate,
            }),
        );
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

appointmentsRouter.get('/:id', (request, response) => {
    const { id } = request.params;
    const appointment = appointmentsRepository.find(id);
    return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});

export default appointmentsRouter;
