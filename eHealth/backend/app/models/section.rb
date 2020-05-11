class Section < ApplicationRecord
  belongs_to :unfilled_form
  has_many :questions
  has_many :sections, class_name: "Section", foreign_key: "parent"
  belongs_to :parent, class_name: "Section", optional: true

  scope :no_subsections, -> { where("sections.subsection": false) }
end
