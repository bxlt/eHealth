class CreateFormManagers < ActiveRecord::Migration[6.0]
  def change
    create_table :form_managers do |t|
      t.string :name

      t.timestamps
    end
  end
end
