console.log('Starting notes.js');

var addNote = (title, body) => {
    console.log('Adding note', title, body);
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