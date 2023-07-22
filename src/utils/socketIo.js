module.exports.chatSocket = (io) => {
    io.on('connection', (socket) => {
        const { id } = socket
        console.log(`Socket подсоединился: ${id}`)

        // работа с комнатами
        const { roomName } = socket.handshake.query
        console.log(`Socket комната: ${roomName}`)
        socket.join(roomName)
        socket.on('message-to-room', (msg) => {
            msg.type = `комната: ${roomName}`
            socket.to(roomName).emit('message-to-room', msg)
            socket.emit('message-to-room', msg)
        })

        socket.on('disconnect', () => {
            console.log(`Socket отсоединился: ${id}`)
        })
    })
}
