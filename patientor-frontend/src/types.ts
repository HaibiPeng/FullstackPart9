export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum GenderIcon {
  Male = "mars",
  Female = "venus",
  Other = "genderless"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName?: string;
  sickLeave?: { startDate: string; endDate: string };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: { date: string; criteria: string };
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export enum EntryFormTypes {
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck",
  }

export interface EntryFormValues {
  type: EntryFormTypes;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis["code"]>;
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  dischargeDate: string;
  dischargeCriteria: string;
}
