# Software Frameworks Assignment 1 - 3813ICT
## Wasif Chowdhury s2944951

### Git
The assignment/git repo contains two folders, [chatapp](https://github.com/wchow3/SFAssignment/tree/master/chatapp) and [server](https://github.com/wchow3/SFAssignment/tree/master/server)

#### chatapp folder
This folder contains the angular project generated through angular cli.
It contains all the client side file.
To run the application navigate to this folder and in the terminal use the command:
`ng serve`

#### server folder
This folder contains all the files required to host the node.js server
To use navigate to this folder and in the terminal use the command:
`node server.js`

#### Version Control
The approach for version control was to use github and upload commits after major updates.
Each commit has a comment for changes

### Data Structures

### Rest API


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
- chat

#### Services
There were multiple services created to allow communication between client and server.
- `chat.service`
- `group.service`
- `socket.service`
- `user.service`
Each service had functions allowing to retrieve and set objects

#### Models
There were two models created in the classes folder, `User` and `Group`
`User` model class contains an object which has `user id, username and email`
`Group` model class contains an object which has  `group id and group name`



### Features
- users can login
- users can register new login
- users can join groups
- users can chat in groups
- users can leave groups
- ~~users can delete groups~~
