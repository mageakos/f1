import { DetailsComponent } from './../core/components/details/details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriversListComponent } from './components/drivers-list/drivers-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/drivers',
    pathMatch: 'full'
  },
  {
    path: 'drivers',
    component: DriversListComponent
  },
  {
    path: 'drivers/add',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule {}
