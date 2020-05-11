# frozen_string_literal: true

class Api::V1::FamilyDoctor::CliniciansController < ApplicationController
  # GET /clinicians
  # Return all clinicians
  def index
    @clinicians = Clinician.all
    render json: { clinicians: @clinicians }
  end
end