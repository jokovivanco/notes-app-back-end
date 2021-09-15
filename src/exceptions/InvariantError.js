const ClientError = require('./ClinetError')

class InvariantError extends ClientError {
  constructor(message) {
    super(message)
    this.name = 'InvariantError'
  }
}

module.exports = InvariantError