import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import { Icon, Button } from "semantic-ui-react";
import { Gender, GenderIcon, Patient, EntryFormValues, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import AddEntryModal from '../AddEntryModal';

const PatientsInfoPage: React.FC = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    React.useEffect(() => {
        const fetchPatientInfo = async (id: string) => {
            try {
                const { data: patient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`,
                );
                dispatch(setPatient(patient));
                closeModal();
            } catch (e) {
                console.error(e.response.data);
                setError(e.response.data.error);
            }
        };
        fetchPatientInfo(id)
    }, [id, dispatch])

    const patient = patients[id]

    const getGenderIcon = (): GenderIcon => {
        switch (patient.gender) {
            case Gender.Female:
                return GenderIcon.Female
            case Gender.Male:
                return GenderIcon.Male
            default:
                return GenderIcon.Other
        }
    }

    const addNewEntry = async (values: EntryFormValues) => {
        console.log(values)
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(setPatient(updatedPatient));

            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    }

    const identifyDiagnosis = (d: string) => {
    if (!diagnoses[d]) {
      return null;
    }

    const diagnosis = diagnoses[d];

    return (
        <span>{diagnosis.name}</span>
        );
    };

    const handleDiagnosisCodes = (entry: Entry) => {
        if (entry.diagnosisCodes === undefined || entry.diagnosisCodes.length === 0) {
        return null;
        }

        const codes = entry.diagnosisCodes;

        return (
        <div key={entry.id}>
            <ul>
            {codes.map(code => <li key={code}>{code}: {identifyDiagnosis(code)}</li>)}
            </ul>
        </div>
        );
    };

    if (patient && diagnoses) {
        return (
            <div>
                <h2>{patient.name}  <Icon name={getGenderIcon()} /></h2>
                <div>ssn: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={addNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <h3>entries</h3>
                    {patient.entries.map(e => (
                        <div key={e.id}>
                        {e.date} {e.description}
                        {handleDiagnosisCodes(e)}
                        </div>
                    ))}
                <div>
                    <Button onClick={() => openModal()}>Add New Entry</Button>
                </div>
            </div>
        )
    } else {
        return null
    }
};

export default PatientsInfoPage;
