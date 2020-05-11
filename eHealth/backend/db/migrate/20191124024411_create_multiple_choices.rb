class CreateMultipleChoices < ActiveRecord::Migration[6.0]
  def change
    create_table :multiple_choices do |t|
      t.string :value
      t.timestamps
    end
  end
end
