# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

form_manager = FormManager.create({ name: 'John Doe' })

t = File.read("#{Rails.root}/PKG_THYROID_US.xml").to_s

# Create a UnfilledForm after parsing
template = Template.create({ 
  form_manager: form_manager, 
  name: 'A Template for Phase 2 testing', 
  dtd_type: 'Type A', 
  version: '1.0', 
  uploaded_template: t })

clinician = Clinician.create!({
  first_name: "John",
  last_name: "Smith",
  cpso_number: "46290"
})

family_doctor = FamilyDoctor.create({ first_name: "Jane", 
                                      last_name: "McJohnson" })

patient = Patient.create!({ first_name: "Justin", 
                            last_name: "Verlander", 
                            ohip_number: "1234 777 000 AB", 
                            family_doctor: family_doctor })

patient2 = Patient.create!({ first_name: "Lebron",
                             last_name: "James", 
                             ohip_number: "9999 230 000 AB", 
                             family_doctor: family_doctor})

# Family Doctor associated Patient with UnfilledForm
unfilled_form = template.unfilled_forms.first 
patient.patient_unfilled_forms.create!(unfilled_form: unfilled_form)
patient2.patient_unfilled_forms.create!(unfilled_form: unfilled_form)

# section = Section.create!(unfilled_form: unfilled_form)
# question = Question.create!(section: section)
# filled_form = FilledForm.create!({ unfilled_form: unfilled_form,
#                                    clinician: clinician,
#                                    patient: patient })
