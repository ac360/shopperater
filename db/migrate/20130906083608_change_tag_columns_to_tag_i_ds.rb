class ChangeTagColumnsToTagIDs < ActiveRecord::Migration
  def change
    	remove_column :medleys, :tag_1
    	remove_column :medleys, :tag_2
    	remove_column :medleys, :tag_3
    	add_column    :medleys, :tag_1_id, :integer
    	add_column    :medleys, :tag_2_id, :integer
    	add_column    :medleys, :tag_3_id, :integer
  	end
end
