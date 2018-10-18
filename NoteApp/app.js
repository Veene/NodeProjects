const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')

//grabbing the arguments, process.argv populated command line arguments available. If you add extra command line arguments
// on the terminal, then it will add them unto the argv parse.

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const argv = yargs
.command('add', 'Add a new note', {
    title: titleOptions,
    body: {
        describe: 'body of the note',
        demand: true,
        alias: 'b'
    }
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
    title: titleOptions
})
.command('remove', 'Remove a note', {
    title: titleOptions
})
.help()
.argv;

var command = argv._[0];
console.log('command: ', command);
// console.log('process.argv', process.argv)
console.log('yargs.argv', argv)

if(command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    notes.logNote(note)
}
else if (command === 'list'){
    var note = notes.getAll();
    console.log(note)
    note.forEach(note => notes.logNote(note))
} 
else if (command === 'read') {
    var note = notes.readNote(argv.title);
    notes.logNote(note)
}
else if (command === 'remove') {
    var noteRemove = notes.removeNote(argv.title);
    notes.logNote(noteRemove)
}
else {
   console.log('command not recognized'); 
} 