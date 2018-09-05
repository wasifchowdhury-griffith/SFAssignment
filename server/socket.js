module.exports = function(app, io){
    console.log("Server socket intialised");

    var users ={};
    var name = 'this';

    io.sockets.on('connect', function(socket){
        socket.on('room', function(room) {
            socket.join(room);
            console.log("you have joined" + room);
        });
    });

    io.on('connection', (socket)=>{
        console.log('user connected');
        socket.on('groupFixer', function(myGroup){
            console.log(myGroup);
            socket.join(myGroup);
        });

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('add-message', (message)=>{
            io.emit('message', {type:'message', text:message});
        });
    });
}