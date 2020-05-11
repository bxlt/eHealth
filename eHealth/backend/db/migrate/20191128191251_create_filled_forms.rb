class CreateFilledForms < ActiveRecord::Migration[6.0]
  def change
    create_table :filled_forms do |t|
      t.references :unfilled_form, null: false, foreign_key: true
      t.references :clinician, null: false, foreign_key: true
      t.references :patient, null: false, foreign_key: true
      t.integer :status, default: 0, null: false
      t.text :answers

      t.timestamps
    end
  end
end
