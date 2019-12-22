import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListComponent } from "./list.component";
import { LabelComponent } from "../../widgets/label/label.component";
import { ButtonGroupComponent } from "../../widgets/button-group/button-group.component";
import { ArrayExt } from "../../classes/array.ext";
import { Column } from "../../classes/models";

describe("ListComponent", () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let testData = [
    { id: 1, name: "george" },
    { id: 2, name: "nick" },
    { id: 3, name: "stas" },
    { id: 4, name: "kuriakos" },
    { id: 5, name: "george" }
  ];
  const testColumns = [
    { name: "name", column: "Name", hidden: false },
    { name: "id", column: "Id", hidden: false }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, ButtonGroupComponent],
      imports: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render title in a h1 tag", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(component.title);
  });

  it("#getFilteredArray should return array with length == 2", () => {
    component.filterable = true;
    fixture.detectChanges();

    const myFilter = "George";

    var res = component.getFilteredArray(testData, myFilter, [], []);

    expect(res.length).toEqual(2);
  });

  it("#keyIsFilterableColumn should get if column is available for filtering", () => {
    let filterableColumn = new Column();
    filterableColumn.name = "name";
    filterableColumn.hidden = false;

    let nonFilterableColumn = new Column();
    nonFilterableColumn.name = "id";
    nonFilterableColumn.hidden = true; // should not filter
    var arr = [filterableColumn, nonFilterableColumn];

    let isFilterable = component.keyIsFilterableColumn(
      arr,
      filterableColumn.name
    );

    let isNotFilterable = component.keyIsFilterableColumn(
      arr,
      nonFilterableColumn.name
    );

    expect(isFilterable).toBeTruthy();
    expect(isNotFilterable).toBeFalsy();
  });

  it("row clicked should habve been called1", () => {
    component.columns = testColumns;
    component.data = testData;
    component.filteredData = testData;
    component.id = "id";

    spyOn(component, "rowClicked");

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const tr = compiled.querySelector(".my-list-row");
    tr.dispatchEvent(new Event("click"));

    expect(component.rowClicked).toHaveBeenCalled();
  });

  it("row double habve been called1", () => {
    component.columns = testColumns;
    component.data = testData;
    component.filteredData = testData;
    component.id = "id";

    spyOn(component, "rowDbClicked");

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const tr = compiled.querySelector(".my-list-row");
    tr.dispatchEvent(new Event("dblclick"));

    expect(component.rowDbClicked).toHaveBeenCalled();
  });

  it("should return item id", () => {
    component.id = "id";
    fixture.detectChanges();
    const res = component.trackFn(1, { id: "george" });
    expect(res).toEqual("george");
  });

  it("should return item id", () => {
    component.id = "id";
    fixture.detectChanges();
    const res = component.trackFn(1, { name: "george" });
    expect(res).toEqual(1);
  });

  it("should sort columns", () => {
    component.columns = testColumns;
    component.filteredData = testData;
    component.id = "id";
    component.sortable = true;

    fixture.detectChanges();

    let firstCol = component.filteredData[0];

    const idCol = component.columns.filter(x => x.name == "id");

    component.sort(idCol);

    expect(component.filteredData[0]).not.toEqual(firstCol);
  });

  it("should sort by desc", () => {
    // assume the are sorted by asc
    let a = { id: 1 };
    let b = { id: 2 };
    let column = { name: "id", lastSorted: -1 };
    let res = component.sortBy(a, b, column);

    expect(res).toEqual(1);
  });

  it("should sort by asc", () => {
    // assume the are sorted by asc
    let a = { id: 1 };
    let b = { id: 2 };
    let column = { name: "id", lastSorted: 1 };
    let res = component.sortBy(a, b, column);

    expect(res).toEqual(-1);
  });

  it("#filterChanged should have been called ", () => {
    spyOn(component, "filterChanged");
    component.filterable = true;
    fixture.detectChanges();

    const inputElement: HTMLElement = fixture.nativeElement;
    const inp = inputElement.querySelector("#my-list-filter");

    expect(inp).toBeTruthy();

    inp.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.filterChanged).toHaveBeenCalled();
  });

  it("#validateAndSetId should set Id", () => {
    component.id = "id";

    let arr = component.validateAndSetId(testData, component.id);
    arr.forEach(element => {
      expect(element["id"]).toBeTruthy();
    });
  });
});
