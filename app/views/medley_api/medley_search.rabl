collection @medleys
attributes :id, :title, :user_id, :description, :category, :votes, :remix_of, :tag_1_id, :tag_2_id, :tag_3_id

node(:items, :object_root => false) do |m|
	  [{ :id => m.i1_id, :source => m.i1_source, :title => m.i1_title, :custom_title => m.i1_custom_title, :price => m.i1_price, :img_small => m.i1_img_small, :img_big => m.i1_img_big, :category => m.i1_category, :link => m.i1_link, :x => m.i1_x, :y => m.i1_y, :c => m.i1_c, :r => m.i1_r },

	  {  :id => m.i2_id, :source => m.i2_source, :title => m.i2_title, :custom_title => m.i2_custom_title, :price => m.i2_price, :img_small => m.i2_img_small, :img_big => m.i2_img_big, :category => m.i2_category, :link => m.i2_link, :x => m.i2_x, :y => m.i2_y, :c => m.i2_c, :r => m.i2_r },

	  {  :id => m.i3_id, :source => m.i3_source, :title => m.i3_title, :custom_title => m.i3_custom_title, :price => m.i3_price, :img_small => m.i3_img_small, :img_big => m.i3_img_big, :category => m.i3_category, :link => m.i3_link, :x => m.i3_x, :y => m.i3_y, :c => m.i3_c, :r => m.i3_r },

	  {  :id => m.i4_id, :source => m.i4_source, :title => m.i4_title, :custom_title => m.i4_custom_title, :price => m.i4_price, :img_small => m.i4_img_small, :img_big => m.i4_img_big, :category => m.i4_category, :link => m.i4_link, :x => m.i4_x, :y => m.i4_y, :c => m.i4_c, :r => m.i4_r },

	  {  :id => m.i5_id, :source => m.i5_source, :title => m.i5_title, :custom_title => m.i5_custom_title, :price => m.i5_price, :img_small => m.i5_img_small, :img_big => m.i5_img_big, :category => m.i5_category, :link => m.i5_link, :x => m.i5_x, :y => m.i5_y, :c => m.i5_c, :r => m.i5_r },

	  {  :id => m.i6_id, :source => m.i6_source, :title => m.i6_title, :custom_title => m.i6_custom_title, :price => m.i6_price, :img_small => m.i6_img_small, :img_big => m.i6_img_big, :category => m.i6_category, :link => m.i6_link, :x => m.i6_x, :y => m.i6_y, :c => m.i6_c, :r => m.i6_r },

	  {  :id => m.i7_id, :source => m.i7_source, :title => m.i7_title, :custom_title => m.i7_custom_title, :price => m.i7_price, :img_small => m.i7_img_small, :img_big => m.i7_img_big, :category => m.i7_category, :link => m.i7_link, :x => m.i7_x, :y => m.i7_y, :c => m.i7_c, :r => m.i7_r },

	  {  :id => m.i8_id, :source => m.i8_source, :title => m.i8_title, :custom_title => m.i8_custom_title, :price => m.i8_price, :img_small => m.i8_img_small, :img_big => m.i8_img_big, :category => m.i8_category, :link => m.i8_link, :x => m.i8_x, :y => m.i8_y, :c => m.i8_c, :r => m.i8_r },

	  {  :id => m.i9_id, :source => m.i9_source, :title => m.i9_title, :custom_title => m.i9_custom_title, :price => m.i9_price, :img_small => m.i9_img_small, :img_big => m.i9_img_big, :category => m.i9_category, :link => m.i9_link, :x => m.i9_x, :y => m.i9_y, :c => m.i9_c, :r => m.i9_r },

	  {  :id => m.i10_id, :source => m.i10_source, :title => m.i10_title, :custom_title => m.i10_custom_title, :price => m.i10_price, :img_small => m.i10_img_small, :img_big => m.i10_img_big, :category => m.i10_category, :link => m.i10_link, :x => m.i10_x, :y => m.i10_y, :c => m.i10_c, :r => m.i10_r },

	  {  :id => m.i11_id, :source => m.i11_source, :title => m.i11_title, :custom_title => m.i11_custom_title, :price => m.i11_price, :img_small => m.i11_img_small, :img_big => m.i11_img_big, :category => m.i11_category, :link => m.i11_link, :x => m.i11_x, :y => m.i11_y, :c => m.i11_c, :r => m.i11_r },

	  {  :id => m.i12_id, :source => m.i12_source, :title => m.i12_title, :custom_title => m.i12_custom_title, :price => m.i12_price, :img_small => m.i12_img_small, :img_big => m.i12_img_big, :category => m.i12_category, :link => m.i12_link, :x => m.i12_x, :y => m.i12_y, :c => m.i12_c, :r => m.i12_r },

	  {  :id => m.i13_id, :source => m.i13_source, :title => m.i13_title, :custom_title => m.i13_custom_title, :price => m.i13_price, :img_small => m.i13_img_small, :img_big => m.i13_img_big, :category => m.i13_category, :link => m.i13_link, :x => m.i13_x, :y => m.i13_y, :c => m.i13_c, :r => m.i13_r },

	  {  :id => m.i14_id, :source => m.i14_source, :title => m.i14_title, :custom_title => m.i14_custom_title, :price => m.i14_price, :img_small => m.i14_img_small, :img_big => m.i14_img_big, :category => m.i14_category, :link => m.i14_link, :x => m.i14_x, :y => m.i14_y, :c => m.i14_c, :r => m.i14_r },

	  {  :id => m.i15_id, :source => m.i15_source, :title => m.i15_title, :custom_title => m.i15_custom_title, :price => m.i15_price, :img_small => m.i15_img_small, :img_big => m.i15_img_big, :category => m.i15_category, :link => m.i15_link, :x => m.i15_x, :y => m.i15_y, :c => m.i15_c, :r => m.i15_r },

	  {  :id => m.i16_id, :source => m.i16_source, :title => m.i16_title, :custom_title => m.i16_custom_title, :price => m.i16_price, :img_small => m.i16_img_small, :img_big => m.i16_img_big, :category => m.i16_category, :link => m.i16_link, :x => m.i16_x, :y => m.i16_y, :c => m.i16_c, :r => m.i16_r }

	  ]
end

child :user do
  attributes :id, :affiliate_id
end




