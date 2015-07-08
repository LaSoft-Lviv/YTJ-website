#!/usr/bin/env bash

echo "Add vagrant user to rvm group"
sudo usermod -a -G rvm vagrant

echo "Provisioning virtual machine..."

echo "Installing nodejs"
sudo apt-get install nodejs
echo "Finish installing nodejs"

echo "Installing htop"
sudo apt-get install htop
echo "Finish installing htop"

echo "Installing Git"
sudo apt-get install git -y > /dev/null
echo "Finish installing Git"

echo "Installing PostgreSQL"
sudo apt-get install postgresql postgresql-contrib -y > /dev/null
sudo -u postgres createuser --superuser 'vagrant'
echo "Finish installing PostgreSQL"

echo "Installing RVM"
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
sudo curl -sSL https://get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm install ruby-2.2.2
#sudo usermod -a -G rvm vagrant
echo "Finish installing RVM"

echo "Installing libpg for PostgreSQL"
sudo apt-get install libpq-dev -y > /dev/null
echo "Finish installing library"