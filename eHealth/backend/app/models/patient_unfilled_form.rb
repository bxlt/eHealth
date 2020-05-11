class PatientUnfilledForm < ApplicationRecord
  belongs_to :patient
  belongs_to :unfilled_form

  after_create :create_filled_form

  private 

  def create_filled_form 
    patient.filled_forms.create!(unfilled_form: unfilled_form, 
                                 clinician: Clinician.first)
  end
end
