class MainController < ApplicationController

	def browser
		session["user_return_to"] = request.url
	end

	def editor
		session["user_return_to"] = request.url
	end

end
