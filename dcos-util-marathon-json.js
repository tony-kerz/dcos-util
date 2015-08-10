#!/usr/bin/env iojs

// ./dcos-util.js marathon-json -i foo -r myReg:5000 -b b1 -c c1 -u '{"env":{"foo":"bar"}}'

var program = require('commander')
var _ = require('lodash')

program
.option('-i, --id <id>', 'specify id (required)')
.option('-r, --registryUrl <registryUrl>', 'specify registry url (required)')
.option('-b, --buildId <buildId>', 'specify build id (required)')
.option('-c, --commitId <commitId>', 'specify commit id (required)')
.option('-v, --vhostBase <vhostBase>', 'specify virtual host base', 'x.healthagen.com')
.option('-u, --userJson <userJson>', 'specify user json', {})
.parse(process.argv)

if (!(program.id && program.registryUrl && program.buildId && program.commitId)) {
  program.help()
}

result = _.merge(
  JSON.parse(program.userJson),
  {
    id: program.id,
    container: {
      docker: {
        image: `${program.registryUrl}/${program.id}`,
        network: 'BRIDGE'
      },
      type: 'DOCKER',
      volumes: []
    },
    labels: {
      VIRTUAL_HOST: `${program.id}.${program.vhostBase}`
    },
    cpus: 0.2,
    mem: 32.0,
    instances: 1,
    forcePullImage: true,
    healthChecks: [{}],
    env: {
      buildId: program.buildId,
      commitId: program.commitId
    },
    upgradeStrategy: {
      minimumHealthCapacity: 0.5,
      maximumOverCapacity: 0.2
    }
  }
)

console.log(JSON.stringify(result, null, 2))

// {
//     "container": {
//         "type": "DOCKER",
//         "docker": {
//             "network": "BRIDGE",
//             "image": "${REGISTRY_URL}/${APP}:${BUILD_NUMBER}",
//             "portMappings": [
//                 { "containerPort": 4567, "hostPort": 0, "protocol": "tcp"}
//             ]
//         }
//     },
//     "labels": {
//         "VIRTUAL_HOST": "jenkins.x.healthagen.com"
//     },
//     "id": "${APP}",
//     "forcePullImage": true,
//     "cpus": 0.25,
//     "mem": 248,
//     "env": {
//             "MESSAGE": "${BUILD_TAG}, SHA=${GIT_COMMIT}",
//             "GIT_SHA": "${GIT_COMMIT}",
//             "JENKINS_BUILD_INFO": "${BUILD_TAG}"
//     },
//     "upgradeStrategy": {
//         "minimumHealthCapacity": 0.5,
//         "maximumOverCapacity": 0.2
//     }
// }
