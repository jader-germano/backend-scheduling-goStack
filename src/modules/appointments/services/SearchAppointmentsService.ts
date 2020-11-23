import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class SearchAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async search(id: string): Promise<Appointment | undefined> {
        return this.appointmentsRepository.findById(id);
    }

    public async searchAll(): Promise<Appointment[] | undefined> {
        return this.appointmentsRepository.findAll();
    }
}
export default SearchAppointmentsService;
