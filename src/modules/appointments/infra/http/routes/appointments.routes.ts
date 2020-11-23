import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', appointmentsController.searchAll);

appointmentsRouter.post('/', appointmentsController.create);

appointmentsRouter.get('/:id', appointmentsController.search);

appointmentsRouter.delete('/:id', appointmentsController.delete);

export default appointmentsRouter;
