import { Observable } from 'rxjs';

export interface IEntityService<T> {
  get(): Observable<T>;
  getAll(): Observable<any>;
  getById(id: string | number): Observable<any>;
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
  id: string;
  text: string;
  icon: string;
  class: string;
  action = () => {};
}

export class GridMeta {
  columns: Column[] | any[];
  id: any;
}

export class Column {
  name: string;
  column: string;
  type: string;
  hidden: boolean;

  // define ascend/descending sort by 1/-1
  lastSorted: number = undefined;
}
