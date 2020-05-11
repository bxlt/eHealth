class AddQuestionToQuestion < ActiveRecord::Migration[6.0]
  def change
    add_reference :questions, :question
  end
end
