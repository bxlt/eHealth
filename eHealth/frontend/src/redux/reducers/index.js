import { combineReducers } from 'redux'

import { clinicianReducer } from './clinician'
import { familyDoctorReducer } from './family_doctor'

const reducer = combineReducers({
  clinician: clinicianReducer,
  familyDoctor: familyDoctorReducer
})

export default reducer
