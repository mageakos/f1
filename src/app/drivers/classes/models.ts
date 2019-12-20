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

export class RaceResponse {
  RaceTable: RaceTable;
}

export class RaceTable {
  Races: Race[];
}

export class Race {
  season: number; // year
  round: number;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  result: any[];
  dateOfBirth: string;
  nationality: string;
}

export class Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: any;
}
