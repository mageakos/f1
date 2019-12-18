import { DriverResponse } from './../classes/models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntityService } from 'src/app/core/classes/models';
import { environment } from 'src/environments/environment';
import { RequestService } from 'src/app/core/services/request/request.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriversService implements IEntityService<DriverResponse> {
  constructor(private httpService: RequestService) {}

  get(): Observable<DriverResponse> {
    const url = environment.APIUrl + 'drivers';
    return this.httpService.get<DriverResponse>(url);
  }

  getById(id): Observable<any> {
    const url = environment.APIUrl + 'f1/drivers/' + id + '.json';
    return this.httpService.get<DriverResponse>(url).pipe(
      map(res => {
        return res.DriverTable.Drivers;
      })
    );
  }

  getAll(): Observable<any> {
    const url = environment.APIUrl + 'f1/drivers.json';
    return this.httpService.get<DriverResponse>(url).pipe(
      map(res => {
        return res.DriverTable.Drivers;
      })
    );
  }
}
