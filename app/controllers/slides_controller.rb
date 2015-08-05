class SlidesController < ApplicationController

  def index
    @slides = Slide.all().order("created_at DESC")
    render json: { status: true, slides: @slides }
  end

  def create
    is_save = true
    errors = []
    params[:images].each do |image|
      @slide = Slide.new(description: params[:description], image: image)
      unless  @slide.save
        errors<<@slide.errors
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
    @slide = Slide.find(params[:id])
    if @slide
      render json:  {status: true, slide: @slide }
    else
      render json: { status: false, errors: 'not found' }
    end
  end

  def update
    @slide = Slide.find(params[:id])
    if @slide.update(slide_params)
      render json:  {status: true, slide: @slide }
    else
      render json: { status: false, errors: @slide.errors }
    end
  end

  def destroy
    @slide = Slide.find(params[:id])
    @slide.destroy!
    render json:  {status: true, slides: Slide.all() }
  end

  private

  def slide_params
    params.permit(:id, :description, :image )
  end
end
