import AuthenticateUserService, {
    IResponse,
} from '@modules/users/services/AuthenticateUserService';
import e, { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionController {
    public async authenticate(
        request: Request,
        response: Response,
    ): Promise<e.Response<IResponse>> {
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });
        return response.json({ user, token } as IResponse);
    }
}
