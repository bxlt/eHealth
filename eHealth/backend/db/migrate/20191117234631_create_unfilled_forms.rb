class CreateUnfilledForms < ActiveRecord::Migration[6.0]
  def change
    create_table :unfilled_forms do |t|
      t.string :name
      t.string :dtd_type
      t.string :version
      t.timestamps
    end
  end
end
