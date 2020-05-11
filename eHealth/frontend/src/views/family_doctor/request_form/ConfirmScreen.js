import React from 'react'
import { connect } from 'react-redux'
import PageTitle from '../../../components/common/PageTitle'
import InfoCard from '../../../components/common/InfoCard'
import FormToBeProcessedSvg from '../../../components/clinician/main_screen/FormToBeProcessedSvg'
import CompletedFormSvg from '../../../components/clinician/main_screen/CompletedFormSvg'
import InfoCardSvgClinician from '../../../components/family_doctor/svgs/InfoCardSvgClinician'
import SubmitButton from '../../../components/common/SubmitButton'
import { requestForm } from '../../../redux/actions/family_doctors'
import { useHistory } from 'react-router-dom'

const ConfirmScreen = props => {
    const history = useHistory()
    const handleClick = async () => {
        props.requestForm()
        history.push('/family_doctor/')
    }
    return (
        <div>
            <div>
                <PageTitle title="Confirm Request Information" />
            </div>
                <div className="card-container">
                    <InfoCard
                        title="Patient"
                        svg={FormToBeProcessedSvg}
                        info={props.patient.first_name + " " + props.patient.last_name}
                        route="/family_doctor/patients"
                    />
                    <InfoCard
                        title="Form"
                        svg={CompletedFormSvg}
                        info={props.unfilledForm.name}
                        route="/family_doctor/patients/forms"
                    />
                    <InfoCard
                        title="Clinician"
                        svg={InfoCardSvgClinician}
                        info={props.clinician.first_name + " " + props.clinician.last_name}
                        route="/family_doctor/patients/forms/clinicians"
                    />

                </div>
                <SubmitButton onClick={handleClick} />
        </div>
    )
}

const mapStateToProps = state => ({
    patient: state.familyDoctor.patient,
    unfilledForm: state.familyDoctor.unfilledForm,
    clinician: state.familyDoctor.clinician
})
const mapDispatchToProps = {
    requestForm
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmScreen)
