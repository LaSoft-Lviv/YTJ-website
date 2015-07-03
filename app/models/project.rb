class Project < ActiveRecord::Base
  has_many :team_members_projects
  has_many :team_members, -> { select 'team_members.*, team_members_projects.coordinator as coordinator' }, :through => :team_members_projects

  def as_json(options={})
    super(options.merge(:include => {:team_members => {:only => [:name, :surname, :position, :phone, :facebook_link, :coordinator]}},
                        :only => [:name, :description, :date_of, :image]))
  end

end
