require "rails_helper"

RSpec.describe Api::V1::TemplatesController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(:post => "api/v1/form_manager/templates").to route_to("api/v1/form_manager/templates#create")
    end
  end
end