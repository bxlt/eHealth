import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PageTitle from '../../../components/common/PageTitle'
import { ClipLoader } from 'react-spinners'
import FormCard from '../../../components/family_doctor/FormCard'
import { getUnfilledForms } from '../../../redux/actions/family_doctors'


const RequestFormList = props => {
  useEffect(() => {
    props.getUnfilledForms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const renderFormCards = () => {
    if (props.unfilledForms.length === 0) {
      return <div>There are no uploaded forms at this time.</div>
    }
    return (
      <div>
        {props.unfilledForms.map(form => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    )
  }
  return (
    <div className="center-content">
      <PageTitle title="Choose a form to request" />

      {props.unfilledForms === null ? (
        <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading />
      ) : (
        renderFormCards()
      )}
    </div>
  )
}
const mapStateToProps = state => ({
    patient: state.familyDoctor.patient,
    unfilledForms: state.familyDoctor.unfilledForms
})
const mapDispatchToProps = {
    getUnfilledForms
  }

  export default connect(mapStateToProps, mapDispatchToProps)(RequestFormList)
 
