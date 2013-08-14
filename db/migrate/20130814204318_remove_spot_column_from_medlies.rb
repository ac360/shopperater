class RemoveSpotColumnFromMedlies < ActiveRecord::Migration
  def change
    	remove_column :medleys, :item_one_spot
    	remove_column :medleys, :item_two_spot
    	remove_column :medleys, :item_three_spot
    	remove_column :medleys, :item_four_spot
    	remove_column :medleys, :item_five_spot
    	remove_column :medleys, :item_six_spot
    	remove_column :medleys, :item_seven_spot
    	remove_column :medleys, :item_eight_spot
    	remove_column :medleys, :item_nine_spot
    	remove_column :medleys, :item_ten_spot
    	remove_column :medleys, :item_eleven_spot
    	remove_column :medleys, :item_twelve_spot
    	remove_column :medleys, :item_thirteen_spot
    	remove_column :medleys, :item_fourteen_spot
    	remove_column :medleys, :item_fifteen_spot
    	remove_column :medleys, :item_sixteen_spot
  	end
end
