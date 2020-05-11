class CreatePatientUnfilledForms < ActiveRecord::Migration[6.0]
  def change
    create_table :patient_unfilled_forms do |t|
      t.references :patient, null: false, foreign_key: true
      t.references :unfilled_form, null: false, foreign_key: true

      t.timestamps
    end
  end
end
