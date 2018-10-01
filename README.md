# Software Frameworks Assignment 1 - 3813ICT
## Wasif Chowdhury s2944951

### Git
The assignment/git repo contains two folders, [chatapp](https://github.com/wchow3/SFAssignment/tree/master/chatapp) and [server](https://github.com/wchow3/SFAssignment/tree/master/server)

#### chatapp folder
This folder contains the angular project generated through angular cli.\
It contains all the client side file.\
To run the application navigate to this folder and in the terminal use the command:\
`ng serve` or\
use `ng build` to build the dist folder\

#### server folder
This folder contains all the files required to host the node.js server\
To use navigate to this folder and in the terminal use the command:\
`node server.js`

#### Version Control
The approach for version control was to use github and upload commits after major updates.
Each commit has a comment for changes

### Data Structures
The Users and Groups are represented as services which have \
methods that can be called to fetch data within them or set data.
The data structures used were arrays which held the user and \
group data in their respective array.

![Img1](https://github.com/wchow3/SFAssignment/blob/master/images/img1.PNG)

### Rest API
Rest APIs were not used for this.
Routes in the project were:
- /home\
    *Route user arrives on default*
- /login\
    *Route user uses to login to chat*
- /dashboard\
    *Route user arrives at once logged in.*\
    *User is able to create user or group from here*
- /create-user\
    *Route to a form that creates a user*
- /create-group\
    *Route to a form that creates a group*
- /nchat/(id)\
    *Route to a chat room with specified id*

### Angular Architecture
#### Components
There were multiple components created in this project
- bottom navbar
- create-group
- create-user
- dashboard
- documentation
- group
- home
- login
- chat\
Upon loading `/` users will be directed to `/home` which is a \
simple splash screen with a login link which will navigate to `/login`.\
There is also the bottom navbar component which sits at the footer of the site. \
There is a link to `/documentation` route in this footer.

`/login` is a simple form that asks users to login with `email` and `password`.\
There are two buttons `enter chat` and `register`.\
The enter chat button checks if the user exists and navigates to \
`/dashboard` if correct credentials are found.\
There is also a register button for users who wish to create a new account\ 
that navigates to `/create-user`

Upon successfully logging in, the user will arrive at the dashboard \
which contains the `group component`. \
This fetches all the groups on the localstorage. \
New groups can be created through the `create new group button` \
which takes the user to `/create-group`

A user may click on a group to be navigated to `/chat/(id)` \
where the id is the group clicked.

A user may also logout which navigates back to `/login`

#### Services
There were multiple services created to allow communication between client and server.
- `chat.service`
- `group.service`
- `socket.service`
- `user.service`\
Each service had functions allowing to retrieve and set objects

#### Models
There were two models created in the classes folder, `User` and `Group`\
`User` model class contains an object which has `user id, username and email`\
`Group` model class contains an object which has  `group id and group name`\

### Features
- users can login
- users can register new user
- users can join groups
- users can chat in groups
- users can leave groups
- ~~users can delete groups~~
