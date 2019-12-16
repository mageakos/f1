import { Observable } from "rxjs";

export interface IEntityService<T> {
  get(): Observable<T>;
  getAll(): Observable<any>;
}
export class Driver {
  DriversTable: any;
}

// export class EntityService<Driver> implements IEntityService {
//   get(): Observable<Driver> {
//     return null;
//   }
// }
