import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { startOfHour } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}

class CreateAppointmentsService {
    constructor(private appointmentsRepository: IAppointmentsRepository) { }

    public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDateAndProvider(
            provider_id,
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        return this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });
    }
}

export default CreateAppointmentsService;
