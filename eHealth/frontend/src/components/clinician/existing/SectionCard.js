import React, { useState, useEffect } from 'react'
import Form from '../form/Form'
import { connect } from 'react-redux'
import {
  fetchSubsections,
  fetchQuestions
} from '../../../redux/actions/clinicians'
import SectionCardSvgArrow from './svgs/SectionCardSvgArrow'

const SectionCard = props => {
  useEffect(() => {
    props.fetchSubsections(props.values.id)
    props.fetchQuestions(props.values.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [hiddenState, setHiddenState] = useState(true)

  return (
    <div>
      <div key={props.values.id} className="uff-section-card">
        <div
          className={
            props.nestedSection !== undefined
              ? 'uff-sub-section-card-header'
              : 'uff-section-card-header'
          }
          onClick={() => setHiddenState(!hiddenState)}
          style={{ marginLeft: props.level + 'rem' }}
        >
          <div>{props.values.title}</div>
          <SectionCardSvgArrow hidden={!hiddenState} />
        </div>
        <div
          key={props.values.id || '123'}
          className={hiddenState ? 'hidden' : ''}
        >
          {props.subsections[props.values.id] &&
            props.subsections[props.values.id].map(section => (
              <SectionCardContainer
                key={section.id}
                values={section}
                level={props.level + 1}
                nestedSection={true}
              />
            ))}
          <hr />
          {props.questions[props.values.id] && (
            <Form
              prefilledAnswers={props.prefilledAnswers}
              questions={props.questions[props.values.id]}
            ></Form>
          )}
          <button
            className="uff-doneSectionButton"
            onClick={() => setHiddenState(!hiddenState)}
          >
            Hide {props.values.title}
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  questions: state.clinician.questions,
  subsections: state.clinician.subsections,
  prefilledAnswers: state.clinician.prefilledAnswers
})

const mapDispatchToProps = {
  fetchSubsections,
  fetchQuestions
}

const SectionCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionCard)
export default SectionCardContainer
