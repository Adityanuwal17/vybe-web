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

Design:

Body
NavBar
Route = / => Feed
Route = /login => login page
Route = /connections => connections page
Route = /profile => profile page
