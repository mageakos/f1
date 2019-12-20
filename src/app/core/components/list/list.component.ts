import { Valid } from './../../classes/validators';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { IButtonGroup, Column } from '../../classes/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  constructor() {}
  @Input() id = 'id';
  @Input() title = 'List';
  @Input() data: any[];
  @Input() columns: Column[];
  @Input() actions: IButtonGroup;
  @Input() sortable: boolean; // allow sort
  @Input() filterable: boolean; // allow filtering
  @Output() rowDbClick = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();

  filteredData = [];

  public selected = '';
  @Input() filters;

  ngOnInit() {
    this.validate();
  }

  ngOnChanges(data) {
    this.validate();

    if (data && data.data && data.data.currentValue.length > 0) {
      // set data id
      this.data = data.data.currentValue;
      // if there is no given id for the data set
      if (this.dataHasNoId()) {
        this.data.forEach((dato, i) => {
          dato[this.id] = i;
        });
      }
      this.filteredData = [...this.data];
    } else {
      console.log('no data');
    }
  }

  dataHasNoId() {
    // check if has data has Id
    return this.data[0][this.id] === undefined;
  }

  // ngFor track by fn
  trackFn(index, item) {
    // const indy = index;
    return item[this.id];
  }

  filter(filter: string) {
    if (!this.filterable) {
      return;
    }
    // todo: filter
  }

  filterChanged($event) {
    const filterValue = $event.target.value;
    if (filterValue && filterValue.length > 0) {
      const res = [];
      this.data.filter(dato => this.filterBy(dato, filterValue, res));
      this.setFilterecData(res);
    } else {
      // no filter, set initial value
      this.setFilterecData(this.data);
    }
  }

  setFilterecData(data: any[]) {
    data = [new Set(data)];
    this.filteredData = [...data[0]];
    return this.filteredData;
  }

  filterBy(dato: any, filterValue: string, res: any[]) {
    if (this.filters) {
      console.log('has filters');
    } else {
      this.columns.forEach(col => {
        const colVal = dato[col.name] && dato[col.name].toString().toLowerCase() || '';
        if (colVal.indexOf(filterValue) > -1) {
          res.push(dato);
          console.log('pushed');
        }
      });
    }
    return res;
  }

  // column sort
  sort(col: Column) {
    if (!this.sortable) {
      return;
    }

    col.lastSorted = col.lastSorted * -1 || 1;
    this.filteredData = this.filteredData.sort((a, b) => {
      // check if number
      let varA = a[col.name];
      let varB = b[col.name];

      const columnIsNumber = typeof col.type === 'number';
      const isNumber = !isNaN(varA);
      // if is number
      if (columnIsNumber || isNumber) {
        varA = Number(varA);
        varB = Number(varB);
      }

      return (varA < varB ? 1 : -1) * col.lastSorted;
    });

    this.columns.forEach(c => {
      if (col !== c) {
        c.lastSorted = null;
      }
    });
  }

  // row clicked
  rowClicked(item) {
    this.selected = item[this.id];
    this.rowClick.emit(item);
  }

  // row double clicked
  rowDbClicked(item) {
    this.rowDbClick.emit(item);
  }

  // validate component inputs
  validate() {
    Valid.validator(
      Array.isArray(this.columns),
      'Columns property is not an Array'
    );
    Valid.validator(Array.isArray(this.data), 'Data is not an Array');
    Valid.validator(
      Valid.isObject(this.actions),
      'Actions are not an instance of ButtonGroup'
    );
  }
}
