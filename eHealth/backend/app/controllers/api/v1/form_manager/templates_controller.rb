class Api::V1::FormManager::TemplatesController < ApplicationController
  # GET /api/v1/templates
  def index
    @templates = Template.all
    render json: { templates: @templates }
  end

  # POST /api/v1/templates
  def create
    @form_manager = FormManager.last
    @template = Template.new(create_params.merge!({
                              form_manager: @form_manager, 
                              uploaded_template: File.read(tempfile).to_s }))            
    if @template.save
      render json: { data: @template.as_json(only: [:id]) }, status: :created
    else
      render json: @template.errors, status: :unprocessable_entity
    end
  end

  private
    def template_params
      params.require(:template).permit(:form_manager_id, :name, :dtd_type, :version)
    end

    def create_params
      params.require(:template).permit(:name, :dtd_type, :version)
    end

    def tempfile
      tempfile ||= params[:template][:uploaded_template]&.tempfile
    end
end