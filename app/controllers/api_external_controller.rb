class ApiExternalController < ApplicationController

	def medley_show
		@medley = Medley.where("id = ?", params[:id])
		if !@medley.exists?
			render :json => { :error => "This Medley Does Not Exist"}
		else
			@medley = @medley.first
		end
	end

end