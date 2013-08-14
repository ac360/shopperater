# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130814031447) do

  create_table "cart_items", :force => true do |t|
    t.string   "product_name"
    t.string   "product_id"
    t.string   "product_source"
    t.string   "product_image"
    t.string   "product_category"
    t.string   "product_referral_link"
    t.integer  "user_id"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
    t.string   "product_price"
  end

  create_table "medleys", :force => true do |t|
    t.string   "title"
    t.integer  "user_id"
    t.text     "description"
    t.string   "item_one_id"
    t.string   "item_one_title"
    t.string   "item_one_price"
    t.string   "item_one_image"
    t.string   "item_one_category"
    t.string   "item_one_source"
    t.string   "item_one_affiliate_link"
    t.integer  "item_one_spot"
    t.string   "item_two_id"
    t.string   "item_two_title"
    t.string   "item_two_price"
    t.string   "item_two_image"
    t.string   "item_two_category"
    t.string   "item_two_source"
    t.string   "item_two_affiliate_link"
    t.integer  "item_two_spot"
    t.string   "item_three_id"
    t.string   "item_three_title"
    t.string   "item_three_price"
    t.string   "item_three_image"
    t.string   "item_three_category"
    t.string   "item_three_source"
    t.string   "item_three_affiliate_link"
    t.integer  "item_three_spot"
    t.string   "item_four_id"
    t.string   "item_four_title"
    t.string   "item_four_price"
    t.string   "item_four_image"
    t.string   "item_four_category"
    t.string   "item_four_source"
    t.string   "item_four_affiliate_link"
    t.integer  "item_four_spot"
    t.string   "item_five_id"
    t.string   "item_five_title"
    t.string   "item_five_price"
    t.string   "item_five_image"
    t.string   "item_five_category"
    t.string   "item_five_source"
    t.string   "item_five_affiliate_link"
    t.integer  "item_five_spot"
    t.string   "item_six_id"
    t.string   "item_six_title"
    t.string   "item_six_price"
    t.string   "item_six_image"
    t.string   "item_six_category"
    t.string   "item_six_source"
    t.string   "item_six_affiliate_link"
    t.integer  "item_six_spot"
    t.string   "item_seven_id"
    t.string   "item_seven_title"
    t.string   "item_seven_price"
    t.string   "item_seven_image"
    t.string   "item_seven_category"
    t.string   "item_seven_source"
    t.string   "item_seven_affiliate_link"
    t.integer  "item_seven_spot"
    t.string   "item_eight_id"
    t.string   "item_eight_title"
    t.string   "item_eight_price"
    t.string   "item_eight_image"
    t.string   "item_eight_category"
    t.string   "item_eight_source"
    t.string   "item_eight_affiliate_link"
    t.integer  "item_eight_spot"
    t.string   "item_nine_id"
    t.string   "item_nine_title"
    t.string   "item_nine_price"
    t.string   "item_nine_image"
    t.string   "item_nine_category"
    t.string   "item_nine_source"
    t.string   "item_nine_affiliate_link"
    t.integer  "item_nine_spot"
    t.string   "item_ten_id"
    t.string   "item_ten_title"
    t.string   "item_ten_price"
    t.string   "item_ten_image"
    t.string   "item_ten_category"
    t.string   "item_ten_source"
    t.string   "item_ten_affiliate_link"
    t.integer  "item_ten_spot"
    t.string   "item_eleven_id"
    t.string   "item_eleven_title"
    t.string   "item_eleven_price"
    t.string   "item_eleven_image"
    t.string   "item_eleven_category"
    t.string   "item_eleven_source"
    t.string   "item_eleven_affiliate_link"
    t.integer  "item_eleven_spot"
    t.string   "item_twleve_id"
    t.string   "item_twleve_title"
    t.string   "item_twleve_price"
    t.string   "item_twleve_image"
    t.string   "item_twleve_category"
    t.string   "item_twleve_source"
    t.string   "item_twleve_affiliate_link"
    t.integer  "item_twelve_spot"
    t.string   "item_thirteen_id"
    t.string   "item_thirteen_title"
    t.string   "item_thirteen_price"
    t.string   "item_thirteen_image"
    t.string   "item_thirteen_category"
    t.string   "item_thirteen_source"
    t.string   "item_thirteen_affiliate_link"
    t.integer  "item_thirteen_spot"
    t.string   "item_fourteen_id"
    t.string   "item_fourteen_title"
    t.string   "item_fourteen_price"
    t.string   "item_fourteen_image"
    t.string   "item_fourteen_category"
    t.string   "item_fourteen_source"
    t.string   "item_fourteen_affiliate_link"
    t.integer  "item_fourteen_spot"
    t.string   "item_fifteen_id"
    t.string   "item_fifteen_title"
    t.string   "item_fifteen_price"
    t.string   "item_fifteen_image"
    t.string   "item_fifteen_category"
    t.string   "item_fifteen_source"
    t.string   "item_fifteen_affiliate_link"
    t.integer  "item_fifteen_spot"
    t.string   "item_sixteen_id"
    t.string   "item_sixteen_title"
    t.string   "item_sixteen_price"
    t.string   "item_sixteen_image"
    t.string   "item_sixteen_category"
    t.string   "item_sixteen_source"
    t.string   "item_sixteen_affiliate_link"
    t.integer  "item_sixteen_spot"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                                 :default => "", :null => false
    t.string   "encrypted_password",     :limit => 128, :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                         :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                            :null => false
    t.datetime "updated_at",                                            :null => false
    t.string   "username"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
