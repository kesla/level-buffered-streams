# level-buffered-streams

Create streams that emits arrays from levelup

[![NPM](https://nodei.co/npm/level-buffered-streams.png?downloads&stars)](https://nodei.co/npm/level-buffered-streams/)

[![NPM](https://nodei.co/npm-dl/level-buffered-streams.png)](https://nodei.co/npm/level-buffered-streams/)

## Note

This is using the buffered iterator introduced in the unreleased [leveldown@0.11](https://github.com/rvagg/node-leveldown/pull/91), so this is till a bit of mad science.

## Installation

```
npm install level-buffered-streams
```

## Example

### Input

```javascript
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
```

### Output

```
got some data in an array
[ { key: '1', value: '1' },
  { key: '10', value: '10' },
  { key: '11', value: '11' },
  { key: '12', value: '12' },
  { key: '13', value: '13' },
  { key: '14', value: '14' },
  { key: '15', value: '15' },
  { key: '16', value: '16' },
  { key: '17', value: '17' },
  { key: '18', value: '18' },
  { key: '19', value: '19' },
  { key: '2', value: '2' },
  { key: '20', value: '20' },
  { key: '3', value: '3' },
  { key: '4', value: '4' } ]
got some data in an array
[ { key: '5', value: '5' },
  { key: '6', value: '6' },
  { key: '7', value: '7' },
  { key: '8', value: '8' },
  { key: '9', value: '9' } ]
and eventually it dies
```

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

