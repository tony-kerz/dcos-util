#!/usr/bin/env node

var program = require('commander')

program
.version('0.0.1')
.command('id [idString]', 'id from string')
.command('marathon-json', 'generate marathon json')
.command('dockerfile', 'generate dockerfile (requires Procfile)')
.parse(process.argv)
