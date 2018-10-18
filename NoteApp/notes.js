console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
    try {
            var notesString = fs.readFileSync('notes-data.json')
            return JSON.parse(notesString) 
        } 
    catch (e) {
            return [];
        }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title: title,
        body: body,
    };
    var duplicateNotes = notes.filter(note => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
        
    } else {
        console.log("Duplicate")
    }
};
var getAll = () => {
    console.log('Getting all notes');
}
var readNote = (title) => {
    var notes = fetchNotes();
    var note = notes.filter(note => note.title === title)
    if (note.length !== 0) return note[0]
    if (note.length === 0) false
}
var removeNote = (title) => {
    // console.log('removing note', title);
    //fetch notes
    var notes = fetchNotes(); //fetchnotes already parses the file
    //filter out the notes
    var newNotes = notes.filter(note => note.title !== title)
    var removedNote = notes.filter(note => note.title === title)
    if(removedNote.length === 0){
        console.log('removed note does not exist')
        return false
    } else {
        saveNotes(newNotes);
        console.log('removed note')
        return true
    }
    //writing over file with the new array -> stringify
}
var logNote = (note) => {
    if(note) {
        console.log('--')
        console.log(`Title: ${note.title}`)
        console.log(`Body: ${note.body}`)
    } else {
        console.log('--')
        console.log('note not found')
    }
}

module.exports = {
    addNote: addNote,
    getAll: getAll,
    readNote: readNote,
    removeNote: removeNote,
    logNote: logNote,
}