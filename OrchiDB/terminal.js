const path = require('path');
const init = require('./init.js');
const prompt = require('prompt-sync')();
let db = '';
let dbInfo = '';
const start = () => {
  let command = prompt('>>');
  switch (command) {
    case 'EXIT':
      console.log('<<Exiting Terminal');
      break;
    case 'ENTER_PASS':
      const pass = prompt('<<Enter Password: \n>>');
      db.enterPass(pass);
      start();
      break;
    case 'INIT_DB':
      const dbName = prompt('<<Enter Database Name: \n>>');
      const dbPass = prompt('<<Enter Database Password: \n>>');
      init.db(dbName, dbPass);
      start();
      break;
    case 'SELECT_DB':
      const selectDbName = prompt('<<Enter Database Name: \n>>');
      db = require(path.join(__dirname, selectDbName, 'db.js'));
      dbInfo = require(path.join(__dirname, selectDbName, 'dbInfo.json'));
      console.log(`<<Database ${selectDbName} Selected`);
      start();
      break;
    case 'RETURN_SELECTED_DB':
      if(dbInfo.dbName === 'undefined'){
        console.log('<<No Database Curently Selected');
      }else{
        console.log(`<<Database ${dbInfo.dbName} is Curently Selected.`);
      }
      start();
      break;
    case 'NEW_DOC':
      const newDocName = prompt('<<Enter Doc Name: \n>>');
      db.newDoc(newDocName);
      start();
      break;
    case 'READ_DOC':
      const readDocName = prompt('<<Enter Doc Name: \n>>');
      db.readDoc(readDocName);
      start();
      break;
    case 'WRITE_DOC':
      const writeDocName = prompt('<<Enter Doc Name: \n>>');
      const content = prompt('<<Enter Content: \n>>');
      db.writeDoc(writeDocName, content);
      start();
      break;
    case 'DEL_DOC':
      const deleteDocName = prompt('<<Enter Doc Name: \n>>');
      db.deleteDoc(deleteDocName);
      start();
      break;
    case 'RESTORE_DOC':
      const restoreDocName = prompt('<<Enter Doc Name: \n>>');
      db.restoreDoc(restoreDocName);
      start();
      break;
    case 'EMPTY_TRASH':
      db.emptyTrash();
      start();
      break;
    case 'RENAME_DOC':
      const renameDocName = prompt('<<Enter Doc Name: \n>>');
      const newName = prompt('<<Enter New Doc Name: \n>>');
      db.renameDoc(renameDocName, newName);
      start();
      break;
    case 'RETURN_PATH':
      const returnPathName = prompt('<<Enter Doc Name: \n>>');
      db.returnPath(returnPathName);
      start();
      break;
    case 'COPY_DB':
      const copyDbName = prompt('<<Enter Database Name: \n>>');
      const copyDbPass = prompt('<<Enter Database Password: \n>>');
      db.copyDB(copyDbName, copyDbPass);
      start();
      break;
    case 'DEL_DB':
      const confirm = prompt(`<<Are you sure you want to delete this database (${dbInfo.dbName}) (Y/N)\n>>`);
      const deleteDbPass = prompt('<<Enter Database Password: \n>>');
      db.deleteDbWithoutTimeout(deleteDbPass, confirm);
      start();
      break;
    case 'CLEAR':
      console.clear();
      start();
      break;
    case 'EDIT_DOC':
      const editDocName = prompt("<<Enter Doc Name: \n>>");
      const variable = prompt("<<Enter Variable Name: \n>>");
      const value = prompt("<<Enter Value: \n>>");
      db.editDoc(editDocName, variable, value);
      start();
      break;
    default:
      console.log('<<Invalid Command');
      start();
      break;
  }
};
module.exports = { start };