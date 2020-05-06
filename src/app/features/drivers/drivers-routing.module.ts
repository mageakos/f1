import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { DetailsComponent } from '../../shared/components/details/details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriversListComponent } from './components/drivers-list/drivers-list.component';

const routes: Routes = [
  {
    path: '',
    component: DriversListComponent,
  },
  {
    path: ':id',
    component: DriverDetailsComponent,
  },
  {
    path: 'drivers/add',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversRoutingModule {}
