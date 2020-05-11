import React from 'react'
import PageTitle from '../../components/common/PageTitle'
import MenuCard from '../../components/common/MenuCard'

// SVGs
import FormToBeProcessedSvg from '../../components/clinician/main_screen/FormToBeProcessedSvg'
import CompletedFormSvg from '../../components/clinician/main_screen/CompletedFormSvg'

const ClinicianMainScreen = () => {
  return (
    <div>
      <div>
        <PageTitle title="Welcome back," optionalTitle="Dr. Johnson" />
      </div>
      <div className="card-container">
        <MenuCard
          title="Forms to be Processed"
          svg={FormToBeProcessedSvg}
          route="/clinician/pending"
        />
        <MenuCard
          title="Completed Forms"
          svg={CompletedFormSvg}
          route="/clinician/completed_forms"
        />
      </div>
    </div>
  )
}

export default ClinicianMainScreen
