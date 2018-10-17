console.log('Starting notes.js');

const fs = require('fs');

var addNote = (title, body) => {
    var notes = [];
    var note = {
        title: title,
        body: body,
    };
    try {
        var notesString = fs.readFileSync('notes-data.json')
        notes = JSON.parse(notesString) 
    } catch (e) {
        //nothing will happen if the try fails, just continues to push note
    }
    //filter is checking if the new added title is equal to any of the notes titles in the array extracted from notes.data.json
    //if yes, filter will grab that one and put it into duplicateNotes array, so if no duplicates, then it will be empty
    var duplicateNotes = notes.filter(note => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note)
        fs.writeFileSync('notes-data.json', JSON.stringify(notes))
    } else {
        console.log('not added because duplicate title')
    }
};
var getAll = () => {
    console.log('Getting all notes');
}
var readNote = (title) => {
    console.log('Reading note:', title);
}
var remove = (title) => {
    console.log('removing note', title);
}

module.exports = {
    addNote: addNote,
    getAll: getAll,
    readNote: readNote,
    remove: remove,
}