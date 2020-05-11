class DiagnosticProceedure < ApplicationRecord
  belongs_to :template
  belongs_to :unfilled_form
end
