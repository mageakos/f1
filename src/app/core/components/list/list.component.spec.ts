// import { async, ComponentFixture, TestBed } from "@angular/core/testing";

// import { ListComponent } from "./list.component";
// import { LabelComponent } from "../../widgets/label/label.component";
// import { ButtonGroupComponent } from '../../widgets/button-group/button-group.component';

// describe("ListComponent", () => {
//   let component: ListComponent;
//   let fixture: ComponentFixture<ListComponent>;
//   const testData = ["george", "nick", "stas", "kuriakos", "george"];

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ListComponent, ButtonGroupComponent]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });

//   it("should render title in a h1 tag", () => {
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector("h1").textContent).toContain(component.title);
//   });

//   it("#filterChanged should filter data by new val", () => {
//     const myFilter = "george";
//     component.filterChanged(myFilter);

//     component.filteredData.forEach(i => {
//       expect(i.indexOf(myFilter)).toBeGreaterThan(-1);
//     });
//   });

//   it("#setFilteredData should return new array", () => {
//     let newArray = component.setFilteredData(testData);
//     newArray[0] = "testSubject";
//     console.log(newArray[0]);
//     console.log(testData[0]);
//     expect(newArray[0]).not.toEqual(testData[0]);
//   });

//   it("#filterBy should have result with length = 2", () => {
//     component.filterable = true; // enable filtering

//     let res = component.filterbyVal(testData, "george");

//     expect(res.length).toEqual(2);
//   });
// });
