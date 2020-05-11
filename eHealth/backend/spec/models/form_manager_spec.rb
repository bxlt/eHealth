require 'rails_helper'

RSpec.describe FormManager, type: :model do
  describe 'associations' do
    it { should have_many(:templates) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
  end
end
