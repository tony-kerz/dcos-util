var dbg = require('debug')('dcos-util:marathon')
var program = require('commander')
var _ = require('lodash')
var util = require('util')

program
.option('-i, --id <id>', 'specify id (required)')
.option('-d, --image <image>', 'specify docker image name (required)')
.option('-c, --commitId <commitId>', 'specify commit id (required)')
.option('-v, --vhostBase <vhostBase>', 'specify virtual host base', 'x.healthagen.com')
.option('-p, --cpus <cpus>', 'specify cpu count', 1)
.option('-m, --mem <mem>', 'memory in MB', 1024)
.option('-n, --instanceCount <instanceCount>', 'number of instances', 1)
.option('-j, --marathon <marathon>', 'marathon json', '/marathon.json')
.parse(process.argv)

if (!(
  program.id &&
  program.image &&
  program.commitId
)) {
  program.help()
}

var marathon
try {
  marathon = require(program.marathon)
  dbg('marathon: %o', marathon)
} catch (e) {
  marathon = {}
  dbg('unable to load [%s]: %o', program.marathon, e)
}

result = _.defaultsDeep(
  {
    id: program.id,
    container: {
      docker: {
        image: program.image,
        network: 'BRIDGE'
      },
      type: 'DOCKER'
    },
    labels: {
      VIRTUAL_HOST: util.format('%s.%s', program.id, program.vhostBase)
    },
    cpus: marathon.cpus || program.cpus,
    mem: marathon.mem || program.mem,
    instances: marathon.instanceCount || program.instanceCount,
    forcePullImage: true,
    healthChecks: [{}],
    env: {
      commitId: program.commitId
    }
  },
  marathon
)

console.log(JSON.stringify(result, null, 2))
