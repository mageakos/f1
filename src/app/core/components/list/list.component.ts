import { GridService } from './../../services/grid/grid.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IButtonGroup } from '../../classes/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() title = 'List';
  @Input() data: any[] = [];
  @Input() columns: any[];
  @Input() actions: IButtonGroup;
  @Input() sortable: boolean;
  public selected = '';

  constructor(private gridService: GridService) {}

  ngOnInit() {}

  ngOnChanges(data) {
    console.log(data);
  }

  // ngFor track by fn
  trackFn(index, item) {
    return (item && item.driverId) || index;
  }

  sort(col) {
    col.lastSorted = col.lastSorted * -1 || 1;
    this.data = this.data.sort((a, b) => {
      return (a[col.name] < b[col.name] ? 1 : -1) * (col.lastSorted);
    });
    this.columns.forEach(c => {
      if (col !== c) { c.lastSorted = null; }
    });

    console.warn(col.lastSorted);
  }

  // row clicked
  rowClicked(item) {
    console.log(item);
    this.selected = item.driverId;
  }
}
