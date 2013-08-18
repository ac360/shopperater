class RecreateMedleysTable < ActiveRecord::Migration
  def change

  	drop_table   :medleys

    create_table :medleys do |t|

      t.string 		:title
      t.integer 	:user_id
      t.text 		:description
      t.string 		:category
      t.string 		:tag_1	
      t.string 		:tag_2
      t.string 		:tag_3	
      t.integer     :votes	

      t.string  	:i1_id
      t.string  	:i1_source
      t.string  	:i1_title
      t.string  	:i1_custom_title
      t.string  	:i1_price
      t.string  	:i1_img_small
      t.string  	:i1_img_big
      t.string  	:i1_category
      t.string  	:i1_link
      t.integer 	:i1_x
      t.integer 	:i1_y
      t.integer 	:i1_c
      t.integer 	:i1_r

      t.string  	:i2_id
      t.string  	:i2_source
      t.string  	:i2_title
      t.string  	:i2_custom_title
      t.string  	:i2_price
      t.string  	:i2_img_small
      t.string  	:i2_img_big
      t.string  	:i2_category
      t.string  	:i2_link
      t.integer 	:i2_x
      t.integer 	:i2_y
      t.integer 	:i2_c
      t.integer 	:i2_r

      t.string  	:i3_id
      t.string  	:i3_source
      t.string  	:i3_title
      t.string  	:i3_custom_title
      t.string  	:i3_price
      t.string  	:i3_img_small
      t.string  	:i3_img_big
      t.string  	:i3_category
      t.string  	:i3_link
      t.integer 	:i3_x
      t.integer 	:i3_y
      t.integer 	:i3_c
      t.integer 	:i3_r

      t.string  	:i4_id
      t.string  	:i4_source
      t.string  	:i4_title
      t.string  	:i4_custom_title
      t.string  	:i4_price
      t.string  	:i4_img_small
      t.string  	:i4_img_big
      t.string  	:i4_category
      t.string  	:i4_link
      t.integer 	:i4_x
      t.integer 	:i4_y
      t.integer 	:i4_c
      t.integer 	:i4_r

      t.string  	:i5_id
      t.string  	:i5_source
      t.string  	:i5_title
      t.string  	:i5_custom_title
      t.string  	:i5_price
      t.string  	:i5_img_small
      t.string  	:i5_img_big
      t.string  	:i5_category
      t.string  	:i5_link
      t.integer 	:i5_x
      t.integer 	:i5_y
      t.integer 	:i5_c
      t.integer 	:i5_r

      t.string  	:i6_id
      t.string  	:i6_source
      t.string  	:i6_title
      t.string  	:i6_custom_title
      t.string  	:i6_price
      t.string  	:i6_img_small
      t.string  	:i6_img_big
      t.string  	:i6_category
      t.string  	:i6_link
      t.integer 	:i6_x
      t.integer 	:i6_y
      t.integer 	:i6_c
      t.integer 	:i6_r

      t.string  	:i7_id
      t.string  	:i7_source
      t.string  	:i7_title
      t.string  	:i7_custom_title
      t.string  	:i7_price
      t.string  	:i7_img_small
      t.string  	:i7_img_big
      t.string  	:i7_category
      t.string  	:i7_link
      t.integer 	:i7_x
      t.integer 	:i7_y
      t.integer 	:i7_c
      t.integer 	:i7_r

      t.string  	:i8_id
      t.string  	:i8_source
      t.string  	:i8_title
      t.string  	:i8_custom_title
      t.string  	:i8_price
      t.string  	:i8_img_small
      t.string  	:i8_img_big
      t.string  	:i8_category
      t.string  	:i8_link
      t.integer 	:i8_x
      t.integer 	:i8_y
      t.integer 	:i8_c
      t.integer 	:i8_r

      t.string  	:i9_id
      t.string  	:i9_source
      t.string  	:i9_title
      t.string  	:i9_custom_title
      t.string  	:i9_price
      t.string  	:i9_img_small
      t.string  	:i9_img_big
      t.string  	:i9_category
      t.string  	:i9_link
      t.integer 	:i9_x
      t.integer 	:i9_y
      t.integer 	:i9_c
      t.integer 	:i9_r

      t.string  	:i10_id
      t.string  	:i10_source
      t.string  	:i10_title
      t.string  	:i10_custom_title
      t.string  	:i10_price
      t.string  	:i10_img_small
      t.string  	:i10_img_big
      t.string  	:i10_category
      t.string  	:i10_link
      t.integer 	:i10_x
      t.integer 	:i10_y
      t.integer 	:i10_c
      t.integer 	:i10_r

      t.string  	:i11_id
      t.string  	:i11_source
      t.string  	:i11_title
      t.string  	:i11_custom_title
      t.string  	:i11_price
      t.string  	:i11_img_small
      t.string  	:i11_img_big
      t.string  	:i11_category
      t.string  	:i11_link
      t.integer 	:i11_x
      t.integer 	:i11_y
      t.integer 	:i11_c
      t.integer 	:i11_r

      t.string  	:i12_id
      t.string  	:i12_source
      t.string  	:i12_title
      t.string  	:i12_custom_title
      t.string  	:i12_price
      t.string  	:i12_img_small
      t.string  	:i12_img_big
      t.string  	:i12_category
      t.string  	:i12_link
      t.integer 	:i12_x
      t.integer 	:i12_y
      t.integer 	:i12_c
      t.integer 	:i12_r

      t.string  	:i13_id
      t.string  	:i13_source
      t.string  	:i13_title
      t.string  	:i13_custom_title
      t.string  	:i13_price
      t.string  	:i13_img_small
      t.string  	:i13_img_big
      t.string  	:i13_category
      t.string  	:i13_link
      t.integer 	:i13_x
      t.integer 	:i13_y
      t.integer 	:i13_c
      t.integer 	:i13_r

      t.string  	:i14_id
      t.string  	:i14_source
      t.string  	:i14_title
      t.string  	:i14_custom_title
      t.string  	:i14_price
      t.string  	:i14_img_small
      t.string  	:i14_img_big
      t.string  	:i14_category
      t.string  	:i14_link
      t.integer 	:i14_x
      t.integer 	:i14_y
      t.integer 	:i14_c
      t.integer 	:i14_r

      t.string  	:i15_id
      t.string  	:i15_source
      t.string  	:i15_title
      t.string  	:i15_custom_title
      t.string  	:i15_price
      t.string  	:i15_img_small
      t.string  	:i15_img_big
      t.string  	:i15_category
      t.string  	:i15_link
      t.integer 	:i15_x
      t.integer 	:i15_y
      t.integer 	:i15_c
      t.integer 	:i15_r

      t.string  	:i16_id
      t.string  	:i16_source
      t.string  	:i16_title
      t.string  	:i16_custom_title
      t.string  	:i16_price
      t.string  	:i16_img_small
      t.string  	:i16_img_big
      t.string  	:i16_category
      t.string  	:i16_link
      t.integer 	:i16_x
      t.integer 	:i16_y
      t.integer 	:i16_c
      t.integer 	:i16_r

      t.timestamps
    end
  end
end
