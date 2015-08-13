# dcos-util

This project is a node based command line utility to assist with a build
pipeline for [dcos](http://docs.mesosphere.com/) based paas system.

This project is built using [commander.js](https://github.com/tj/commander.js) and provides command line based help as described in the documentation.

here is a brief example of usage:

## id
```
prompt> id=`docker run <user>/dcos-util id myApp.devBuild`
```
```
prompt> echo $id
myApp
```

## marathon-json
```
prompt> docker run <user>/dcos-util marathon-json -i foo -r myReg:5000 -b b1 -c c1 -v myVhost -u '{"env":{"foo":"bar"}}' -p 0.5 -m 512 -n 2 > marathon.json
```
```
prompt> cat marathon.json
{
  "env": {
    "foo": "bar",
    "buildId": "b1",
    "commitId": "c1"
  },
  "id": "foo",
  "container": {
    "docker": {
      "image": "myReg:5000/foo",
      "network": "BRIDGE"
    },
    "type": "DOCKER"
  },
  "labels": {
    "VIRTUAL_HOST": "foo.myVhost"
  },
  "cpus": "0.5",
  "mem": "512",
  "instances": "2",
  "forcePullImage": true,
  "healthChecks": [
    {}
  ],
  "upgradeStrategy": {
    "minimumHealthCapacity": 0.5,
    "maximumOverCapacity": 0.2
  }
}
```

## dockerfile
```
prompt> cat Procfile
exec: node /app/my-app.js
```
```
prompt> docker run <user>/dcos-util dockerfile > Dockerfile
```
```
prompt> cat Dockerfile
FROM gliderlabs/herokuish
RUN mkdir -p /app
ADD . /app
RUN /build
ENTRYPOINT ["/exec","node","/app/my-app.js"]
```
