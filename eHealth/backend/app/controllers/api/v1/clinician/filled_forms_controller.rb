class Api::V1::Clinician::FilledFormsController < ApplicationController
  before_action :find_scoped_filled_form, only: [:show, :update, :complete, :answers]

  # GET /filled_forms
  # Return all filled forms that belong to a clinician
  def index
    @filled_forms = FilledForm.for_clinician(Clinician.first.id).for_completion
    render json: { filled_forms: @filled_forms }, 
                 include: [patient: { include: :family_doctor }, unfilled_form: {}],
                 status: :ok
  end

  # GET /filled_forms/:id
  # Return a filled form, together with it's subsections and answers
  def show
    @unfilled_form = @filled_form.unfilled_form
    render json: { form: @filled_form, 
                   subsections: @unfilled_form.sections.no_subsections, 
                   answers: @answers }, 
                 status: :ok
  rescue => e
    render json: { error: e.message }, status: :not_found
  end

  # POST /filled_forms/:id/complete
  # Set filled form to complete. Viewable by Family Doctor once this is complete.
  def complete
    @filled_form.complete!
    render json: { filled_form: @filled_form }, status: :ok
  end

  # GET /filled_forms/completed
  # Return all completed forms belonging to a clinician
  def completed
    @filled_forms = FilledForm.for_clinician(Clinician.first.id).complete
    render json: { filled_forms: @filled_forms }, 
    include: [patient: { include: :family_doctor }, unfilled_form: {}],
    status: :ok
  end

  # PATCH /filled_forms/:id
  # Update filled form with prefilled answers
  def update
    @filled_form.update!(answers: answer_params, status: :incomplete)
    render json: { prefilled_answers: @filled_form.answers }, success: :ok
  end

  # GET /filled_forms/:id/answers
  # Return all existing prefilled answers
  def answers
    render json: { prefilled_answers: @filled_form.answers }, status: :ok
  end

  private 
  
  def answer_params 
    params.require(:answers).permit!.to_h
  end

  def find_scoped_filled_form
    @filled_form = FilledForm.find(params[:id])
  end
end
