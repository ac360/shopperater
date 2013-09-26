class ApplicationController < ActionController::Base
  protect_from_forgery
  layout :layout_by_resource

  def after_sign_in_path_for(resource) 
    session["user_return_to"] || root_path
  end

  def after_update_path_for(resource)
    session["user_return_to"] || root_path
  end

  def after_sign_out_path_for(resource)
    session["user_return_to"] || root_path
  end

  private

  def create_affiliate_urls(medley_results)

    medley_results.each do |m|
          user = User.find(m.user_id)
          if user.affiliate_id != "medley01-20"
              m.i1_link  = m.i1_link.gsub! "medley01-20", user.affiliate_id   if m.i1_link.present?
              m.i2_link  = m.i2_link.gsub! "medley01-20", user.affiliate_id   if m.i2_link.present?
              m.i3_link  = m.i3_link.gsub! "medley01-20", user.affiliate_id   if m.i3_link.present?
              m.i4_link  = m.i4_link.gsub! "medley01-20", user.affiliate_id   if m.i4_link.present?
              m.i5_link  = m.i5_link.gsub! "medley01-20", user.affiliate_id   if m.i5_link.present?
              m.i6_link  = m.i6_link.gsub! "medley01-20", user.affiliate_id   if m.i6_link.present?
              m.i7_link  = m.i7_link.gsub! "medley01-20", user.affiliate_id   if m.i7_link.present?
              m.i8_link  = m.i8_link.gsub! "medley01-20", user.affiliate_id   if m.i8_link.present?
              m.i9_link  = m.i9_link.gsub! "medley01-20", user.affiliate_id   if m.i9_link.present?
              m.i10_link = m.i10_link.gsub! "medley01-20", user.affiliate_id  if m.i10_link.present?
              m.i11_link = m.i11_link.gsub! "medley01-20", user.affiliate_id  if m.i11_link.present?
              m.i12_link = m.i12_link.gsub! "medley01-20", user.affiliate_id  if m.i12_link.present?
              m.i13_link = m.i13_link.gsub! "medley01-20", user.affiliate_id  if m.i13_link.present?
              m.i14_link = m.i14_link.gsub! "medley01-20", user.affiliate_id  if m.i14_link.present?
              m.i15_link = m.i15_link.gsub! "medley01-20", user.affiliate_id  if m.i15_link.present?
              m.i16_link = m.i16_link.gsub! "medley01-20", user.affiliate_id  if m.i16_link.present?
          end
    end 

    return medley_results
    
  end

  def layout_by_resource
    if devise_controller?
      "devise"
    else
      "application"
    end
  end

end
