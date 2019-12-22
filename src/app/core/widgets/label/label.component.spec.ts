import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LabelComponent } from "./label.component";
import { FormsModule } from "@angular/forms";

describe("LabelComponent", () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("#modelChanged should have been called ", () => {
    spyOn(component, "modelChanged");

    component.label = "label";
    component.id = "my-label";
    component.mode = "edit";

    fixture.detectChanges();

    const inputElement: HTMLElement = fixture.nativeElement;
    const inp = inputElement.querySelector("#my-label");

    inp.dispatchEvent(new Event("ngModelChange"));

    expect(component.modelChanged).toHaveBeenCalled();
  });

  it("should get givenId", () => {
    component.id = "myId";
    fixture.detectChanges();

    const resId = component.getId();

    expect(resId).toEqual(component.id);
  });

  it("should get givenId", () => {
    component.id = undefined;

    fixture.detectChanges();

    const resId = component.getId();

    expect(resId).toBeTruthy();
  });
});
