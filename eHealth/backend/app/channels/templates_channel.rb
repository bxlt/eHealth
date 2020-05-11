class TemplatesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "templates"
  end

  def unsubscribed
  end
end
