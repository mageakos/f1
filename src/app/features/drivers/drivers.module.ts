import { NgModule } from '@angular/core';
import { DriversRoutingModule } from './drivers-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { DriversService } from './services/drivers.service';
import { DriversComponent } from './drivers.component';
import { DriversListComponent } from './components/drivers-list/drivers-list.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';

@NgModule({
  declarations: [DriversComponent, DriverDetailsComponent, DriversListComponent],
  imports: [SharedModule, DriversRoutingModule],
  providers: [DriversService],
})
export class DriversModule {}
