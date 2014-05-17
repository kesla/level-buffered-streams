var extend = require('xtend')
  , BufferedStream = require('./buffered-stream')

module.exports = function (db) {

  return {
      createReadStream: function (options) {
        options = extend(db.options, options)
        return new BufferedStream(
            options
          , db
          , function (options) {
              return db.db.iterator(options)
            }
        )
      }
    , createKeyStream: function (options) {
      return this.createReadStream(extend(options, { keys: true, values: false }))
    }
    , createValueStream: function (options) {
        return this.createReadStream(extend(options, { keys: false, values: true }))
      }

  }
}