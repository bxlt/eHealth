import * as types from './types'
import { request } from '../../../api'

export const setPatient = patient => async dispatch => {
  dispatch({
    type: types.SET_PATIENT,
    payload: { patient }
  })
}

export const setFilledForm = filledForm => async dispatch => {
  const newFilledform = (({
    clinician_id,
    created_at,
    patient_id,
    unfilled_form_id,
    status,
    id
  }) => ({
    clinician_id,
    created_at,
    patient_id,
    unfilled_form_id,
    status,
    id
  }))(filledForm)

  dispatch({
    type: types.SET_FILLED_FORM,
    payload: { filledForm: newFilledform }
  })
}

export const setFormIds = (filledFormId, unfilledFormId) => async dispatch => {
  dispatch({
    type: types.SET_FILLED_FORM_ID,
    payload: { filledFormId, unfilledFormId }
  })
}

export const fetchUnfilledForm = () => async (dispatch, getState) => {
  const { unfilledFormId } = getState().clinician
  const requestUrl = `/api/v1/clinician/unfilled_forms/${unfilledFormId}`
  const { response, success } = await request(requestUrl, 'GET')

  if (success) {
    dispatch({
      type: types.GET_UNFILLED_FORM,
      payload: { sections: response.sections }
    })
  }
}

export const fetchQuestions = sectionId => async (dispatch, getState) => {
  const { unfilledFormId } = getState().clinician
  const requestUrl = `/api/v1/clinician/unfilled_forms/${unfilledFormId}/questions/${sectionId}`
  const { response, success } = await request(requestUrl, 'GET')

  if (success) {
    const allQuestions = []
    // DFS to get all of the questions including nested questions.
    const stack = [...response.questions]
    while (stack.length > 0) {
      let question = stack.pop()
      allQuestions.push(question)
      if (question.question_type === 'MultiChoice') {
        if (question.has_follow_up_flag === true) {
          let parent_id = question.id
          let { response: r, success: s } = await request(
            `/api/v1/clinician/unfilled_forms/${unfilledFormId}/nested_questions/${parent_id}`,
            'GET'
          )
          if (s) {
            let child_questions = r.questions
            child_questions = child_questions.map(child => {
              let parent_value =
                question.options[child.follow_up_to_option].value
              // adding new parameters to keep track of parent_id and parent_value
              return {
                ...child,
                parent_id: parent_id,
                parent_value: parent_value
              }
            })
            stack.push(...child_questions)
          }
        }
      }
    }
    allQuestions.sort((a, b) => a.id - b.id)
    dispatch({
      type: types.GET_QUESTIONS,
      payload: { questions: { [sectionId]: allQuestions } }
    })
  }
}

export const fetchSubsections = sectionId => async (dispatch, getState) => {
  const { unfilledFormId } = getState().clinician
  const requestUrl = `/api/v1/clinician/unfilled_forms/${unfilledFormId}/subsections/${sectionId}`
  const { response, success } = await request(requestUrl, 'GET')

  if (success) {
    dispatch({
      type: types.GET_SUBSECTIONS,
      payload: { subsections: { [sectionId]: response.subsections } }
    })
  }
}

export const setAnswersStore = answers => async dispatch => {
  dispatch({
    type: types.SET_ANSWERS,
    payload: { answers: answers }
  })
}

export const submitAnswers = () => async (dispatch, getState) => {
  const {
    unfilledFormId,
    answers,
    patient,
    filledFormId
  } = getState().clinician
  const filledForm = {
    unfilled_form_id: unfilledFormId,
    patient_id: patient !== undefined ? patient.id : undefined,
    answers: answers,
    final_submit: false
  }
  const requestUrl = `/api/v1/clinician/filled_forms/${filledFormId}`
  const { response, success } = await request(requestUrl, 'PUT', filledForm)
  if (success) {
    dispatch({
      type: types.SUBMIT_ANSWERS,
      payload: { prefilledAnswers: response.prefilled_answers }
    })
  }
}

export const submitForm = () => async (dispatch, getState) => {
  const { filledFormId } = getState().clinician
  const requestUrl = `/api/v1/clinician/filled_forms/${filledFormId}/complete`
  const { success } = await request(requestUrl, 'POST')
  if (success) {
    alert("Your form has been submitted!")
    dispatch({
      type: types.SUBMIT_FORM
    })
  }
}

export const getFilledForms = () => async dispatch => {
  const requestUrl = `/api/v1/clinician/filled_forms`
  const { response, success } = await request(requestUrl, 'GET')
  if (success) {
    dispatch({
      type: types.GET_FILLED_FORMS,
      payload: { filledForms: response.filled_forms }
    })
  }
}

export const getCompletedForms = () => async dispatch => {
  const requestUrl = `/api/v1/clinician/filled_forms/completed`
  const { response, success } = await request(requestUrl, 'GET')
  if (success) {
    dispatch({
      type: types.GET_COMPLETED_FORMS,
      payload: { completedForms: response.filled_forms }
    })
  }
}

export const fetchFilledFormAnswers = () => async (dispatch, getState) => {
  const { filledFormId } = getState().clinician
  const requestUrl = `/api/v1/clinician/filled_forms/${filledFormId}/answers`
  const { response, success } = await request(requestUrl, 'GET')
  if (success) {
    dispatch({
      type: types.GET_FILLED_FORM_ANSWERS,
      payload: { prefilledAnswers: response.prefilled_answers }
    })
  }
}
