class Text < ApplicationRecord
  has_one :answer, as: :answerable
end
