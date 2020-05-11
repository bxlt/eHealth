class CreateTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :templates do |t|
      t.references :form_manager, null: false, foreign_key: true
      t.string :name
      t.string :dtd_type
      t.string :version
      t.text :uploaded_template
      t.text :parsed_template

      t.timestamps
    end
  end
end
