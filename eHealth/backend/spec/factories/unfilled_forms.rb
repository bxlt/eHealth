FactoryBot.define do
  factory :unfilled_form do
    template_id { "" }
    name { "MyString" }
    type { "" }
    answers { "MyText" }
  end
end
