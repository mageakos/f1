import { Valid } from './../../classes/validators';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { IButtonGroup } from '../../classes/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() title = 'List';
  @Input() data: any[];
  @Input() columns: any[];
  @Input() actions: IButtonGroup;
  @Input() sortable: boolean; // allow sort
  @Output() rowDbClick = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();

  public selected = '';

  constructor() {}

  ngOnInit() {
    this.validate();
  }

  ngOnChanges(data) {
    this.validate();
  }

  // ngFor track by fn
  trackFn(index, item) {
    return (item && item.driverId) || index;
  }

  // column sort
  sort(col) {
    if (!this.sortable) { return; }

    col.lastSorted = col.lastSorted * -1 || 1;
    this.data = this.data.sort((a, b) => {
      return (a[col.name] < b[col.name] ? 1 : -1) * col.lastSorted;
    });
    this.columns.forEach(c => {
      if (col !== c) {
        c.lastSorted = null;
      }
    });
  }

  // row clicked
  rowClicked(item) {
    this.selected = item.driverId;
    this.rowClick.emit(item);
  }

  // row double clicked
  rowDbClicked(item) {
    this.rowDbClick.emit(item);
  }

  // validate widget
  validate() {
    Valid.validator(
      Array.isArray(this.columns),
      'Columns property is not an Array'
    );
    Valid.validator(
      Valid.isObject(this.actions),
      'Actions are not an instance of ButtonGroup'
    );
  }
}
