export interface Incident {
  key?: string;
  id?: string;
  natureOfIncident: string;
  locationOfIncident: string;
  weatherCondition: string;
  date: Date | string;
  switchingOfficer: string;
  Logs: Log[];
  closed: string;
}

export interface Log {
  id?: number | string;
  nameOfPersonVisiting: string;
  reasonForAttendance: string;
  protectiveClothingWorn: string;
  officerCompletingLog: string;
  weatherCondition: string;
  date: Date | string;
}
