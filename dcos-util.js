var program = require('commander')

program
.version('0.0.1')
.command('id', 'id from string')
.command('marathon-json', 'generate marathon json')
.command('dockerfile', 'generate dockerfile (requires Procfile)')
.command('shell', 'execute shell command')
.parse(process.argv)
