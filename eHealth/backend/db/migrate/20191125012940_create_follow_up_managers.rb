class CreateFollowUpManagers < ActiveRecord::Migration[6.0]
  def change
    create_table :follow_up_managers do |t|
      t.references :follow_up, null: false, foreign_key: { to_table: "questions" }
      t.references :parent, null: false, foreign_key: { to_table: "questions" }
      
      t.timestamps
    end
  end
end
