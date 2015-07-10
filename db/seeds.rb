# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


#projects = Project.create([{ name: 'project1', description: 'some description1', date_of: '22/07/2015', image: '1.jpeg'},
#                           { name: 'project2', description: 'some description2', date_of: '22/07/2015', image: '2.jpg'},
#                           { name: 'project3', description: 'some description3', date_of: '22/07/2015', image: '1.jpeg'},
#                           { name: 'project4', description: 'some description4', date_of: '22/07/2015', image: '2.jpg'},
#                           { name: 'project5', description: 'some description5', date_of: '22/07/2015', image: '1.jpeg'}])

#team_members = TeamMember.create([{ name: 'namefirst', surname: 'surfirst', position: 'developer', quote: 'some quote', foto_url: '1.jpg', phone: '1234455', facebook_link: 'www.facebook/dfff', is_initiative: true },
#                                 { name: 'namesecond', surname: 'sursecond', position: 'admin', quote: 'some quote', foto_url: '1.jpg', phone: '1234455', facebook_link: 'www.facebook/dfff', is_initiative: false },
#                                 { name: 'namethird', surname: 'surthird', position: 'developer', quote: 'some quote', foto_url: '1.jpg', phone: '1234455', facebook_link: 'www.facebook/dfff', is_initiative: true },
#                                 { name: 'nameforth', surname: 'surforth', position: 'graphic', quote: 'some quote', foto_url: '1.jpg', phone: '1234455', facebook_link: 'www.facebook/dfff', is_initiative: true },
#                                  { name: 'namesixth', surname: 'sursixth', position: 'developer', quote: 'some quote', foto_url: '1.jpg', phone: '1234455', facebook_link: 'www.facebook/dfff', is_initiative: true } ])

#team_member_projects = TeamMembersProject.create([{ coordinator: true, team_member: TeamMember.find_by_name('namefirst'), project: Project.find_by_name('project1') },
#                                                  { coordinator: false, team_member: TeamMember.find_by_name('namesecond'), project: Project.find_by_name( 'project1') },
#                                                  { coordinator: false, team_member: TeamMember.find_by_name('namesixth'), project: Project.find_by_name('project1') },
#                                                  { coordinator: true, team_member: TeamMember.find_by_name('namesecond'), project: Project.find_by_name('project12') },
#                                                  { coordinator: false, team_member: TeamMember.find_by_name('namethird'), project: Project.find_by_name('project2') },
#                                                  { coordinator: true, team_member: TeamMember.find_by_name('nameforth'), project: Project.find_by_name('project3') },
#                                                  { coordinator: true, team_member: TeamMember.find_by_name('namesixth'), project: Project.find_by_name('project4') },
#                                                  { coordinator: true, team_member: TeamMember.find_by_name('namesecond'), project: Project.find_by_name('project5') },
#                                                  { coordinator: false, team_member: TeamMember.find_by_name('nameforth'), project: Project.find_by_name('project5') }])
