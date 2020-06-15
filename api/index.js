module.exports = ({ Router, io }) => {
  const router = Router()
  /* GET users listing. */
  router
    .get('/', function(req, res, next) {
      res.json({
        api: true
      })
    })
    // Router: message
    .use('/message', require('./router/message')({ Router, io }))

  io.on('connection', socket => {
    console.log('Socket Connect:', { id: socket.id })
    io.emit('chat-message', { id: socket.id, status: 'ENTERS ROOM' })
    socket.on('disconnect', message => {
      console.log({ id: socket.id, message })
      socket.broadcast.emit('chat-message', { id: socket.id, status: 'LEFT' })
    })

    socket.on('chat-message', msg => {
      console.log('chat-message:', msg)
      io.emit('chat-message', { id: socket.id, message: msg })
    })
  })

  return router
}
