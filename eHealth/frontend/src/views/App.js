import React from 'react'
import { Switch, Route } from 'react-router'
import '../assets/scss/main.scss'
import Header from '../components/common/Header'

import Landing from '../views/landing/Landing'

// Clinician Screens
import ClinicianMainScreen from './clinician/ClinicianMainScreen'
import PatientListingScreen from './clinician/existing/PatientListingScreen'
import FilledFormScreen from './clinician/existing/FilledFormScreen'

// Form Uploader Screens
import FormUploaderMainScreen from './form_uploader/FormUploaderMainScreen'
import UploaderScreen from './form_uploader/upload/UploaderScreen'

// Family Doctor Screens
import FamilyDoctorMainScreen from './family_doctor/FamilyDoctorMainScreen'
import UploadedScreen from './form_uploader/uploaded/UploadedScreen'
import ViewFormScreen from './common/ViewFormScreen'
import CompletedFormScreen from './common/CompletedFormScreen'
import RequestPatientList from './family_doctor/request_form/RequestPatientList'
import RequestFormList from './family_doctor/request_form/RequestFormList'
import ClinicianList from './family_doctor/request_form/ClinicianList'
import ConfirmScreen from './family_doctor/request_form/ConfirmScreen'

export default function App() {
  return (
    <div>
      <Header></Header>
      <div data-testid="container" className="container">
        <Switch>
          <Route path="/clinician/pending">
            <PatientListingScreen />
          </Route>
          <Route path="/clinician/filled_form">
            <FilledFormScreen />
          </Route>
          <Route path="/clinician/completed_forms">
            <ViewFormScreen />
          </Route>
          <Route path="/clinician/completed_form">
            <CompletedFormScreen />
          </Route>
          <Route path="/clinician">
            <ClinicianMainScreen />
          </Route>
          <Route path="/form_uploader/uploaded">
            <UploadedScreen />
          </Route>
          <Route path="/form_uploader/upload">
            <UploaderScreen />
          </Route>
          <Route path="/form_uploader">
            <FormUploaderMainScreen />
          </Route>
          <Route path="/family_doctor/patients/forms/clinicians/confirm">
            <ConfirmScreen />
          </Route>
          <Route path="/family_doctor/patients/forms/clinicians">
            <ClinicianList />
          </Route>
          <Route path="/family_doctor/patients/forms">
            <RequestFormList />
          </Route>
          <Route path="/family_doctor/patients">
            <RequestPatientList />
          </Route>
          <Route path="/family_doctor/completed_forms">
            <ViewFormScreen />
          </Route>
          <Route path="/family_doctor/completed_form">
            <CompletedFormScreen />
          </Route>
          <Route path="/family_doctor">
            <FamilyDoctorMainScreen />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
