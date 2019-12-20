import { IButton, IButtonGroup, ButtonGroup } from './../../../core/classes/models';
import { GridService } from './../../../core/services/grid/grid.service';
import { DriversService } from './../../services/drivers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { metaMap } from '../../classes/abstract-factory';
import {Location} from '@angular/common';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private activeRoute: ActivatedRoute,
    private service: DriversService,
    private gridService: GridService,
    private location: Location

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
    id: 'index',
    isLoading: false,
    title: 'Races',
    actions: [],
    data: [],
    sortable: true,
    columns: [],
    onClick: $e => {},
    onDblClick: $e => {},
    isReady: false
  };
  //#endregion driver details

  private notFound = false;

  public buttonOptions: ButtonGroup = {
    buttons: [
      {
        text: 'Back',
        icon: 'fa fa-arrow-left',
        action: () => {
          this.location.back();
        },
        class: 'mt-2 btn btn-danger'
      }
    ]
  };

  ngOnInit() {
    this.isLoading = true;

    // get id from url
    this.activeRoute.paramMap.subscribe(data => {
      this.driverId = data.get('id');
    });

    // if any try get data for this driver id
    if (this.driverId) {
      // get driver details
      this.service.getById(this.driverId).subscribe(data => {
        if (data && data.length > 0) {
          this.driverDetails = data[0];
          // then get driver race results
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
            });
        } else {
          alert('driver not found');
        }
      });

      // this.service.getById(this.id).pipe(
      //   take(1),
      //   map(data => {
      //     console.log(data);
      //   })
      // );
    } else {
      this.notFound = true;
    }
    this.initGrid();
  }

  initGrid() {
    const gridMetaPath: string = metaMap.get('Races');
    this.gridService.getColumns(gridMetaPath).subscribe(res => {
      this.listOptions.columns = res.columns;
      this.listOptions.id = res.id;
    });
  }

  ngOnDestroy(): void {}
}
