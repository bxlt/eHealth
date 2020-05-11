class UnfilledForm < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_one :diagnostic_proceedure
  has_one :template, through: :diagnostic_proceedure
  has_many :sections

  has_many :patient_unfilled_forms
  has_many :patients, through: :patient_unfilled_forms
  
  has_many :filled_forms
end