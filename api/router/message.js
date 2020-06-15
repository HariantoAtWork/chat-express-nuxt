module.exports = ({ Router, io }) => {
  const router = Router()
  /* GET users listing. */
  router
    .get('/', function(req, res, next) {
      res.json({
        message: true
      })
    })
    .post('/', (req, res) => {
      io.emit('chat-message', { ...req.body, id: `POST: ${req.body.id}` })
      res.json(req.body)
    })

  return router
}
