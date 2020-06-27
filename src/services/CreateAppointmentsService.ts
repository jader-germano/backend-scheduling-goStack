import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentsService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDateAndProvider(
            appointmentDate,
            provider_id,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = await appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentsService;
