import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  constructor(private requestService: RequestService) {}

  getColumns(metaPath: string): Observable<any> {
    return this.requestService.get<any>(metaPath).pipe(
      map(res => {
        res.columns.forEach(col => {
          switch (col.valueFormatter) {
            case 'date':
              col.valueFormatter = data => {
                return new Date(data.value).toLocaleDateString();
              };
              break;
            default:
              return col;
          }
        });
        return res;
      }),
      catchError(() => {
        return [];
      })
    );
  }
}
