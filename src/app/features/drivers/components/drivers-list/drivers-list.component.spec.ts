import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversListComponent } from './drivers-list.component';
import { DriversService } from '../../services/drivers.service';
import { GridService } from 'src/app/shared/services/grid/grid.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ListComponent } from 'src/app/shared/components/list/list.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { ButtonGroupComponent } from 'src/app/shared/components/button-group/button-group.component';

describe('DriversListComponent', () => {
  let component: DriversListComponent;
  let fixture: ComponentFixture<DriversListComponent>;
  let service: DriversService;
  const tetstData = [
    {
      id: 'driver1',
      familyName: 'siman',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DriversListComponent,
        ListComponent,
        LoaderComponent,
        ButtonGroupComponent,
      ],
    })
      .overrideComponent(DriversListComponent, {
        set: {
          providers: [
            {
              provide: DriversService,
              useValue: {
                getAll: () => new Observable<any>(),
              },
            },
            {
              provide: GridService,
              useValue: {
                getColumns: () => new Observable<any>(),
              },
            },
            {
              provide: Router,
              useValue: {
                navigate: () => 0,
                params: [],
              },
            },
          ],
        },
      })
      .compileComponents();
    //   .then(() => {
    //     fixture = TestBed.createComponent(DriversListComponent);
    //     component = fixture.componentInstance;
    //     service = fixture.debugElement.injector.get(DriversService);
    //   });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversListComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(DriversService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#viewDriver should go to driver component', () => {
    // todo test nav
    component.viewDriver('driverId');
    fixture.detectChanges();

    expect(true).toBeTruthy();
  });

  it('should get drivers data', () => {
    const spy = spyOn(service, 'getAll').and.returnValue(of(tetstData));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.data).toEqual(tetstData);
  });

  it('after onDestrony() should have flashed all subscriptions', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.ngOnDestroy();
    fixture.detectChanges();

    component._subs.forEach((s) => {
      expect(s.closed).toBe(true);
    });
  });
});
