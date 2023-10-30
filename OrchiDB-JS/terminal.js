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
  }else if(command == 'NEW_FILE'){
    const fileName = prompt('<<Enter File Name: \n>>');
    db.newFile(fileName);
    start();
  }else if(command == 'READ_FILE'){
    const fileName = prompt('<<Enter File Name: \n>>');
    db.readFile(fileName);
    start();
  }else if(command == 'WRITE_FILE'){
    const fileName = prompt('<<Enter File Name: \n>>');
    const content = prompt('<<Enter Content: \n>>');
    db.writeFile(fileName, content);
    start();
  }else if(command == 'DELETE_FILE'){
    const fileName = prompt('<<Enter File Name: \n>>');
    db.deleteFile(fileName);
    start();
  }else if(command == 'RESTORE_FILE'){
    const fileName = prompt('<<Enter File Name: \n>>');
    db.restoreFile(fileName);
    start();
  }else if(command == 'EMPTY_TRASH'){
    db.emptyTrash();
    start();
  }else if(command == 'RENAME_FILE'){
    const fileName = prompt('<<Enter File Name: \n>>');
    const newName = prompt('<<Enter New File Name: \n>>');
    db.renameFile(fileName, newName);
    start();
  }else if(command == 'RETURN_FILE_PATH'){
    const fileName = prompt('<<Enter File Name: \n>>');
    db.returnFilePath(fileName);
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