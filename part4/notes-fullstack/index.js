const app = require('./app')
const config = require('./utils/config')
const noteRouter = require('./controllers/notes')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})