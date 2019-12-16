import { Component, OnInit } from '@angular/core';
import { DriversService } from '../../services/drivers.service';
import { ButtonGroup } from 'src/app/core/classes/models';
import { Router } from '@angular/router';
import { metaMap } from 'src/app/core/classes/abstract-factory';
import { GridService } from 'src/app/core/services/grid/grid.service';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements OnInit {
  public data: any[];
  public driverActions: ButtonGroup;
  public columns: any[];

  constructor(
    private service: DriversService,
    private gridService: GridService,
    private router: Router
  ) {}

  ngOnInit() {
    // get Meta data on init
    this.initGrid();

    this.initGridActions();

    this.service.getAll().subscribe(res => {
      this.data = res;
    });
  }

  initGrid() {
    const metaPath: string = metaMap.get('Drivers');
    if (metaPath) {
      this.gridService.getColumns(metaPath).subscribe(res => {
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
}
