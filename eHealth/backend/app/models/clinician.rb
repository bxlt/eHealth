class Clinician < ApplicationRecord
  has_many :filled_forms

  def patients
    patient_ids = filled_forms.pluck(:patient_id)
    Patient.where(id: patient_ids)
  end
end
