import { Router } from 'express';
import usersRoutes from './users.routes';
import appointmentsRouter from './appointments.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRoutes);

export default routes;
