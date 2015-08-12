var program = require('commander')

program
.arguments('<idString>')
.parse(process.argv);

if (program.args.length != 1) {
  program.help();
}

console.log(program.args[0].split('.')[0]);
