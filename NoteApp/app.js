console.log('starting app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')

//grabbing the arguments, process.argv populated command line arguments available. If you add extra command line arguments
// on the terminal, then it will add them unto the argv parse.

const argv = yargs.argv;
var command = argv._[0];
console.log('command: ', command);
// console.log('process.argv', process.argv)
console.log('yargs.argv', argv)

if(command === 'add') {
    notes.addNote(argv.title, argv.body);
}
else if (command === 'list'){
    notes.getAll();
} 
else if (command === 'read') {
    notes.readNote(argv.title);
}
else if (command === 'remove') {
    notes.remove(argv.title);
}
else {
   console.log('command not recognized'); 
} 