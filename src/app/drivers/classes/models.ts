export class MRRepsonse {
  MRData: any;
}

export class DriverResponse {
  DriverTable: DriverTable;
}
export class DriverTable {
  Drivers: Driver[];
}

export class Driver {
  driverId: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  url: string;
}
