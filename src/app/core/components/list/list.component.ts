import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { IButtonGroup, Column, ButtonGroup } from "../../classes/models";

import { MyLib } from "../../classes/myLib";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnChanges {
  constructor() {}
  @Input() id = "id"; // unique identifier for list items
  @Input() title = "List";
  @Input() data: any[] = []; // list items
  @Input() columns: Column[] = []; // columns definitions
  @Input() actions: ButtonGroup = null; // over the list button actions
  @Input() sortable: boolean = false; // allow sort
  @Input() filterable: boolean = false; // allow filtering
  @Output() rowDbClick = new EventEmitter<any>(); // on row double click
  @Output() rowClick = new EventEmitter<any>(); // on row click

  filteredData = [];

  public selected = "";
  @Input() filters: any[];

  ngOnInit() {
    this.validate();
  }

  ngOnChanges(data) {
    this.validate();

    // if (this.data && this.Id)
    if (data && data.data && data.data.currentValue.length > 0) {
      // todo: check if i need next line
      // this.data = data.data.currentValue;
      this.validateAndSetId(this.data, this.id);
      this.filteredData = [...this.data];
    } else {
      console.log("no data");
    }
  }

  validateAndSetId(arr: any[], id: string) {
    // if there is no given id for the data set
    if (arr[0][id] === undefined) {
      arr.forEach((dato, i) => {
        dato[this.id] = i;
      });
    }
    return arr;
  }

  // ngFor track by fn
  trackFn(index, item) {
    return item[this.id];
  }

  // filter(filter: string) {
  //   if (!this.filterable) {
  //     return;
  //   }
  //   // todo: filter
  // }

  filterChanged(filterValue: string) {
    if (!this.filterable) return;

    let res = this.filterbyVal(this.data, filterValue);
    this.setFilteredData(res);
  }

  setFilteredData(data: any[]) {
    data = data.unique();
    this.filteredData = data;
    return data;
  }

  filterbyVal(data: any[], filterValue: string): any[] {
    let res = [];
    res = data.filter(dato => this.filterRowBy(dato, filterValue, res));
    return res;
  }

  filterRowBy(dato: any, filterValue: string, res: any[]) {
    this.columns &&
      this.columns.forEach(col => {
        // do not filter hidden columns
        if (col.hidden) return;

        // if there are given filters by column name
        if (this.filters && !this.filters.contains(col.name)) return;

        const colVal =
          (dato[col.name] && dato[col.name].toString().toLowerCase()) || "";
        if (colVal.indexOf(filterValue.toLowerCase()) > -1) {
          res.push(dato);
        }
      });

    return res;
  }

  // column sort
  sort(col: Column) {
    if (!this.sortable) return;

    // change column's lastSorted prop to new sorting (or define it first time)
    col.lastSorted = col.lastSorted * -1 || 1;

    // rest the rest columns' lastSorted prop
    this.columns &&
      this.columns.forEach(c => {
        if (col !== c) {
          c.lastSorted = null;
        }
      });

    // sort data
    this.filteredData = this.filteredData.sort((a, b) =>
      this.sortBy(a, b, col)
    );
  }

  sortBy(a: any, b: any, col: Column) {
    let varA = a[col.name];
    let varB = b[col.name];
    // check if number
    const columnIsNumber = typeof col.type === "number";
    const varIsNumber =
      MyLib.valid.isNumber(varA) && MyLib.valid.isNumber(varB);
    // if is number
    if (columnIsNumber || varIsNumber) {
      varA = Number(varA);
      varB = Number(varB);
    }

    return (varA > varB ? 1 : -1) * col.lastSorted;
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
    MyLib.valid.validate(
      Array.isArray(this.columns),
      "'columns' is not an Array"
    );
    MyLib.valid.validate(Array.isArray(this.data), "'data' is not an Array");
    MyLib.valid.validate(
      MyLib.valid.isObject(this.actions),
      "'actions' are not an instance of ButtonGroup"
    );
  }
}
