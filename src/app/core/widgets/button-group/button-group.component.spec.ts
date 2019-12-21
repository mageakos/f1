import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonGroupComponent } from "./button-group.component";
import { Button } from "../../classes/models";

describe("ButtonGroupComponent", () => {
  let component: ButtonGroupComponent;
  let fixture: ComponentFixture<ButtonGroupComponent>;
  let count = 0;
  const btn: Button = {
    text: "add",
    class: "btn btn-primary",
    icon: "fa fa-add",
    id: "my-button",
    action: () => {
      count++;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonGroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    count = 0;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get a string parameter and return string", () => {
    let text = "Add";
    expect(component.getButtonValue(text, "text")).toEqual("Add");
  });

  it("should get a function parameter and return a string", () => {
    let generateTextFn = () => {
      return "Remove";
    };
    expect(component.getButtonValue(generateTextFn, "text")).toEqual("Remove");
  });

  it("should get a undefined parameter and return default", () => {
    let generateTextFn;
    expect(component.getButtonValue(generateTextFn, "Default Value")).toEqual(
      "Default Value"
    );
  });

  it("should get button's id", () => {
    expect(component.getId(btn)).toEqual("my-button");
  });

  it("should get call btn.action on click", () => {
    component.invokeBtnAction(btn);
    expect(count).toEqual(1);
  });

  it("button click should have invoked component.invokeBtnAction", () => {
    spyOn(component, "invokeBtnAction");

    component.options = {
      buttons: [btn]
    };

    fixture.detectChanges();

    const inputElement: HTMLElement = fixture.nativeElement;
    const inp = inputElement.querySelector("#my-button");

    inp.dispatchEvent(new Event("click"));

    expect(component.invokeBtnAction).toHaveBeenCalled();
  });

  it("should validate component options", () => {
    component.options = {
      buttons: [btn]
    };

    fixture.detectChanges();

    expect(component.validate()).toEqual(true);
  });
});
