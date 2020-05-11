class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.references :section, null: false, foreign_key: true
      t.string :question_body
      t.string :question_type
      t.text :options
      t.boolean :has_follow_up_flag, default: false, null: false
      t.boolean :is_follow_up_flag, default: false, null: false
      t.integer :follow_up_to_option

      t.timestamps
    end
  end
end
