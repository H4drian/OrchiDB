const path = require('path');
const init = require('./init.js');
const prompt = require('prompt-sync')();
let db = '';
let dbInfo = '';
const start = () =>{
  let command = prompt('>>');
  if(command == 'EXIT'){
    console.log('<<Exiting Terminal');
  }else if(command == 'ENTER_PASS'){
    const pass = prompt('<<Enter Password: \n>>');
    db.enterPass(pass);
    start();
  }else if(command == 'INIT_DB'){
    const dbName = prompt('<<Enter Database Name: \n>>');
    const dbPass = prompt('<<Enter Database Password: \n>>');
    init.db(dbName, dbPass);
    start();
  }else if(command == 'SELECT_DB'){
    const dbName = prompt('<<Enter Database Name: \n>>');
    db = require(path.join(__dirname, dbName, 'db.js'));
    dbInfo = require(path.join(__dirname, dbName, 'dbInfo.json'));
    console.log(`<<Database ${dbName} Selected`);
    start();
  }else if(command == 'NEW_DOC'){
    const docName = prompt('<<Enter Doc Name: \n>>');
    db.newDoc(docName);
    start();
  }else if(command == 'READ_DOC'){
    const docName = prompt('<<Enter Doc Name: \n>>');
    db.readDoc(docName);
    start();
  }else if(command == 'WRITE_DOC'){
    const docName = prompt('<<Enter Doc Name: \n>>');
    const content = prompt('<<Enter Content: \n>>');
    db.writeDoc(docName, content);
    start();
  }else if(command == 'DELETE_DOC'){
    const docName = prompt('<<Enter Doc Name: \n>>');
    db.deleteDoc(docName);
    start();
  }else if(command == 'RESTORE_DOC'){
    const docName = prompt('<<Enter Doc Name: \n>>');
    db.restoreDoc(docName);
    start();
  }else if(command == 'EMPTY_TRASH'){
    db.emptyTrash();
    start();
  }else if(command == 'RENAME_DOC'){
    const docName = prompt('<<Enter Doc Name: \n>>');
    const newName = prompt('<<Enter New Doc Name: \n>>');
    db.renameDoc(docName, newName);
    start();
  }else if(command == 'RETURN_PATH'){
    const docName = prompt('<<Enter Doc Name: \n>>');
    db.returnPath(docName);
    start();
  }else if(command == 'COPY_DB'){
    const dbName = prompt('<<Enter Database Name: \n>>');
    const dbPass = prompt('<<Enter Database Password: \n>>');
    db.copyDB(dbName, dbPass);
    start();
  }else if(command == 'DEL_DB'){
    const confirm = prompt(`<<Are you sure you want to delete this database (${dbInfo.dbName}) (Y/N)\n>>`);
    const dbPass = prompt('<<Enter Database Password: \n>>');
    db.deleteDbWithoutTimeout(dbPass, confirm);
    start();
  }else if(command == 'CLEAR'){
    console.clear();
    start();
  }else{
    console.log('<<Invalid Command');
    start();
  }
}
module.exports = { start };