import { Router } from 'express';
import usersRoutes from './users.routes';
import appointmentsRouter from './appointments.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRouter);

export default routes;
