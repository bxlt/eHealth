import * as types from '../../actions/clinicians/types'

export const INITIAL_STATE = {
  patient: null,
  // clinician/pending
  filledForms: [],
  filledFormsCopy: [],

  // clinician/filled_forms
  filledFormId: null,
  filledForm: {},
  unfilledFormId: null,
  sections: [],

  // clinician/completed_forms
  completedForms: [],
  completedFormsCopy: [],

  questions: {},
  subsections: {},
  answers: {},
  prefilledAnswers: {}
}

const merge = (a, b) => Object.assign({}, a, b)

export const clinicianReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_PATIENT: {
      return merge(state, { ...action.payload })
    }
    case types.SET_FILLED_FORM_ID: {
      return merge(state, { ...action.payload })
    }
    case types.GET_UNFILLED_FORM: {
      return merge(state, { ...action.payload })
    }
    case types.GET_QUESTIONS: {
      return {
        ...state,
        questions: { ...state.questions, ...action.payload.questions }
      }
    }
    case types.GET_SUBSECTIONS: {
      return {
        ...state,
        subsections: { ...state.subsections, ...action.payload.subsections }
      }
    }
    case types.SET_ANSWERS: {
      return {
        ...state,
        answers: { ...state.answers, ...action.payload.answers }
      }
    }
    case types.SUBMIT_ANSWERS: {
      return merge(state, { ...action.payload })
    }
    case types.SUBMIT_FORM: {
      return state
    }
    case types.GET_FILLED_FORMS: {
      return merge(state, { ...action.payload })
    }
    case types.GET_FILLED_FORM_ANSWERS: {
      return merge(state, { ...action.payload })
    }
    case types.GET_COMPLETED_FORMS: {
      return merge(state, { ...action.payload })
    }
    case types.SET_FILLED_FORM: {
      return merge(state, { ...action.payload })
    }
    default:
      return state
  }
}
