import { TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';

import { GridService } from './grid.service';
import { GridMeta } from '../../classes/models';

describe('GridService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GridService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected res (HttpClient called once)', () => {
    const driverMeta: GridMeta = {
      id: 'driverId',
      columns: [
        {
          name: 'Name',
          column: 'driverName',
          hidden: false,
          type: 'string',
          lastSorted: 1,
        },
      ],
    };

    httpClientSpy.get.and.returnValue(fakeAsync(driverMeta));

    service.getColumns('/client-meta').subscribe(
      (res) => expect(res).toEqual(driverMeta, 'expected res'),
      (fail) => expect(fail).toContain('error')
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});

export function fakeAsync<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
