class MultipleChoice < ApplicationRecord
  has_one :answer, as: :answerable
end
