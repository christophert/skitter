require 'test_helper'

class SkitreplyControllerTest < ActionDispatch::IntegrationTest
  test "should get AddSkitReply" do
    get skitreply_AddSkitReply_url
    assert_response :success
  end

  test "should get new" do
    get skitreply_new_url
    assert_response :success
  end

  test "should get create" do
    get skitreply_create_url
    assert_response :success
  end

end
