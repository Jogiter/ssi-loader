const loaderUtils = require('loader-utils')
const request = require('request')

let includeBase = ''

function getMatches(source) {
  let reg = /<!--\s*#\s?include\s+(?:virtual|file)="([^"]+)"(?:\s+stub="(\w+)")?\s*-->/gi
  let res
  let matches = []
  while ((res = reg.exec(source)) != null) {
    matches.push({
      part: res[0],
      location: res[1]
    })
  }
  return matches
}

function getRemoteFile(match) {
  return new Promise((resolve, reject) => {
    let url = `${includeBase}${match.location}`
    request(url, (err, response, body) => {
      if (err) return reject(err)
      return resolve({
        part: match.part,
        content: body
      })
    })
  })
}

module.exports = function(source) {
  let callback = this.async()
  const options = loaderUtils.getOptions(this)
  includeBase = options.locations['include']

  if (!includeBase) {
    return source
  }

  let matches = getMatches(source)

  Promise.all(matches.map(match => getRemoteFile(match)))
    .then(res => {
      let output = source
      for (let piece of res) {
        output = output.replace(piece.part, piece.content)
      }
      callback(null, output)
    })
    .catch(e => {
      callback(e)
    })
}
