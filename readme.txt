Readme for the Backend directory:

* This is node js backend. (nothing related to reach app) We will connect to react app but this will be a separate entity itself.

- backend directory will be in different repo at the production level but for the sake of this project, I am putting backend in the same repo.
- ran the command "npm init"
- npm i express
- npm i mongoose - package for mongoose db (mongoose is an abstraction layer on the top of MongoDB)
    -- It will help us to connect with out node.js app
    -- It will be useful to create models in our app.
- Created "models" directory - All the mongoose models will be stored in this directory
- Created "routes" directory
----------------------------------------------------------------------------------------
* Inside models directory
- Created Notes.js and User.js files - First letter is capital because it's model name
- 2 schemas are created (1 in Notes.js and 1 in User.js)

* Inside routes directory
- Created auth.js and notes.js files for routing from index.js page
------------------------------
* db.js directory
-

------------------------------ 
- Created collections in thunder client (which is like postman but easily to use in vscode)

* In Auth.js created followings routes: Create User, Login and getUser
    - Create User: Validation check, secure password mechanism, User data is linked to "AuthToken"
    - Login: Validation check for email, password -> If details are correct then AuthToken will be returned
    - getUser: Uses "fetchUser" as a middleware function to get the auth-token and varify user's data. Which are used in getUser    router to get the user data.

    - In short: Create User will get the data and link it to the authToken and at the time of login, this authToken is used to check email id and password. Same authToken is used to get the user's data.


----------------------------------------------------------------------------------------
commnad: npm i react-router-dom concurrently
used above commnad in outer package.json (not in backend directory's package.json)

In outer package.json file used this syntax: "both": "concurrently \"npm run start\" \"nodemon backend/index.js\"" 
to run backend and react both at the same time

to start/run both use below command:
npm run both (don't run this in backend directory, run it in outer directory)
----------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------
Front end part in react
- deleting unncessary files from src directory -> logo.svg, aap.test.js, reportwebvitals.js, setuptest.js 
- Added bootstap js and css code
- Created components directory into src directory

** components directory 
    - created Home, about, navbar files
    - pasted navbar code from bootstrap into navbar.js -> clsoed <hr/> and <input/> tags
        - Also changed name from "class" to "className"

** App.js directory
- used above files (ex: <Navbar/>)
- Used React router and switch (new name: Routes) to routes the home and about page

** Context component created into src directory

----------------------------------------------------------------------------------------