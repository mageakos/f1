import { DriversService } from '../services/drivers.service';

// AbstractFactoryProvider as a HashMap
export let metaMap = new Map<string, string>([]);
metaMap.set('Drivers', 'assets/meta/driver-meta.json');

export let servicesMap = new Map([]);

servicesMap.set('DRIVER', DriversService);

// todo: need this?
