#!/usr/bin/env node

var program = require('commander');
var childProcess = require('child_process');
var path = require('path');

program
  .version('0.1.0')
  .usage('[options] <file...>')
  .option('-commArgs, --commandArguments <p>', 'Command arguments', '')
  .option('-bOpts, --buildOpts <p>', 'Command arguments', '')
  .option('-file, --filename <p>', 'Name of the webpack babel config file', '')
  .option('-seg, --segments <n>', 'Amount of directories to strip to reach root lerna repo', parseInt)
  .parse(process.argv);

var pathSeparator = path.sep;
var actualPath = process.cwd().split(pathSeparator);
var rootPath = actualPath.slice(0, -program.segments).join(pathSeparator);
var configAddition = actualPath.slice(-program.segments).join(pathSeparator);
var commandArgs = program.commandArguments.split(' ');
var cpArgs = [
  '--config=' + configAddition + pathSeparator + program.filename,
].concat(commandArgs);

var cpBuildOpts = program.buildOpts ? program.buildOpts.split(' ') : [];

if (cpBuildOpts.length > 0) {
  cpArgs = cpArgs.concat(cpBuildOpts);
}

var child = childProcess.spawn(
  './node_modules/.bin/webpack',
  cpArgs,
  { cwd: rootPath, stdio: 'inherit' },
);
child.on('close', function (code) {
  console.log('Process exited with code ' + code);
  process.exit(code);
});
