class AddRemixOfColumnToMedleys < ActiveRecord::Migration
  def change
  	add_column :medleys, :remix_of, :integer
  end
end
