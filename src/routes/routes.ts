import { Router } from 'express';
import UsersRoutes from './users.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', UsersRoutes);

export default routes;
