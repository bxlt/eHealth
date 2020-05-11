class Api::V1::Clinician::PatientsController < ApplicationController
  before_action :find_scoped_patient, only: [:show, :unfilled_forms, :filled_forms]
  
  # GET /patients
  # Return all patients that are under the care of a clinician
  def index
    @patients = Patient.for_clinician(1)
    render json: { patients: @patients }, 
                  include: [:family_doctor, :unfilled_forms, :filled_forms ], 
                  status: :ok
  end

  # GET /patients 
  # Return a patient given their id
  def show
    render json: { patient: @patient }, status: :ok
  end

  # POST /patients/search
  # Search for a patient by first_name, last_name and return
  def search
    @clinician = Clinician.last
    @patients = @clinician.patients.search(params[:name])
    render json: { patients: @patients }, include: [:filled_forms], status: :ok
  end

  # GET /unfilled_forms
  # Return a patient's unfilled form
  def unfilled_forms
    @unfilled_form = @patient.unfilled_forms.find(params[:unfilled_form_id])
    render json: { unfilled_form: @unfilled_form }, status: :ok
  end

  # GET /filled_forms 
  # Return a patient's filled forms
  def filled_forms
    render json: { forms: @patient.filled_forms }, status: :ok
  end

  private 

  def find_scoped_patient
    @patient = Patient.scoped_by_clinician_find_by(1, params[:id])
  end
end
