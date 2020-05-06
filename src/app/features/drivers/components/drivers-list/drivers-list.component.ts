import { Component, OnInit, OnDestroy } from '@angular/core';
import { DriversService } from '../../services/drivers.service';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { metaMap } from '../../classes/abstract-factory';
import { Subscription } from 'rxjs';
import { GridService } from 'src/app/shared/services/grid/grid.service';
import { ButtonGroup } from 'src/app/shared/classes/models';

@Component({
  selector: 'f1-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
})
export class DriversListComponent implements OnInit, OnDestroy {
  constructor(
    private service: DriversService,
    private gridService: GridService,
    private router: Router
  ) {}
  public data: any[];
  public driverActions: ButtonGroup;
  public columns: any[];
  public loading: boolean;

  // tslint:disable-next-line:variable-name
  public _subs: Subscription[] = [];

  ngOnInit() {
    // get Meta data on init
    this.initGrid();

    this.loading = true;

    this._subs.push(
      this.service
        .getAll()
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((res) => (this.data = res))
    );
  }

  initGrid() {
    const metaPath: string = metaMap.get('Drivers');

    if (metaPath) {
      this._subs.push(
        this.gridService.getColumns(metaPath).subscribe((res) => {
          this.columns = (res && res.columns) || [];
        })
      );
    }
  }

  viewDriver(data) {
    this.router.navigate(['drivers/' + data.driverId]);
  }

  ngOnDestroy() {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
