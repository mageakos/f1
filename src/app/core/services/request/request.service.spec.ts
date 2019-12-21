import { TestBed } from "@angular/core/testing";
import { defer } from "rxjs";

import { RequestService } from "./request.service";

describe("RequestService", () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    service = new RequestService(<any>httpClientSpy);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return expected res (HttpClient called once)", () => {
    const expectedRes: any[] = [
      { id: 1, name: "George" },
      { id: 2, name: "Naya" }
    ];

    httpClientSpy.get.and.returnValue(fakeAsync(expectedRes));

    service.get("/clients").subscribe(
      res => expect(res).toEqual(expectedRes, "expected res"),
      fail => expect(fail).toContain("error")
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
  });
});

export function fakeAsync<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
