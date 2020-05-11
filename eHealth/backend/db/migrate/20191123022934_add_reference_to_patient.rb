class AddReferenceToPatient < ActiveRecord::Migration[6.0]
  def change
    add_reference :patients, :family_doctor, null: false, foreign_key: true
  end
end
