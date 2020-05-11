class CreateDiagnosticProceedures < ActiveRecord::Migration[6.0]
  def change
    create_table :diagnostic_proceedures do |t|
      t.belongs_to :template
      t.belongs_to :unfilled_form

      t.timestamps
    end
  end
end
