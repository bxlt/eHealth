class Api::V1::Clinician::UnfilledFormsController < ApplicationController
  before_action :find_unfilled_form, except: [:index]

  # GET /unfilled_forms/:id
  # Return an unfilled form's initial sections
  def show
    @unfilled_form = UnfilledForm.find(params[:id])
    render json: { sections: @unfilled_form.sections.no_subsections }, status: :ok
  end

  # GET /unfilled_forms/:id/sections/:section_id
  # Return a unfilled form's subsections for a particular section_id
  def subsections
    @section = @unfilled_form.sections.find(params[:section_id])
    render json: { subsections: @section.sections }
  end

  # GET /unfilled_forms/:id/questions/:section_id
  # Return questions for a particular section_id
  def questions
    @section = @unfilled_form.sections.find(params[:section_id])
    @questions = @section.questions.where(is_follow_up_flag: false)
    render json: { questions: @questions }
  end

  # GET /unfilled_forms/:id/nested_questions/:question_id
  # Return nested questions given a parent question_id
  def nested_questions
    @questions = Question.find(params[:question_id]).follow_ups
    render json: { questions: @questions }
  end

  private 

  def find_unfilled_form
    @unfilled_form = UnfilledForm.find(params[:id])
  end
end