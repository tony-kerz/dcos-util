#!/usr/bin/env iojs

var program = require('commander')

program
.option('-t, --template <engine>', 'specify template engine (jade|ejs) [jade]')
.arguments('<idString>')
.parse(process.argv);

//if (program.args.length != 1) {
//  program.help();
//}

console.log(program.args[0].split('.')[0]);
