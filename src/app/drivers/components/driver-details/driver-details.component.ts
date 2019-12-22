import { ButtonGroup } from "./../../../core/classes/models";
import { GridService } from "./../../../core/services/grid/grid.service";
import { DriversService } from "./../../services/drivers.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { metaMap } from "../../classes/abstract-factory";
import { Location } from "@angular/common";

@Component({
  selector: "app-driver-details",
  templateUrl: "./driver-details.component.html",
  styleUrls: ["./driver-details.component.scss"]
})
export class DriverDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private activeRoute: ActivatedRoute,
    private service: DriversService,
    private gridService: GridService,
    private location: Location,
    private router: Router
  ) {}

  public id: Observable<string>;
  public driverId: string;
  public driverDetails: any;

  //#region driver details
  // details
  public details = {
    data: {}
  };

  public isLoading = false;
  // grid
  public listOptions = {
    id: "index",
    isLoading: false,
    title: "Races",
    actions: [],
    data: [],
    sortable: true,
    columns: [],
    onClick: $e => {},
    onDblClick: $e => {},
    isReady: false
  };
  //#endregion driver details

  public buttonOptions: ButtonGroup = {
    buttons: [
      {
        text: "Back",
        icon: "fa fa-arrow-left",
        action: () => {
          this.location.back();
        },
        class: "mt-2 btn btn-danger"
      }
    ]
  };

  public _subs: Subscription[] = [];

  ngOnInit() {
    this.isLoading = true;

    // get id from url
    this._subs.push(
      this.activeRoute.paramMap.subscribe(data => {
        this.driverId = data.get("id");
      })
    );

    // if any try get data for this driver id
    if (this.driverId) {
      this.initGrid();

      this._subs.push(
        // get driver details
        this.service.getById(this.driverId).subscribe(data => {
          if (data && data.length > 0) {
            this.driverDetails = data[0];
            // then get driver race results
            this._subs.push(
              this.service
                .getDriverRaces(this.driverId)
                .pipe(
                  finalize(() => {
                    this.isLoading = false;
                  })
                )
                .subscribe(res => {
                  this.listOptions.data = res;
                  this.listOptions.isReady = true;
                })
            );
          } else {
            this.to404();
          }
        })
      );
    } else {
      this.to404();
    }
  }

  to404() {
    this.router.navigate([
      "404",
      {
        withMessage: "He didn't make it as a driver.."
      }
    ]);
  }

  initGrid() {
    const gridMetaPath: string = metaMap.get("Races");
    this.gridService.getColumns(gridMetaPath).subscribe(res => {
      this.listOptions.columns = res.columns;
      this.listOptions.id = res.id;
    });
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }
}
