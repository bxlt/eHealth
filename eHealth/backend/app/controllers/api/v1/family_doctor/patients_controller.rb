# frozen_string_literal: true

class Api::V1::FamilyDoctor::PatientsController < ApplicationController
  # GET /patients
  # Return all patients belonging to a family doctor
  def index
    @family_doctor = FamilyDoctor.last
    render json: { patients: @family_doctor.patients }
  end
  
  # POST /patients
  # Create a patient belonging to a family doctor
  def create
    @family_doctor = FamilyDoctor.last
    @patient = @family_doctor.patients.create!(patient_create_params)
    render json: { patient: @patient }
  end

  # POST /patients/search
  # Search for patients given a query
  def search 
    @family_doctor = FamilyDoctor.last 
    @patients = @family_doctor.patients.search(params[:query])
    render json: { patients: @patients }
  end

  private 
  
  def patient_create_params
    params.permit(:first_name, :last_name, :ohip_number)
  end
end