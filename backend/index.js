const { Server} = require('socket.io');
const io = new Server(8000,{
    cors: true,
});


const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);
    socket.on('join:space', (data)=>{
        const { email, space } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(space).emit("user:joined", { email, id: socket.id });
        socket.join(space);
        io.to(socket.id).emit("join:space", data);
    });

    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incoming:call", { from: socket.id, offer });
    });

    socket.on("user:answer", ({ to, ans }) => {
        io.to(to).emit("user:answer", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
        console.log("peer:nego:needed", offer);
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });
    
    socket.on("peer:nego:done", ({ to, ans }) => {
        console.log("peer:nego:done", ans);
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
})