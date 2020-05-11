class Api::V1::FamilyDoctor::FilledFormsController < ApplicationController
  # GET /filled_forms/clinicians 
  # Return all clinicians available for a diagnosis
  def clinicians 
    @clinicians = Clinician.all
    render json: { clinicians: @clinicians }, status: :ok
  end

  # GET /filled_forms/unfilled_forms
  # Return all unfilled forms available
  def unfilled_forms 
    @unfilled_forms = UnfilledForm.all
    render json: { unfilled_forms: @unfilled_forms }, status: :ok
  end

  # POST /filled_forms
  # Create a filled form to be processed by a clinician
  def create 
    # Ensure credentials are scoped to the correct family doctor 
    @family_doctor = FamilyDoctor.last!
    @patient = @family_doctor.patients.find(params[:patient_id])
    # Ensure clinician exists 
    @clinician = Clinician.find(params[:clinician_id])
    # Ensure unfilled form exists
    @unfilled_form = UnfilledForm.find(params[:unfilled_form_id])
    @filled_form = FilledForm.create!({
      patient: @patient,
      clinician: @clinician,
      unfilled_form: @unfilled_form
    })
    render json: { filled_form: @filled_form }, status: :ok
  end

  private 
  
  def filled_form_create_params 
    params.permit(:unfilled_form_id, :clinician_id)
  end
end