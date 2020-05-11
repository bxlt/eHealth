import * as types from '../../actions/family_doctors/types'

export const INITIAL_STATE = {
  patients: null,
  patient: null,
  unfilledForms: null,
  unfilledForm: null,
  clinicians: [],
  clinician: null
}

const merge = (a, b) => Object.assign({}, a, b)

export const familyDoctorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_FAMILY_DOCTOR_PATIENTS: {
      return merge(state, { ...action.payload })
    }
    case types.SET_FAMILY_DOCTOR_PATIENT: {
      return merge(state, { ...action.payload })
    }
    case types.SET_FAMILY_DOCTOR_FORM: {
      return merge(state, { ...action.payload })
    }
    case types.SET_FAMILY_DOCTOR_CLINICIAN: {
      return merge(state, { ...action.payload })
    }
    case types.SEARCH_FAMILY_DOCTOR_PATIENTS: {
      return merge(state, { ...action.payload })
    }
    case types.GET_FAMILY_DOCTOR_UNFILLED_FORMS: {
      return merge(state, { ...action.payload })
    }
    case types.GET_CLINICIANS: {
      return merge(state, { ...action.payload })
    }
    case types.REQUEST_FORM:{
      return state
    }
    default:
      return state
  }
}
