import React from 'react'
import PageTitle from '../../components/common/PageTitle'
import MenuCard from '../../components/common/MenuCard'
import FormToBeProcessedSvg from '../../components/clinician/main_screen/FormToBeProcessedSvg'
import CompletedFormSvg from '../../components/clinician/main_screen/CompletedFormSvg'

const FamilyDoctorMainScreen = () => {
  return (
    <div>
      <div>
        <PageTitle title="Family Doctor" />
      </div>
      <div className="card-container">
        <MenuCard
          title="Request Forms"
          svg={FormToBeProcessedSvg}
          route="/family_doctor/patients"
        />
        <MenuCard
          title="Completed Forms"
          svg={CompletedFormSvg}
          route="/family_doctor/completed_forms"
        />
      </div>
    </div>
  )
}

export default FamilyDoctorMainScreen
