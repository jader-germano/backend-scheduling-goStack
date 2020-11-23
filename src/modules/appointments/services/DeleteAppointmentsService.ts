import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class DeleteAppointmentsService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository) { }

	public async delete(id: string): Promise<boolean | undefined> {
		return this.appointmentsRepository.removeAppointment(id);
	}
}
export default DeleteAppointmentsService;