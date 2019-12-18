import { Component, OnInit } from '@angular/core';
import { DriversService } from '../../services/drivers.service';
import { ButtonGroup } from 'src/app/core/classes/models';
import { Router } from '@angular/router';
import { GridService } from 'src/app/core/services/grid/grid.service';
import { finalize, map } from 'rxjs/operators';
import { metaMap } from '../../classes/abstract-factory';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements OnInit {
  public data: any[];
  public driverActions: ButtonGroup;
  public columns: any[];
  public loading: boolean;

  constructor(
    private service: DriversService,
    private gridService: GridService,
    private router: Router
  ) {}

  ngOnInit() {
    // get Meta data on init
    this.initGrid();

    this.initGridActions();

    this.loading = true;
    this.service
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(res => (this.data = res));
  }

  initGrid() {
    const metaPath: string = metaMap.get('Drivers');

    if (metaPath) {
      this.gridService
        .getColumns(metaPath)
        .pipe(
          finalize(() => {
            if (!Array.isArray(this.columns) || this.columns.length === 0) {
              console.warn('no columns found');
            }
          })
        )
        .subscribe(res => {
          this.columns = (res && res.columns) || [];
        });
    }
  }

  initGridActions() {
    this.driverActions = {
      buttons: [
        {
          text: 'add',
          icon: 'fa fa-plus',
          action: () => {
            this.router.navigate(['/drivers/add']);
          }
        }
      ]
    };
  }

  viewDriver(data) {
    this.router.navigate(['/driver/' + data.driverId]);
    console.log(data);
  }
}
