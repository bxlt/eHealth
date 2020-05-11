require 'rails_helper'

RSpec.describe Api::V1::TemplatesController, type: :controller do
  describe "POST #create" do
    context "with valid params" do
      let(:valid_params) { 
        { 
          template: {
            uploaded_template: Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/files/PKG_THYROID_US.xml", "text/xml"),
            name: "PKG_THYROID",
            dtd_type: "1",
            version: "1"
          }
        }
      }

      it "creates a new Template" do
        expect {
          post :create, params: valid_params
        }.to change(Template, :count).by(1)
      end

      it "renders a JSON response with the new template" do
        post :create, params: valid_params
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response.parsed_body).to include("data")
        expect(response.parsed_body['data']).to include("id")
        expect(response.parsed_body['data']['id']).to be_truthy
      end
    end

    context "with invalid params" do
      let (:invalid_params) { { template: {} } }
      it "renders a JSON response with errors for the new template" do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
end
