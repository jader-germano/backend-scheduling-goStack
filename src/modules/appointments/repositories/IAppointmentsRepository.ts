import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;

    findById(id: string): Promise<Appointment | undefined>;

    findByDateAndProvider(
        provider_id: string,
        date: Date,
    ): Promise<Appointment | undefined>;

    findAll(): Promise<Appointment[] | undefined>;

    removeAppointment(id: string): Promise<boolean | undefined>;
}
