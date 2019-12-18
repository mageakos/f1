import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversListComponent } from './components/drivers-list/drivers-list.component';
import { CoreModule } from '../core/core.module';
import { DriversRoutingModule } from './drivers-routing.module';
import { DriversService } from './services/drivers.service';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DriversRoutingModule
  ],
  declarations: [
    DriversListComponent,
    DriverDetailsComponent
  ],
  providers: [DriversService]
})
export class DriversModule {}
