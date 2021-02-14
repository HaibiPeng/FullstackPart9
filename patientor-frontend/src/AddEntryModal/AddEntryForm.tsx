import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from '../state';

import { TextField, DiagnosisSelection, SelectField } from "../AddPatientModal/FormField";
import { EntryFormValues, HealthCheckRating, EntryFormTypes } from '../types';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: any[] = [
    { value: "HealthCheck", label: "Health check" },
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "Occupational Healthcare" }
];

const healthCheckRatingOption: any = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low risk" },
    { value: HealthCheckRating.HighRisk, label: "High risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical risk" }
]

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue()
    return (
        <Formik
            initialValues={{
                type: EntryFormTypes.HealthCheck,
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: 0,
                employerName: "",
                sickLeaveStartDate: "",
                sickLeaveEndDate: "",
                dischargeDate: "",
                dischargeCriteria: ""
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                return errors;
            }}
        >
            {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <SelectField
                            label="Type"
                            name="type"
                            options={entryTypeOptions}
                        />
                        {values.type === "HealthCheck" ?
                            <SelectField
                                options={healthCheckRatingOption}
                                label="Health Check Rating Option"
                                name="healthCheckRating"
                            /> : null}
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        {values.type === "OccupationalHealthcare" ?

                            <div>
                                { }
                                <Field
                                    label="Employer Name "
                                    placeholder="Employer Name"
                                    name="employerName"
                                    component={TextField}
                                />
                                <Field
                                    label="Start Date of Sick Leave"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.startDate "
                                    component={TextField}
                                />
                                <Field
                                    label="End Date of Sick Leave"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.endDate "
                                    component={TextField}
                                />
                            </div> : null}
                        {values.type === "Hospital" ?
                            <div>
                                < Field
                                    label="Discharge date"
                                    placeholder="YYYY-MM-DD"
                                    name="discharge.date"
                                    component={TextField}
                                /> <Field
                                    label="Discharge criteria"
                                    placeholder="Criteria"
                                    name="discharge.criteria"
                                    component={TextField}
                                />
                            </div>
                            : null}
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)} />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >Add </Button>
                            </Grid.Column>
                        </Grid>

                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;