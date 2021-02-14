import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

patientRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatientById(id));
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
      
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message); 
  }
});

patientRouter.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body)
        const id = req.params.id
        const addedEntry = patientService.addEntry(id, newEntry)
        addedEntry ? res.json(addedEntry) : res.status(404)
    } catch (e) {
        res.status(400).send(e.message);
    }
})

export default patientRouter;