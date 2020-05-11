# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_28_191251) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.integer "answerable_id"
    t.string "answerable_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "clinicians", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "cpso_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "diagnostic_proceedures", force: :cascade do |t|
    t.bigint "template_id"
    t.bigint "unfilled_form_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["template_id"], name: "index_diagnostic_proceedures_on_template_id"
    t.index ["unfilled_form_id"], name: "index_diagnostic_proceedures_on_unfilled_form_id"
  end

  create_table "family_doctors", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "filled_forms", force: :cascade do |t|
    t.bigint "unfilled_form_id", null: false
    t.bigint "clinician_id", null: false
    t.bigint "patient_id", null: false
    t.integer "status", default: 0, null: false
    t.text "answers"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["clinician_id"], name: "index_filled_forms_on_clinician_id"
    t.index ["patient_id"], name: "index_filled_forms_on_patient_id"
    t.index ["unfilled_form_id"], name: "index_filled_forms_on_unfilled_form_id"
  end

  create_table "follow_up_managers", force: :cascade do |t|
    t.bigint "follow_up_id", null: false
    t.bigint "parent_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["follow_up_id"], name: "index_follow_up_managers_on_follow_up_id"
    t.index ["parent_id"], name: "index_follow_up_managers_on_parent_id"
  end

  create_table "form_managers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "multiple_choices", force: :cascade do |t|
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "patient_unfilled_forms", force: :cascade do |t|
    t.bigint "patient_id", null: false
    t.bigint "unfilled_form_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["patient_id"], name: "index_patient_unfilled_forms_on_patient_id"
    t.index ["unfilled_form_id"], name: "index_patient_unfilled_forms_on_unfilled_form_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "ohip_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "family_doctor_id", null: false
    t.index ["family_doctor_id"], name: "index_patients_on_family_doctor_id"
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "section_id", null: false
    t.string "question_body"
    t.string "question_type"
    t.text "options"
    t.boolean "has_follow_up_flag", default: false, null: false
    t.boolean "is_follow_up_flag", default: false, null: false
    t.integer "follow_up_to_option"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "question_id"
    t.index ["question_id"], name: "index_questions_on_question_id"
    t.index ["section_id"], name: "index_questions_on_section_id"
  end

  create_table "sections", force: :cascade do |t|
    t.bigint "unfilled_form_id", null: false
    t.string "title"
    t.boolean "subsection", default: false, null: false
    t.boolean "has_subsection", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "parent_id"
    t.index ["parent_id"], name: "index_sections_on_parent_id"
    t.index ["unfilled_form_id"], name: "index_sections_on_unfilled_form_id"
  end

  create_table "templates", force: :cascade do |t|
    t.bigint "form_manager_id", null: false
    t.string "name"
    t.string "dtd_type"
    t.string "version"
    t.text "uploaded_template"
    t.text "parsed_template"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["form_manager_id"], name: "index_templates_on_form_manager_id"
  end

  create_table "texts", force: :cascade do |t|
    t.string "value"
    t.string "hint"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "unfilled_forms", force: :cascade do |t|
    t.string "name"
    t.string "dtd_type"
    t.string "version"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "answers", "questions"
  add_foreign_key "filled_forms", "clinicians"
  add_foreign_key "filled_forms", "patients"
  add_foreign_key "filled_forms", "unfilled_forms"
  add_foreign_key "follow_up_managers", "questions", column: "follow_up_id"
  add_foreign_key "follow_up_managers", "questions", column: "parent_id"
  add_foreign_key "patient_unfilled_forms", "patients"
  add_foreign_key "patient_unfilled_forms", "unfilled_forms"
  add_foreign_key "patients", "family_doctors"
  add_foreign_key "questions", "sections"
  add_foreign_key "sections", "unfilled_forms"
  add_foreign_key "templates", "form_managers"
end
