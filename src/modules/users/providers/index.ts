import { container } from 'tsyringe';
import BCryptProvider from './HashProvider/implementations/BCryptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>(
	'HashProvider',
	BCryptProvider
);