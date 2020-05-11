import * as types from './types'
import { request } from '../../../api'

export const getFamilyDoctorPatients = () => async dispatch => {
  const requestUrl = `/api/v1/family_doctor/patients`
  const { response } = await request(requestUrl, 'GET')

  dispatch({
    type: types.GET_FAMILY_DOCTOR_PATIENTS,
    payload: { patients: response.patients }
  })
}

export const setPatient = patient => async dispatch => {
  dispatch({
    type: types.SET_FAMILY_DOCTOR_PATIENT,
    payload: { patient }
  })
}
export const setForm = unfilledForm => async dispatch => {
  dispatch({
    type: types.SET_FAMILY_DOCTOR_FORM,
    payload: { unfilledForm }
  })
}
export const setClinician = clinician => async dispatch => {
  dispatch({
    type: types.SET_FAMILY_DOCTOR_CLINICIAN,
    payload: { clinician }
  })
}


export const searchFamilyDoctorPatients = query => async dispatch => {
  const body = {
    query: query.target.value
  }
  const requestUrl = `/api/v1/family_doctor/patients/search`
  const { response} = await request(requestUrl, 'POST', body)
  dispatch({
    type: types.SEARCH_FAMILY_DOCTOR_PATIENTS,
    payload: { patients: response.patients }
  })
}

export const getUnfilledForms = () => async dispatch => {
  const requestUrl = `/api/v1/family_doctor/unfilled_forms`
  const { response} = await request(requestUrl, 'GET')
  dispatch({
    type: types.GET_FAMILY_DOCTOR_UNFILLED_FORMS,
    payload: { unfilledForms: response.unfilled_forms }
  })
}

export const getClinicians = () => async dispatch => {
  const requestUrl = `/api/v1/family_doctor/clinicians`
  const { response } = await request(requestUrl, 'GET')
  dispatch({
    type: types.GET_CLINICIANS,
    payload: { clinicians: response.clinicians }
  })
}

export const requestForm = () => async (dispatch, getState) => {
  const {
    unfilledForm,
    clinician,
    patient,
  } = getState().familyDoctor
  const filledForm = {
    clinician_id: clinician.id,
    patient_id: patient.id,
    unfilled_form_id: unfilledForm.id
  }
  const requestUrl = `/api/v1/family_doctor/filled_forms`
  const { success } = await request(requestUrl, 'POST', filledForm)
  if (success) {
    alert('Your request has been submitted')
    dispatch({
      type: types.REQUEST_FORM
    })
  }
}
