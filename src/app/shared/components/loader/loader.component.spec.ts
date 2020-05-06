import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loader', () => {
    component.loading = true;
    fixture.detectChanges();

    const divElement: HTMLElement = fixture.nativeElement;
    const loaderDiv = divElement.querySelector('.spinner-border');

    expect(loaderDiv).toBeTruthy();
  });

  it('should not display loader', () => {
    component.loading = false;
    fixture.detectChanges();

    const divElement: HTMLElement = fixture.nativeElement;
    const loaderDiv = divElement.querySelector('.spinner-border');

    expect(loaderDiv).toBeFalsy();
  });
});
