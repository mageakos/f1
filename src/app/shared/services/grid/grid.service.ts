import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { RequestService } from '../../../core/services/request/request.service';
import { GridMeta } from '../../classes/models';

// @Injectable({
//   providedIn: 'root'
// })
export class GridService {
  constructor(private requestService: RequestService) {}

  getColumns(metaPath: string): Observable<GridMeta> {
    return this.requestService.get<GridMeta>(metaPath).pipe(
      map(res => {
        return res;
      }),
      catchError(() => {
        return [];
      })
    );
  }
}
