class TemplateConverterWorker
  include Sidekiq::Worker
  sidekiq_options retry: false, queue: "default"

  def perform(id)
    template = Template.find(id)
    xml = Nokogiri.XML(template.uploaded_template)
    query_string = "SDCPackage > XMLPackage > FormDesign > Body > ChildItems"
    output = {
      type: "StartingNode"
    }
    starting_node_children = []   # Section Nodes
    xml.css(query_string).children.each do |section|
      unless section.text?
        # Each section has child items
        section_output = { 
          type: "Section",
          value: section['title'],
        }
        child_items = section.at("ChildItems")
        section_children = []
        unless child_items.blank?
          child_items.children.each do |child_item|
            # ChildItem can have Question(s) or Section(s)
            unless child_item.text?
              case child_item.name
              when "Section"
                section_children << handle_section(child_item)
              when "ResponseField"
                section_children << {
                  type: "Section",
                  value: section['title'],
                  next: handle_response_field(child_item)
                }
              when "Question"
                section_children << handle_question(child_item)
              end
            end
          end
          starting_node_children << section_output
          section_output[:next] = section_children
        end
        output[:next] = starting_node_children
      end
    end
    template.update(parsed_template: output.to_json)
    ActionCable.server.broadcast 'templates', output.to_json
  end

  private

  # Handle nested sections
  def handle_section(section)
    output = {
      type: "Section",
      value: section['title']
    }
    children = []

    child_items = section.at("ChildItems").children
    child_items.each do |child|
      unless child.text?
        case child.name
        when "Question"
          children << handle_question(child)
        end
      end
    end
    output[:next] = children
    output
  end

  def handle_response_field(response_field)
    output = {
      type: "Response"
    }
    response_field.children.each do |res_field|
      if res_field.name == "Response"
        res_field.children.each do |res_val|
          unless res_val.text?
            output[:value] = res_val.name
          end
        end
      elsif res_field.name == "TextAfterResponse"
        output[:hint] = res_field['val']
      end
    end
    output
  end

  def handle_question(question)
    output = {
      type: "Question",
      value: question["title"],
    }
    children = []
    question.children.each do |question_item|
      case question_item.name
      when "ListField"
        children << handle_list_field(question_item)
      when "ResponseField"
        children << handle_response_field(question_item)
      when "ChildItems"
        children << handle_child_items(question_item)
      end
    end
    output[:next] = children
    output
  end

  def handle_child_items(child_items)
    output = {
      type: "FollowUpQuestions"
    }
    children = []
    child_items.children.each do |child|
      unless child.text?
        case child.name
        when "Question"
          children << handle_question(child)
        end
      end
    end
    output[:next] = children
    output
  end

  def handle_list_field(list_field)
    output = {}
    list_field.children.each do |list|
      if list.name == "List"
        output.merge!(handle_list(list))
      end
    end
    output
  end

  def handle_list(list)
    output = {
      type: "List"
    }
    items = []
    list.children.each do |list_item|
      # ListItem can contain itself or children
      unless list_item.text?
        if list_item.children.any?
          items << {
            name: list_item["name"],
            title: list_item["title"],
            id: list_item["ID"],
            next: handle_list_field_children(list_item.children)
          }
        else
          items << {
            name: list_item["name"],
            title: list_item["title"],
            id: list_item["ID"]
          }
        end
      end
    end
    output[:values] = items
    output
  end

  def handle_list_field_children(list_field_children)
    output = {
      type: "ListItemResponseField"
    }
    items = []
    list_field_children.children.each do |lf_child|
      case lf_child.name
      when "Response"
        items << { type: "Response", value: lf_child.children.first.name }
      when "TextAfterResponse"
        items << { type: "TextAfterResponse", value: lf_child['val'] }
      when "Question"
        items << handle_question(lf_child)
      end
    end
    output[:values] = items
    output
  end
end