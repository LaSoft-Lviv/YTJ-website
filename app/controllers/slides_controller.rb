class SlidesController < ApplicationController
  def create
    is_save = true
    errors = []
    params[:images].each do |image|
      @slide = Slide.new(description: params[:description], image: image)
      unless  @slide.save
        errors<<@slide.errors.full_messages
        is_save = false
      end
    end
    if is_save
      render json: { status: true }
    else
      render json: { status: false, errors: errors}
    end

  end

  def edit
  end

  def update
  end

  def destroy
  end
  def slide_params
    params.permit( :id, :description,:count )
  end
end
