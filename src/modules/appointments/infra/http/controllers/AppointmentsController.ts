import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';
import DeleteAppointmentsService from '@modules/appointments/services/DeleteAppointmentsService';
import SearchAppointmentsService from '@modules/appointments/services/SearchAppointmentsService';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;
        const parsedDate = parseISO(date);
        const createAppointmentsService = container.resolve(
            CreateAppointmentsService,
        );

        return response.json(
            await createAppointmentsService.execute({
                provider_id,
                date: parsedDate,
            }),
        );
    }

    public async searchAll(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const searchAppointmentsService = container.resolve(
            SearchAppointmentsService,
        );

        const appointments = await searchAppointmentsService.searchAll();
        return response.json(appointments);
    }

    public async search(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const searchAppointmentsService = container.resolve(
            SearchAppointmentsService,
        );

        const appointment = await searchAppointmentsService.search(id);

        const returnResponse = appointment || {
            message: `No appointment found.`,
            response: `id: ${id}`,
        };
        return response.json(returnResponse);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const deleteAppointmentsService = container.resolve(
            DeleteAppointmentsService,
        );
        const removed = await deleteAppointmentsService.delete(id);

        const removedStatus = {
            message: `Successfully deleted: ${removed}`,
            response: `${removed}`,
        };
        return response.json(removedStatus);
    }
}
