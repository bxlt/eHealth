class CreateTexts < ActiveRecord::Migration[6.0]
  def change
    create_table :texts do |t|
      t.string :value
      t.string :hint
      t.timestamps
    end
  end
end
