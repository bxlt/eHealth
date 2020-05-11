class CreateClinicians < ActiveRecord::Migration[6.0]
  def change
    create_table :clinicians do |t|
      t.string :first_name
      t.string :last_name
      t.string :cpso_number
      t.timestamps
    end
  end
end
