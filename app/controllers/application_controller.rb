class ApplicationController < ActionController::Base
  protect_from_forgery
  layout :layout_by_resource

  def after_sign_in_path_for(resource) 
    session["user_return_to"] || root_path
  end

  def after_sign_out_path_for(resource)
    session["user_return_to"] || root_path
  end

  private

  def layout_by_resource
    if devise_controller?
      "devise"
    else
      "application"
    end
  end

  def medley_extra_formatter(medleys)
    medleys.each do |m|
      m.i1_title  = m.i1_title.split(",", 2).first   if m.i1_title.present? 
      m.i2_title  = m.i2_title.split(",", 2).first   if m.i2_title.present? 
      m.i3_title  = m.i3_title.split(",", 2).first   if m.i3_title.present? 
      m.i4_title  = m.i4_title.split(",", 2).first   if m.i4_title.present? 
      m.i5_title  = m.i5_title.split(",", 2).first   if m.i5_title.present? 
      m.i6_title  = m.i6_title.split(",", 2).first   if m.i6_title.present? 
      m.i7_title  = m.i7_title.split(",", 2).first   if m.i7_title.present? 
      m.i8_title  = m.i8_title.split(",", 2).first   if m.i8_title.present? 
      m.i9_title  = m.i9_title.split(",", 2).first   if m.i9_title.present? 
      m.i10_title = m.i10_title.split(",", 2).first  if m.i10_title.present? 
      m.i11_title = m.i11_title.split(",", 2).first  if m.i11_title.present? 
      m.i12_title = m.i12_title.split(",", 2).first  if m.i12_title.present? 
      m.i13_title = m.i13_title.split(",", 2).first  if m.i13_title.present? 
      m.i14_title = m.i14_title.split(",", 2).first  if m.i14_title.present? 
      m.i15_title = m.i15_title.split(",", 2).first  if m.i15_title.present? 
      m.i16_title = m.i16_title.split(",", 2).first  if m.i16_title.present? 
    end
    return medleys
  end

end
