import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'drivers',
    loadChildren: () =>
      import('./features/drivers/drivers.module').then((m) => m.DriversModule),
  },
  { path: '**', component: PageNotFoundComponent, data: { withMessage: '' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
