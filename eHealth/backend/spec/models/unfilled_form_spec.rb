require 'rails_helper'

RSpec.describe UnfilledForm, type: :model do
  describe 'associations' do
    it { should have_many(:questions) }
    it { should have_one(:diagnostic_proceedure) }
    it { should have_one(:template).through(:diagnostic_proceedure) }
  end

  # describe 'validations' do
  #   it { should validate_presence_of(:name) }
  # end
end
