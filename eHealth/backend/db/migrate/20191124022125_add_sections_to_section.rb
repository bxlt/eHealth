class AddSectionsToSection < ActiveRecord::Migration[6.0]
  def change
    add_reference :sections, :parent
  end
end
