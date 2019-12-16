import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Driver, IEntityService } from "src/app/core/classes/models";
import { environment } from "src/environments/environment";
import { RequestService } from "src/app/core/services/request.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DriversService implements IEntityService<Driver> {
  constructor(private httpService: RequestService) {}

  get(): Observable<Driver> {
    let url = environment.APIUrl + "drivers";
    return this.httpService
      .get<Driver>(url);
      // .pipe(map(res => res.DriverTable.Drivers));
  }

  getAll(): Observable<any> {
    let url = environment.APIUrl + "f1/drivers.json";
    return this.httpService.get<any>(url).pipe(
      map(res => {
        return res.DriverTable.Drivers;
      })
    );
  }
}
