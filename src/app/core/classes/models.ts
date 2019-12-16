import { Observable } from 'rxjs';

export interface IEntityService<T> {
  get(): Observable<T>;
  getAll(): Observable<any>;
}

export interface IButtonGroup {
  buttons: Button[];
}
export class ButtonGroup implements IButtonGroup {
  buttons = [];
}
export interface IButton {
  text: string | any;
  icon: string | any;
  action: any; // function()
  class: string;
}
export class Button implements IButton {
  text = '';
  icon = '';
  class = '';
  action = () => {
    console.warn('Method not implemented');
  }
}

// export class EntityService<Driver> implements IEntityService {
//   get(): Observable<Driver> {
//     return null;
//   }
// }
