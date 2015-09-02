var dbg = require('debug')('dcos-util:shell')
var program = require('commander')
var child = require('child_process')
var util = require('util')

program
.option('-c, --cmd <cmd>', 'specify shell command in csv format (with no spaces) e.g. "ls,-la,/tmp" (required)')
.parse(process.argv);

if (!program.cmd) {
  program.help();
}

var cmd = program.cmd.split(',').join(' ')

dbg('program.cmd: before: %j', program.cmd)
dbg('program.cmd: after: %j', cmd)

console.log(util.format('--- executing [%s] ---\n', cmd))
console.log(child.execSync(cmd).toString())
console.log('--- end response ---')
