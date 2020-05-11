class Api::V1::FamilyDoctor::UnfilledFormsController < ApplicationController
  # GET /unfilled_forms 
  # Return all unfilled forms pertaining to the current family doctor
  def index 
    @unfilled_forms = UnfilledForm.all
    render json: { unfilled_forms: @unfilled_forms }, status: :ok
  end
end