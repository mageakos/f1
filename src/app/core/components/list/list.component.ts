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
  @Input() columns: Column[] | any[] = []; // columns definitions
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
      this.validateAndSetId(this.data, this.id); //items should have id
      this.filteredData = [...this.data]; //set filteredData
    } else {
      // console.log("no data");
    }
  }

  validateAndSetId(arr: any[], id: string = this.id) {
    // if there is no given id for the data set
    arr.forEach((dato, i) => {
      dato[id] = dato[id] || MyLib.valid.getId();
    });
    return arr;
  }

  // ngFor track by fn
  trackFn(index, item) {
    return item[this.id] || index;
  }

  filterChanged(filterValue: string) {
    var res = this.getFilteredArray(
      this.data,
      filterValue,
      this.columns,
      this.filters
    );

    this.filteredData = [...res];
  }

  getFilteredArray(
    array: any[],
    filterValue: string,
    columns: any[],
    filters: any[]
  ) {
    if (!this.filterable) return array;

    // return a new array where
    return array.filter(item =>
      // at least 1 of the object keys
      Object.keys(item).some(k => {
        let value = item[k];

        if (
          // where key is column and filterable and not another object or array
          this.keyIsFilterableColumn(columns, k) &&
          !(MyLib.valid.isObject(value) && Array.isArray(value))
        ) {
          // contains the desired value
          return value
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }
      })
    );
  }

  // given key should exist as column (by name) and should not be hidden in order to filter by that column
  keyIsFilterableColumn(columns: any[], k: string): boolean {
    if (!columns || columns.length === 0) return true;

    if (columns.some(c => c.name === k && !c.hidden)) return true;

    return false;
  }

  // column sort
  sort(col: Column | any) {
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

  sortBy(a: any, b: any, col: Column | any) {
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
    this.selected = item[this.id];
    this.rowDbClick.emit(item);
  }

  // validate component inputs
  validate() {
    if (this.columns) {
      MyLib.valid.validate(
        Array.isArray(this.columns),
        "'columns' is not an Array"
      );
    }

    MyLib.valid.validate(Array.isArray(this.data), "'data' is not an Array");

    if (this.actions) {
      MyLib.valid.validate(
        MyLib.valid.isObject(this.actions),
        "'actions' are not an Object"
      );
    }
  }
}
