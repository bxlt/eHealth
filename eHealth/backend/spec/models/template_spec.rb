require 'rails_helper'

RSpec.describe Template, type: :model do
  describe 'associations' do
    it { should belong_to(:form_manager) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:uploaded_template) } 
    it { should validate_presence_of(:dtd_type) }
    it { should validate_presence_of(:version) }
  end

  # describe 'after creating' do
  #   before { @template = FactoryBot.create(:template, :valid_dtd) }
  #   it 'should enqueue to process XML' do
  #     expect(@template).to receive(:parse_template) 
  #     @template.run_callbacks(:create)
  #   end
  # end
end
