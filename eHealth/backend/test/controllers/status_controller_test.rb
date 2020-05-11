require 'test_helper'

class StatusControllerTest < ActionDispatch::IntegrationTest
  test "should get statuscheck" do
    get status_statuscheck_url
    assert_response :success
  end

end
