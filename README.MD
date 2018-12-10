# Full Stack App with React and a REST API

## Project Overview

### Built using

- Editor: https://code.visualstudio.com/
- Terminal: https://hyper.is/ (with horizontal split api running in top terminal, client in lower half)
- misc dev tools:
  - Redux DevTools _is required for dev build_ https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
  - Redux logger: https://www.npmjs.com/package/redux-logger

### Install

For first time installation:

- navigate into the root of the api folder and run `npm install`
  - next run `npm run seed`, to populate the starter database
- navigate into the root of the client folder and run `npm install`

To start the server and api:
you can navigate in to both api and client and run `npm start` in each one to start or from either directory run `npm run fullstack` to start both at the same time. If you start it this way use `Ctrl c` then select `y`to terminate the client and api

### Naming Conventions

- 🖧 stateless functional components: Filenames begin with lowercase.
- 🖧 stateful class components: Filenames begin with Uppercase.

### Routes

- / - Courses
- /courses/create - CreateCourse
- /courses/:id/update - UpdateCourse
- /courses/:id - CourseDetail
- /signin - UserSignIn
- /signup - UserSignUp
- /signout - UserSignOut
