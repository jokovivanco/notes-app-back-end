import NotesHandler from './handler'
import routes from './routes'

module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service }) => {
    const notesHandler = new NotesHandler(service)
    server.route(routes(notesHandler))
  }
}