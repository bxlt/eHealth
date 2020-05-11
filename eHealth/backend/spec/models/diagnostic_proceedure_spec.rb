require 'rails_helper'

RSpec.describe DiagnosticProceedure, type: :model do
  describe 'associations' do
    it { should belong_to(:template) }
    it { should belong_to(:unfilled_form) }
  end
end
