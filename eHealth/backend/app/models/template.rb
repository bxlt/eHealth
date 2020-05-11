class Template < ApplicationRecord
  belongs_to :form_manager
  has_many :diagnostic_proceedures, dependent: :destroy
  has_many :unfilled_forms, through: :diagnostic_proceedures, dependent: :destroy
  validates_presence_of :uploaded_template, :name, :dtd_type, :version
  after_create :parse_raw_template

  def parse_raw_template
    template_json = parse_xml_to_json
    unfilled_form = create_unfilled_form
    parse_template(self, template_json, unfilled_form)
  end

  def parse_xml_to_json
    Nokogiri.XML(self.uploaded_template)
  end

  def create_unfilled_form
    self.unfilled_forms.create!(self.attributes.slice('name', 'dtd_type', 'version'))
  end

  def get_xml_body(template)
    query_string = "SDCPackage > XMLPackage > FormDesign > Body > ChildItems"
    template.css(query_string)
  end

  # Iterate through the top level of the XML body -- contains Section or Question
  def parse_template(template, template_json, unfilled_form)
    xml_body = get_xml_body(template_json)
    output = {
      type: "UnfilledForm"
    }
    unfilled_form_children = []
    xml_body.children.each do |section|
      unless section.text?
        case section.name
        when "Section"
          section_obj = Section.create!(unfilled_form: unfilled_form, title: section['title'])
          unfilled_form_children << handle_section(section, section_obj, unfilled_form)
        end
        output[:next] = unfilled_form_children
      end
    end
    template.update(parsed_template: output.to_json)
    # ActionCable.server.broadcast 'templates', output.to_json
  end

  # Parses sections -- skip over child items and parse Questions or Subsections
  def handle_section(section, section_obj, unfilled_form)
    section_output = {
      type: "Section",
      title: section_obj.title,
      unfilled_form: unfilled_form.id,
      parent: section_obj.parent,
      subsection: section_obj.subsection
    }
    child_items = section.at("ChildItems")
    section_children = []
    unless child_items.blank?
      child_items.children.each do |child_item|
        # child_item can be either a Question or Subsection
        unless child_item.text?
          case child_item.name
          when "Section"
            # subsection
            subsection_obj = Section.create!(parent: section_obj, unfilled_form: unfilled_form, title: child_item['title'], subsection: true)
            section_obj.update(has_subsection: true)
            section_children << handle_section(child_item, subsection_obj, unfilled_form)
          when "Question"
            question_obj = Question.create!(section: section_obj, is_follow_up_flag: false)
            # Assumption: Section can't be nested in Question
            section_children << handle_question(child_item, section_obj, unfilled_form, question_obj)
          end
        end
      end
      #Section_Children
      section_output[:next] = section_children
    end
    section_output
  end

  private

  #Handling Questions
  def handle_question(question, section_obj, unfilled_form, question_obj)
    question_output = {
       type: "Question",
       section: section_obj.id,
       follow_up: false
    }
    children = []
    question.children.each do |question_item|
      case question_item.name
      when "ResponseField"
        # Traversal ends here -- this is an input
        #handle_response_field(question_item, question_obj)
        question_output[:question_type] = "TextField"
        question_output[:question_body] = question["title"]

        #Question Saved - Done
        question_obj.update(
          question_body: question["title"],
          question_type: "TextField"
        )

      when "ListField"
        list = question_item.children
        list_output = ""
        list.each do |list|
          if list.name == "List"
            #Parse List
            list_output = handle_list(list, section_obj, unfilled_form, question_obj)
          end
        end
        #Check for Follow-ups
        if list_output[:follow_up]
          question_output[:follow_up] = true
          question_output[:next] = list_output[:follow_ups]
          question_output[:question_type] = "MultiChoice"
          question_output[:question_body] = question["title"]
          question_output[:options] = list_output[:options]
          question_output[:has_follow_up_flag] = true

          question_obj.update(
            question_type: "MultiChoice",
            question_body: question["title"],
            options: list_output[:options].to_a,
            has_follow_up_flag: true
          )
        elsif list_output[:type] != "FillerList"
          # No Follow-Ups
          question_output[:question_type] = "MultiChoice"
          question_output[:question_body] = question["title"]
          question_output[:options] = list_output[:options]

          #Question Saved - Done
          question_obj.update(
            question_type: "MultiChoice",
            question_body: question["title"],
            options: list_output[:options].to_a,
          )
        end
      when "ChildItems"
        child_items_output = handle_child_items(question_item, section_obj, unfilled_form, question_obj)

        question_output[:question_type] = "MultiChoice"
        question_output[:question_body] = question["title"]
        question_output[:options] = child_items_output[:options]
        question_output[:follow_up] = child_items_output[:follow_up]
        question_output[:follow_ups] = child_items_output[:follow_ups]

        question_obj.update(
          question_type: "MultiChoice",
          question_body: question["title"],
          options: child_items_output[:options],
          has_follow_up_flag: true
        )

        #children << handle_child_items(question_item, unfilled_form)
      when "CodedValue"
        #CodedValue
      end
    end
    #Sanity Check for ChildItem and CodedValue
    question_output
  end

  def handle_child_items(child_items, section_obj, unfilled_form, question_obj)
    child_items_output = {
      type: "ListOfQuestions",
      follow_up: false
    }
    options = []
    follow_ups = []
    option_position = 0

    child_items.children.each do |sub_item|
      case sub_item.name
      when "Question"
        follow_up = {
          follow_up_type: "ListOfQuestions",
          section: section_obj,
          under_question: question_obj,
          follow_up_to_option: option_position
        }
        #Recurse for nested questions and add to list.
        sub_question_obj = Question.create!(section: section_obj, is_follow_up_flag: true, follow_up_to_option: option_position)
        FollowUpManager.create!(parent:question_obj, follow_up: sub_question_obj)
        question_obj.update(has_follow_up_flag: true)

        follow_up[:next] = handle_question(sub_item, section_obj, unfilled_form, sub_question_obj)
        child_items_output[:follow_up] = true

        option = { value: sub_item["title"], position: option_position, has_follow_up_flag: true, follow_ups: sub_question_obj}
        options << option

        follow_ups << follow_up
        option_position = option_position + 1
      end
    end
    child_items_output[:options] = options
    child_items_output[:follow_ups] = follow_ups
    child_items_output
  end

  def handle_list(list, section_obj, unfilled_form, question_obj)
    list_output = {
      follow_up: false,
      list_type: "MC"
    }

    if list.children.empty?
      #Question -> ListField -> List -> NO LIST ITEMS, WHY IS THIS EVEN HERE
      list_output[:type] = "FillerList"
    else
      options = []
      follow_ups = []
      option_position = 0

      list.children.each do |list_item|
        unless list_item.text?
          if list_item.children.any?
            #Create option
            option = { value: list_item["title"], position: option_position, has_follow_up_flag: false, follow_ups: {}}
            fup_output = {}
            follow_up = {}
            #Deal with list_item children (Follow-ups). There is ever onyl 1 chil dof list_item
            list_item.children.each do |list_item_child|
              #Create Follow Up
              follow_up = { follow_up_to_option: option_position }
              case list_item_child.name
              when "ListItemResponseField"
                fup_output = handle_list_item_fup(list_item_child, section_obj, unfilled_form, question_obj, option_position)
              when "ChildItems"
                fup_output = handle_list_item_fup(list_item_child, section_obj, unfilled_form, question_obj, option_position)
              when "CodedValue"
                fup_output = handle_list_item_fup(list_item_child, section_obj, unfilled_form, question_obj, option_position)
              end
            end
            #Deal with Follow-up items
            case fup_output[:type]
            when "CodedAnswer"
              list_output[:list_type] = "MC_Coded"

              #Append option, but no follow-ups since MC_Coded is actually still static MC
              options << option
            when "TextQuestion"
              #follow-up item is a text_field response (nested question)
              follow_up[:follow_up_type] = "TextFieldResponse"
              follow_up[:section] = section_obj
              follow_up[:under_question] = question_obj

              follow_up[:question_body] = list_item["title"]
              follow_up[:question_type] = "TextField"

              #Question Saved
              new_question_obj = Question.create!(
                section: section_obj,
                question_body: list_item["title"],
                question_type: "TextField",
                is_follow_up_flag: true,
                follow_up_to_option: option_position
              )
              FollowUpManager.create!(parent: question_obj, follow_up: new_question_obj)
              question_obj.update(has_follow_up_flag: true)

              option[:has_follow_up_flag] = true
              option[:follow_ups] = new_question_obj
              options << option

              follow_ups << follow_up
              list_output[:follow_up] = true
            when "ListOfQuestions"
              #ChildItem subnest
              follow_up[:follow_up_type] = "ListOfQuestions"
              follow_up[:section] = section_obj
              follow_up[:under_question] = question_obj

              follow_up[:next] = fup_output[:subquestions]
              #follow-up item is a list of questions under ChildItems

              option[:has_follow_up_flag] = true
              option[:follow_ups] = fup_output[:subquestions]
              options << option

              follow_ups << follow_up
              list_output[:follow_up] = true
            end

          else
            #No Children
            option = { value: list_item["title"], position: option_position }
            options << option
          end
        option_position = option_position + 1
        end
      end

      list_output[:options] = options
      list_output[:follow_ups] = follow_ups

      if list_output[:list_type] == "MC_Coded"
        list_output[:follow_up] = false
        #list_output[:follow_up] = []
      end
    end
    list_output
  end

  def handle_list_item_fup(list_item_fup, section_obj, unfilled_form, question_obj, option_position)
    #List_item_fup = ListItemResponseField, CodedValue, ChildItems types
    fup_output = { type: "Filler" }
    #For each ListItem that has a child, it'll either be a coded-response field, a response field or a nested question.
    #Basically they're all sub-questions.
    subquestion_list = []
    case list_item_fup.name
    when "ListItemResponseField"
      fup_output[:type] = "TextQuestion"
    when "CodedValue"
      fup_output[:type] = "CodedAnswer"
    when "ChildItems"
      fup_output[:type] = "ListOfQuestions"
      #Generate Subquestion_list
      list_item_fup.children.each do |sub_item|
        case sub_item.name
        when "Question"
          sub_question_obj = Question.create!(
            section: section_obj,
            is_follow_up_flag: true,
            follow_up_to_option: option_position)
          FollowUpManager.create!(parent: question_obj, follow_up: sub_question_obj)
          question_obj.update(has_follow_up_flag: true)

          subquestion_list << handle_question(sub_item, section_obj, unfilled_form, sub_question_obj)
          fup_output[:subquestions] = subquestion_list
        end
      end
    end

    fup_output
  end

  private

  # def parse_template
  #   TemplateConverterWorker.perform_async(id)
  # end
end
