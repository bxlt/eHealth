FactoryBot.define do
  factory :template do
    association :form_manager
    name { 'Template' }
    dtd_type { '1' }
    version { '1' }

    trait :valid_dtd do
      uploaded_template { File.open("#{Rails.root}/tmp/example_xml/PKG_THYROID_US_2.xml") }
    end

    trait :invalid_dtd do
      uploaded_template { "" }
    end

    before(:create) do |template|
      template.form_manager = create(:form_manager)
    end
  end
end