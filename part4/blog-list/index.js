const app = require('./app') // the actual Express application
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})