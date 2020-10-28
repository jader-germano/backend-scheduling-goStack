import { EntityRepository, Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDateAndProvider(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date, provider_id },
        });
        return findAppointment || null;
    }

    public async findAll(): Promise<Appointment[] | null> {
        const findAppointment = await this.find();
        return findAppointment || null;
    }

    public async removeAppointment(id: string): Promise<boolean> {
        const toRemove = await this.findOne({
            where: { id },
        });
        if (toRemove === null) {
            throw new AppError(`Appointments with id '${id}' not found.`);
        }
        await this.delete(id);
        return true;
    }
}

export default AppointmentsRepository;
