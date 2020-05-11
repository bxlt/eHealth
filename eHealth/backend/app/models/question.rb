class Question < ApplicationRecord
  belongs_to :section
  has_many :answers
  has_many :texts, through: :answers, source: :answerable, source_type: "Text"
  has_many :multiple_choices, through: :answers, source: :answerable, source_type: "MultipleChoice"
  
  # Self reference questions
  has_many :follow_up_managers, foreign_key: "parent"
  has_many :follow_ups, through: :follow_up_managers
  has_one :follow_up_manager, foreign_key: "follow_up"
  has_one :parent, through: :follow_up_manager

  serialize :options, Array

  def answerables
    answers.map(&:answerable)
  end
end