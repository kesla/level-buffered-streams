var levelup = require('levelup')
  , extend = require('xtend')
  , rimraf = require('rimraf')
  , dir = require('os').tmpdir() + '/level-buffered-streams'
  , db = levelup(dir, { db: require('leveldown') })
  , bufferedStreams = require('./index')(db)
  , batch = function (callback) {
      var b = db.batch()
        , i = 20

      while(i > 0) {
        b.put(i, i)
        i = i - 1
      }

      b.write(callback)
    }

batch(function () {

  // available is also .createValueStream & createKeyStream
  var stream = bufferedStreams.createReadStream({
    highWaterMark: 50
  })

  stream.on('data', function (chunk) {
    console.log('got some data in an array')
    console.log(chunk)
  })

  stream.once('end', function () {
    console.log('and eventually it dies')
    rimraf.sync(dir)
  })

})
