import { DriversService } from './../../services/drivers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private activeRoute: ActivatedRoute,
    private service: DriversService
  ) {}

  public id: Observable<string>;
  public driverId: string;
  public driverDetails: any;

  //#region driver details
  public details = {
    data: {}
  };
  //#endregion driver details
  //#region list
  public listOptions = {
    isLoading: false,
    title: 'Races',
    data: [],
    columns: [],
    actions: [],
    onClick: $e => {},
    onDblClick: $e => {},
    isReady() {
      return !this.isLoading && this.data && this.data.length > 0;
    }
  };
  //#endregion list

  private notFound = false;

  ngOnInit() {
    // get id from url
    this.activeRoute.paramMap.subscribe(data => {
      this.driverId = data.get('id');
    });

    // if any try get data for this driver id
    if (this.driverId) {
      this.details.data = this.service
        .getById(this.driverId)
        .subscribe(data => {
          if (data && data.length > 0) {
            this.driverDetails = data[0];
          } else {
            alert('driver not found');
          }
        });
      this.service.getById(this.id).pipe(
        take(1),
        map(data => {
          console.log(data);
        })
      );
    } else {
      this.notFound = true;
    }
    console.log(this.id);
  }

  ngOnDestroy(): void {}
}
