import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvioder';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	DiskStorageProvider,
);