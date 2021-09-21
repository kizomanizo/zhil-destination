# Roadmap Costing Backend
## Backend for the HEA roadmap costing tool.

This will be coupled with a frontend that together make up the costing tool for Health Enterprise Architecture costing tool. This app is built on Express in NodeJS witout any view as it is supposed to be just a backend API.

## Installation ##

For development version of this repo, you will have to install mysql server and NodeJS on your computer and make sure the services are running. To test if Node is installed and running run `node -v` and the system should respond with the version of Node that you are running, if not then NodeJS is either not installed or it is not running. For MySQL, do the same, check the installed verson with `mysql --version` and you should get the installed version as a response.

### Steps ###
1. Install NodeJS 
2. Install MySQL
3. clone the repo from Github with `git clone https://github.com/kizomanizo/roadmap-costing-frontend.git`
4. Open the cloned repo with `cd roadmap-costing-backend`
5. Once inside the repo, install dependencies using `npm install`
6. Open the repo using your favorite IDE
7. Edit the `.env` file and add relevant variables such as port, demo users, demo levels, demo password, JWT secret word etc.
8. Edit `config/config.json` with relevant database access details in all three modes.
9. Create the database using `npx sequelize-cli db:create`
10. Create database tables using `npx sequelize-cli db:migrate`
11. Add defaut contents to the database (make sure you change user passwords) using `npx sequelize-cli db:seed:all`
12. Start the application using `npx nodemon start`
13. Access the site using API explorer tool such as Postman, Insomnia, VSCode REST Client etc. `localhost:PORT/api/v1/users` The users end point can be changed to levels,goals, investments or whatever you have in your models.

## NOTE ##
This backend is still a work-in-progress, upon completion; this banner will be removed.

### DB Versions ###
Name your databases in the `confic/config.json` file using the following formart:

SN           | Development  | Testing      | Production
------------ | ------------ | ------------ | ------------
1            | roadmap_dev  | roadmap_test | roadmap_prod
2            | roadmapDev   | roadmapTest  | roadmapProd

## License
MIT