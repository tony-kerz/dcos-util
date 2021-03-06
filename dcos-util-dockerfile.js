var program = require('commander')
var fs = require('fs')
var truthy = function(x) {return x}

program
.parse(process.argv)

const PROCFILE = 'Procfile'

entrypoint = []
procfile = fs.readFileSync(PROCFILE).toString().split('\n').filter(truthy)

if (procfile.length != 1) {
  throw new Error('single line Procfile required')
}

tokens = procfile[0].split(':')
type = tokens[0]
if (type == 'exec') {
  entrypoint.push('/exec')
  tokens = tokens[1].split(' ').filter(truthy)
  entrypoint = entrypoint.concat(tokens)
} else {
  entrypoint.push('/start')
  entrypoint.push(type)
}

// FROM tonykerz/builder
//
// ENTRYPOINT ["/exec", "node", "/app/dcos-util.js"]
// --or--
// ENTRYPOINT ["/start", "web"]

dockerfile = 'FROM tonykerz/builder\n'
dockerfile += `ENTRYPOINT ${JSON.stringify(entrypoint)}`

console.log(dockerfile)
