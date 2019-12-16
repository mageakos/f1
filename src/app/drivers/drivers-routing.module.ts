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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule {}
