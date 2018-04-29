console.log('starting app');

const fs = require('fs');
const os = require('os');
const notes = require('./moduleTest.js');
const _ = require('lodash');
const yargs = require('yargs');

var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username}! you are ${notes.age}`, function(err){
//   if(err){
//     console.log('Unable to write to file');
//   }
//
// });

//console.log(`Result ${notes.add(15, 2)}`);


var objectsOne = ['Tesla', 1, 2, 3,1, 2, 3, 2, 9, 4];
var objectsTwo = ['Tesla', 2,3,4,1,6,7];

console.log(_.uniq(objectsOne));

const argv = yargs.argv;
var command = process.argv[2];
console.log('Command: ', command);
console.log('Process', process.argv);
console.log('Yargs', argv);

if(command === 'list'){
  notes.getAll(argv);
}else if (command === 'add') {
  notes.addNote(argv.title, argv.body);
}else if (command === 'read') {
  notes.readNote(argv.title);
}else if (command === 'remove') {
  notes.removeNote(argv.title);
}else{
  console.log('Command not recognized');
}
