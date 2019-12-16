import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

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

  // post<T>(url: string, data: any): Observable<T> {
  //   return this.http.post<T>(url, data).pipe(
  //     map(res => this.mapRes(res)),
  //     catchError(err => this.errorHandler(err))
  //   );
  // }

  // put(url: string, data: any): Observable<any> {
  //   return this.http.put<any>(url, data).pipe(
  //     map(res => this.mapRes(res)),
  //     catchError(err => this.errorHandler(err))
  //   );
  // }

  // delete(url: string): Observable<any> {
  //   return this.http.delete<any>(url).pipe(
  //     map(res => this.mapRes(res)),
  //     catchError(err => this.errorHandler(err))
  //   );
  // }

  mapRes(res: any) {
    if (res && res.status === 'error') {
      throw Error(res.error);
    }
    return res.MRData;
  }

  errorHandler(error: HttpErrorResponse) {
    // this.notifier.notify("error", error.message || "server error.");
    return throwError(error);
  }
}
