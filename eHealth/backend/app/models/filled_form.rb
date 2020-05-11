class FilledForm < ApplicationRecord
    belongs_to :unfilled_form
    belongs_to :clinician
    belongs_to :patient
    
    enum status: [:pending, :incomplete, :complete]
    serialize :answers, Hash

    scope :for_clinician, -> (clinician_id) { 
        includes(patient: [:family_doctor], unfilled_form: []).
        where(clinician_id: clinician_id) 
    }

    scope :find_scoped_filled_form, -> (clinician_id, patient_id) {
        find_by(clinician_id: clinician_id, patient_id: patient_id)
    }

    scope :for_completion, -> { where.not(status: :complete) }
end
