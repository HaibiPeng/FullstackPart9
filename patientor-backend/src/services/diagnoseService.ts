/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import diagnoses from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getEntries = ():DiagnoseEntry[] => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
    getEntries,
    addEntry
};