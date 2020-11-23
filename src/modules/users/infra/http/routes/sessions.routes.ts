import SessionController from '@modules/users/infra/http/controllers/SessionController';
import { Router } from 'express';

const sessionsRouter = Router();
const sessionController = new SessionController();
sessionsRouter.post('/', sessionController.authenticate);

export default sessionsRouter;
