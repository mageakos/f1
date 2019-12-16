import { Component, OnInit } from "@angular/core";
import { DriversService } from "../../services/drivers.service";
import { Observable } from "rxjs";
import { Driver } from "src/app/core/classes/models";

@Component({
  selector: "app-drivers-list",
  templateUrl: "./drivers-list.component.html",
  styleUrls: ["./drivers-list.component.scss"]
})
export class DriversListComponent implements OnInit {
  public drivers: any[];

  constructor(private service: DriversService) {}

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.drivers = res;
    });
  }
}
