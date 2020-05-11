class Patient < ApplicationRecord
  include PgSearch::Model
  pg_search_scope :search_by_name, against: [:first_name, :last_name],
                                   using: { tsearch: { prefix: true } }
  
  has_many :patient_unfilled_forms
  has_many :unfilled_forms, through: :patient_unfilled_forms
  has_many :filled_forms
  belongs_to :family_doctor

  validates_presence_of :first_name, :last_name, :ohip_number

  scope :for_clinician, -> (clinician_id) { 
    joins(:filled_forms).where("clinican_id = ?", clinician_id).uniq 
  }

  scope :scoped_by_clinician_find_by, -> (clinician_id, patient_id) { 
   for_clinician(clinician_id).find_by(id: patient_id) }

  def self.search(query)
    query.present? ? search_by_name(query) : order("created_at DESC")
  end
end
