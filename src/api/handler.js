class NotesHandler {
  constructor(service) {
    this._service = service

    this.postNoteHandler = this.postNoteHandler.bind(this)
    this.getNotesHandler = this.getNotesHandler.bind(this)
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this)
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this)
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this)
  }

  postNoteHandler(request, h) {
    try {
      const { title = 'untitled', body, tags } = request.payload

      const noteId = this._service.addNote({ title, body, tags })

      const response = h.response({
        status: 'success',
        message: 'Success for adding a note',
        data: {
          noteId
        }
      })
      response.code(201)
      return response
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      })
      response.code(400)
      return response
    }
  }

  getNotesHandler() {
    const notes = this._service.getNotes()
    return {
      status: 'success',
      data: {
        notes
      }
    }
  }

  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params
      const note = this._service.getNoteByIdHandler(id)
      return {
        status: 'sucess',
        data: {
          note
        }
      }
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      })
      response.code(404)
      return response
    }
  }

  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params

      this._service(id, request.payload)

      return {
        status: 'success',
        message: 'Success for changing the note'
      }
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      })
      response.code(404)
      return response
    }
  }

  deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params
      this._service.deleteNoteByIdHandler(id)
      return {
        status: 'success',
        message: 'Success for delete a note'
      }
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      })
      response.code(404)
      return response
    }
  }
}

module.exports = NotesHandler