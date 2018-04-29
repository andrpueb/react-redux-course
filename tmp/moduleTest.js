console.log('Starting moduleTest');

var addNote = (title, body) =>{
  console.log('Adding note',  title, body);
}

var getAll = (notes) =>{
  console.log('Listing all notes', notes);
}

var removeNote = (title) =>{
  console.log('Removing note', title);
}

var readNote = (title) =>{
  console.log('Reading the note', title);
}

module.exports = {
  addNote,
  getAll,
  removeNote,
  readNote
};
