import { DriversService } from '../services/drivers.service';

// AbstractFactoryProvider as a HashMap
export let metaMap = new Map<string, string>([]);
metaMap.set('Drivers', 'assets/meta/driver-meta.json');
metaMap.set('Races', 'assets/meta/driver-results-meta.json');

export let servicesMap = new Map([]);

servicesMap.set('DRIVER', DriversService);

// todo: need this?
