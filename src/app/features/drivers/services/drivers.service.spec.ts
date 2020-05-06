import { TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import { DriversService } from './drivers.service';
import { DriverTable, Driver, DriverResponse } from '../classes/models';

describe('DriversService', () => {
  let requestServiceSpy: { get: jasmine.Spy };
  let service: DriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    requestServiceSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new DriversService(requestServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected res (HttpClient called once)', () => {
    const driverTable: DriverTable = {
      Drivers: [
        {
          driverId: 'georgeSiman',
          givenName: 'George',
          dateOfBirth: '07-09-1989',
          familyName: 'Siman',
          nationality: 'GR',
          url: 'myurl',
        },
      ],
    };

    const driverResponse: DriverResponse = {
      DriverTable: driverTable,
    };

    requestServiceSpy.get.and.returnValue(fakeAsync(driverResponse));

    service.get().subscribe(
      (res) => expect(res).toEqual(driverResponse, 'expected res'),
      (fail) => expect(fail).toContain('error')
    );
    expect(requestServiceSpy.get.calls.count()).toBe(1, 'one call');
  });
});

export function fakeAsync<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
