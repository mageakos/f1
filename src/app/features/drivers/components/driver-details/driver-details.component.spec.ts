import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';

import { DriverDetailsComponent } from './driver-details.component';

import { DriversService } from '../../services/drivers.service';
import { GridService } from 'src/app/shared/services/grid/grid.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';
import { routes } from '../../../../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { DetailsComponent } from 'src/app/shared/components/details/details.component';
import { ListComponent } from 'src/app/shared/components/list/list.component';
import { ButtonGroupComponent } from 'src/app/shared/components/button-group/button-group.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { LabelComponent } from 'src/app/shared/components/label/label.component';
import { GridMeta } from 'src/app/shared/classes/models';
import { FormsModule } from '@angular/forms';

describe('DriverDetailsComponent', () => {
  let component: DriverDetailsComponent;
  let fixture: ComponentFixture<DriverDetailsComponent>;
  let service: DriversService;
  let gridService: GridService;
  let activeRoute: ActivatedRoute;
  let location: Location;
  let router: Router;

  const tetstData = [
    {
      id: 'driver1',
      familyName: 'siman',
    },
  ];

  const testRaces = [
    {
      season: '2018',
    },
    {
      season: '2019',
    },
  ];

  const testListMeta: GridMeta = {
    id: 'id',
    columns: [
      {
        name: 'name',
        column: 'Name',
        type: 'string',
        hidden: false,
        lastSorted: 1,
      },
    ],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DriverDetailsComponent,
        DetailsComponent,
        ListComponent,
        ButtonGroupComponent,
        LoaderComponent,
        LabelComponent,
        PageNotFoundComponent,
      ],
      imports: [FormsModule, RouterTestingModule.withRoutes(routes)],
    })
      .overrideComponent(DriverDetailsComponent, {
        set: {
          providers: [
            {
              provide: ActivatedRoute,
              useValue: {
                paramMap: new Observable<any>(),
              },
            },
            {
              provide: DriversService,
              useValue: {
                getById: (id) => new Observable<any>(),
                getDriverRaces: (id) => new Observable<any>(),
              },
            },
            {
              provide: GridService,
              useValue: {
                getColumns: (path) => new Observable<any>(),
              },
            },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDetailsComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(DriversService);
    gridService = fixture.debugElement.injector.get(GridService);
    activeRoute = fixture.debugElement.injector.get(ActivatedRoute);
    location = fixture.debugElement.injector.get(Location);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get driver\'s details data', () => {
    component.driverId = 'driver1';
    const spy = spyOn(service, 'getById').and.returnValue(of(tetstData));
    const spy2 = spyOn(service, 'getDriverRaces').and.returnValue(
      of(testRaces)
    );

    fixture.detectChanges();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.driverDetails).toEqual(tetstData[0]);

    expect(component.listOptions.data).toEqual(testRaces);
  });

  it('should navigate to 404 if no driver id is given', fakeAsync(() => {
    component.ngOnInit();

    fixture.detectChanges();

    tick(1000);

    expect(location.path()).toContain('/404');
  }));

  it('should get list columns', () => {
    const spy = spyOn(gridService, 'getColumns').and.returnValue(
      of(testListMeta)
    );

    component.initGrid();

    fixture.detectChanges();

    expect(component.listOptions.columns).toEqual(testListMeta.columns);
    expect(component.listOptions.id).toEqual(testListMeta.id);
  });

  it('#onDestrony should have flashed all subscriptions', () => {
    component.driverId = 'georgeSim';

    component.ngOnInit();
    fixture.detectChanges();

    component.ngOnDestroy();
    fixture.detectChanges();

    component._subs.forEach((s) => {
      expect(s.closed).toBe(true);
    });
  });

  it('#to404 should take tou to PageNotFoundComponent', fakeAsync(() => {
    component.to404();
    tick(1000);
    fixture.detectChanges();
    // tick(1000)

    expect(location.path()).toContain('/404');
  }));
});
