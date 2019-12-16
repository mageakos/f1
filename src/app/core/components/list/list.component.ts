import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  @Input() entity: string = "entity";
  @Input() list: any[] = [];
  @Input() actionOptions: any[] = [];
  public selected: string = "";

  constructor() {}

  ngOnInit() {
    this.list = [
      { id: 1, name: "geo" },
      { id: 2, name: "naya" }
    ];
  }

  trackFn(index, item) {
    return (item && item.driverId) || index;
  }

  rowClicked(item) {
    console.log(item);
    this.selected = item.driverId;
  }
}
