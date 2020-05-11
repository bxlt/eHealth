class FollowUpManager < ApplicationRecord
  belongs_to :parent, class_name: "Question"
  belongs_to :follow_up, class_name: "Question"
end
