class FormManager < ApplicationRecord
  has_many :templates
  validates_presence_of :name
end
