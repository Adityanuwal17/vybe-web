# Vybe Front End

- create git Repo
- Install Tailwind CSS
- Install daisy UI

- Create a NavBar component and add to App.jsx
- Install react-router

- Create BrowserRouter:
- inside that Routes Component

  - inside Route =/bdoy
  - RouteChildren for /login and /profile

- Inside body component, create a outlet for children to render
- Create a Footer

## create Login Page

- add input fields
- install cors in backend => add middleware to add with corsOptions => origin and credentials true
- make fetch post call in handleLogin for login button
- in the api call, pass credentials:"include"
- Then cookies and token will be set in the browser

# Create the Redux Store

- Install react-redux + redux toolkit
- create store
- wrap the provider in the app
- create userSlice
- create reducers in UserSlice
- add the userSlice to the store

- add loggedInUser data to the userSlice
- update the image and show profile icon in the header only when logs in

- redirect to feed page once logs in successfully

- should not be able to access other routes without login
- if token is not present, redirect user to login page
- Logout feature
- get the feed and add it in the store
- build the userCard and show it in the feed
- Edit profile feature is built
- show toast on save
- show usercard component side by side to see live changes

- New Page to see all my connection requests
- New Page to see all the connection Requests

- Feature - Accept/Reject Connection requests

- send / ignore the user card from feed
- sign up flow for new user
- E2E testing

Design:

Body
NavBar
Route = / => Feed
Route = /login => login page
Route = /connections => connections page
Route = /profile => profile page

# Deployment

- signup on AWS
- launch your instance on ubuntu, create your secret key
- once instance is up, connect via SSH, modify your permissions of secret key using commands mentioned
- connect in terminal following commands
- install node in the remote machine, ther version matching with your local
- git clone the projectts in your machine

## frontEnd

- cd vybe_web
- install dependencies with npm install
- npm run build for building the project
- sudo apt update
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from the dist(build files) to /var/www/html/:

  - sudo scp -r dist/\* /var/www/html/

- Enable Port 80 on your instance by changing the inbound rules in the security group

- use public ip of the instance to see in browser.
- working in http and not in https

## BackEnd

- npm install
- git pull to update
- whitelist instance ip in mongo for establishing connection
- enable port 3000 (the one which your server is using) by changing the inbound rules in the security

- npm install pm2 -g
- pm2 (process manager) helps running the app 24/7 in background

- pm2 start npm -- start
  : this will start the server under pm2, basically write pm2 start then -- and then the script

- pm2 logs
  : command to check the logs

- pm2 flush npm
  : command to clear the logs

- pm2 list
  : command to list all the processes running

- pm2 stop npm
  : command to stop the process, "npm" was the name of the process

- pm2 delete npm
  : to delete npm

- pm2 start npm --name "vybeBackend" --start
  : this will give the custom name "vybeBackend" to your process

## Connect FrontEnd and Backend

- Frontend = http://13.60.36.249/
- Backend = http://13.60.36.249/:3000/

Domain name = vybe.com => 13.60.36.249

FrontEnd = vybe.com
Backend = vybe.com:3000 => vybe.com/api

## nginx config:

config nginx - /etc/nginx/sites-available/default

- server_name 13.60.36.249/;

location /api/ {
proxy_pass http://localhost:3000/;

         # Standard Node.js proxy headers
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

- restart nginx
  sudo systemctl restart nginx

- Modify the BASE_URL in frontend project to "/api"
