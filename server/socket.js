module.exports = function(app, io){
    console.log("Server socket intialised");

    io.on('connection', (socket)=>{
        console.log('new connection');

        socket.on('join', function(data){
            socket.join(data.group);
            console.log(data);
            console.log(data.user + ' joined the group: ' + data.group);
            socket.broadcast.to(data.group).emit('new user joined ', {user:data.user, message:'has joined this room'});
        });

        socket.on('leave', function(data){
            console.log(data.user + ' left the group: ' + data.group);
            socket.broadcast.to(data.group).emit('left group', {user:data.user, message:'has left this group'});
            socket.leave(data.group);
        });

        socket.on('message', function(data){
            console.log("message sent to server: " + data);
            io.in(data.group).emit('new message', {user:data.user, message:data.message});
        })
    });
}