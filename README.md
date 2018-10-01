# Software Frameworks Assignment 1 - 3813ICT
## Wasif Chowdhury s2944951

### Git
The assignment/git repo contains two folders, [chatapp](https://github.com/wchow3/SFAssignment/tree/master/chatapp) and [server](https://github.com/wchow3/SFAssignment/tree/master/server)

#### chatapp folder
This folder contains the angular project generated through angular cli.\
It contains all the client side file.\
To run the application navigate to this folder and in the terminal use the command:\
`ng serve` or\
use `ng build` to build the dist folder

#### server folder
This folder contains all the files required to host the node.js server\
To use navigate to this folder and in the terminal use the command:\
`node server.js`

#### Version Control
The approach for version control was to use github and upload commits after major updates.
Each commit has a comment for changes

### Data Structures
The Users/ Groups and Channels are represented as services which have \
methods that can be called to fetch data within them or set data.
The data structures used were object arrays which held the user, \
group and channel data in their respective array as shown below. 

![Img1](https://github.com/wchow3/SFAssignment/blob/master/images/img1.PNG) 

![Img2](https://github.com/wchow3/SFAssignment/blob/master/images/img2.PNG) \
The users array contained objects with user data which was the username and their permissions. 

![Img3](https://github.com/wchow3/SFAssignment/blob/master/images/img3.PNG) \
The groups array contained objects with group data which was the group name, \
an admin array, and members array. 

![Img4](https://github.com/wchow3/SFAssignment/blob/master/images/img4.PNG) \
The channels array contained objects with channel data which was the channel name, \
the group it was under, and a members array.

### Rest API
Rest APIs were not used for this.
Routes in the project were:
- /home\
    *Route user arrives on default*
- /login\
    *Route user uses to login to chat*
- /dashboard\
    *Route user arrives at once logged in.*\
    *User is able to create users/groups/channels from here*

### Angular Architecture
#### Components
There were multiple components created in this project
- channels
- dashboard
- home
- login
- chat 

Upon loading `/` users will be directed to `/home` which is a \
simple splash screen with a login link which will navigate to `/login`.\

`/login` is a simple form that asks users to login with `email` and `password`.\
There are two buttons `enter chat` and `register`.\
The enter chat button checks if the user exists and navigates to \
`/dashboard` if correct credentials are found.\
There is also a register button for users who wish to create a new account\ 

Upon successfully logging in, the user will arrive at the dashboard \
which contains the `channels` component and the `chat` component. \
This fetches all the groups from the database if the user is an admin or member of the group. \
New groups can be created through the `create new group button` \
which takes the user to `/create-group`

A user may click on a group to which displays the channels of that group \

A user may also logout which navigates back to `/login` clearing the user from the session storage.

#### Services
There were multiple services created to allow communication between client and server.
- `chat.service`
- `group.service`
- `socket.service`
- `channel.service`
- `user.service`\
Each service had functions allowing to retrieve and set objects

### Features
- users can login
- users can register new user
- users can join groups
- users can chat in groups
- users can leave groups
- ~~users can delete groups~~
