class ApiExternalController < ApplicationController

	def medley_show
		@medley = Medley.find(params[:id])
	end

end