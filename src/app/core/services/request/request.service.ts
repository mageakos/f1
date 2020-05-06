import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { MRRepsonse } from 'src/app/features/drivers/classes/models';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {}

  get<T>(url): Observable<T> {
    return this.http.get<any>(url).pipe(
      map(res => this.mapRes(res)),
      catchError(err => this.errorHandler(err))
    );
  }

  mapRes(res: any) {
    if (!res) {
      throw Error('no response');
    }
    if (res && res.status === 'error') {
      throw Error(res.error);
    }
    // api data
    if (res instanceof MRRepsonse || res.hasOwnProperty('MRData')) {
      return res.MRData;
    }
    // other / local data
    return res;
  }

  errorHandler(error: HttpErrorResponse) {
    // this.notifier.notify("error", error.message || "server error.");
    return throwError(error);
  }
}
