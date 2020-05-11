class ApplicationController < ActionController::API
  rescue_from ActionController::ParameterMissing do |exception|     
    render json: { message: "Unable to process this request" }, status: :unprocessable_entity
  end
end
