# Digital Time Capsule

### Release Notes for Version 1.0:
#### New Software Features:
* Created new friends page.
* Created new search page.
* Created new settings page.
* Can add and delete friends from friends lists.
* Can request to join or leave a capsule.
* Can add and remove contributors from a capsule.
* Can now delete capsules.
* Can change settings.
#### Bug Fixes:
* Fixed issues with adding friends.
* Fixed issues with adding new capsules.
* After adding a new contributor to a capsule, the add button no longer duplicates the options in the dropdown.
* Blue overlay on subpages is no longer set to a fixed size.
* Media positions (x,y) on the webpage are now saved.
* Fixed z-index issues on the MyCapsules and Search pages.
#### Known Bugs and Defects:
* You cannot press the enter key to log into the application on the welcome page.
* Refreshing breaks the backend calls to get user information.
* Not connected through Georgia Tech login.
* Cannot upload same media instance to multiple capsules simultaneously.
* Playlist option in the "Add Music" modal does not do anything.

## Install Guide:

### Pre-requisites:
[Install Node.js 6.X or higher](https://nodejs.org/en/download/) on your machine.
If using a production build, create a virtual machine to host the application. We suggest Amazon Web Services: [AWS EC2 instance](https://aws.amazon.com/ec2/instance-types/). Note that the requirements for the virtual machine (# vCPUs, memory, storage) may change depending on the number of users.

### Dependencies:
1. [MongoDB](https://www.mongodb.com/)
2. [Python 2.X](https://www.python.org/downloads/)

#### Steps to Install MongoDB:
1. [Install MongoDB](https://docs.mongodb.com/manual/administration/install-community) and choose the correct distribution (Linux, MacOS, Windows) of MongoDB Community Edition. Please follow the corresponding instructions for your distribution. The following instructions are for Windows hosts. 
2. Start the MongoDB service: ```net start MongoDB```
3. Verify that MongoDB has started successfully: ```[initandlisten] waiting for connections on port 27017```

### Download Instructions

Clone this repository into a new directory using: ```git clone https://github.com/kscharm/digital-time-capsule.git```

### Steps to Run Dev Build:
1. Run ```npm i``` in the root directory to install all server dependencies.
2. ```cd app``` and run ```npm i``` to install all application dependencies.
3. ```cd ../auth-server``` and run  ```npm i``` to install all authorization server dependencies.
4. ```cd ..``` and run ```npm start``` to launch the application. This will run the application server, authorization server, and client simultaneously.

### Build Instructions
This is for production builds only; If you are running this application locally, skip this step.
This app is still in the development phase. In order to create a production-ready application, you will have to change a few things:
1. Purchase a domain name through a service such as GoDaddy.
2. Replace every instance of ```http://localhost:3001``` in the source code with the domain name you want to use.
3. Remove the line ```proxy: http://localhost:3001``` from the ```app/package.json``` file
4. In the root directory, run the command: ```npm run build```. This will build the app for production in the ```build``` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### Production Installation Guide
Follow [this guide](https://www.youtube.com/watch?v=GKIIL743Gjo&t=3s) to deploy our application to an AWS EC2 instance with SSL & Nginx.

