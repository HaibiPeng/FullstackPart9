import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry, NewEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
  return patients.map(({ id, dateOfBirth, name, gender, occupation, entries }) => ({
    id, dateOfBirth, name, gender, occupation, entries
  }));
};

const getPatientById = ( id: String ): PatientEntry | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): PatientEntry | undefined => {
    const patient = patients.find(patient => patient.id == id)
    if (patient) {
        const newEntry = {
            id: uuidv4(),
            ...entry
        }
        patient.entries.push(newEntry)
    }
    return patient;
}

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getPatientById,
    addEntry,
};