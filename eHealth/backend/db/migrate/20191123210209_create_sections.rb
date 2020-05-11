class CreateSections < ActiveRecord::Migration[6.0]
  def change
    create_table :sections do |t|
      t.references :unfilled_form, null: false, foreign_key: true
      t.string :title
      t.boolean :subsection, null: false, default: false
      t.boolean :has_subsection, null: false, default: false
      t.timestamps
    end
  end
end
