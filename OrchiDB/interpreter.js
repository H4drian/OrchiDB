const fs = ('fs');
const path = ('path');
const init = (path.join(__dirname, './init.js'))
let db = '';
const splitLine = (str) => {
  return str.split(' ');
}
const getCodeAtLine = (filepath, line_number) => {
    const fs = require('fs');
    const lines = fs.readFileSync(filepath, 'utf8').split('\n');
    return lines[line_number - 1].trim();
}
const countLinesOfCode = (filepath) => {
    const fs = require('fs');
    const lines = fs.readFileSync(filepath, 'utf8').split('\n');
    return lines.length;
}
const orchidium = (filepath) =>{
  for(let i = 0; i < countLinesOfCode(filepath); i++){
    const line = getCodeAtLine(filepath, i);
    const splitLine = line.split(' ');
    const command = splitLine[0];
    switch(command){
      case 'ENTER_PASS':
        db.enterPass(splitLine[1]);
        break;
      case 'INIT_DB':
        init.db(switchLine[1], switchLine[2]);
        break;
      case 'SELECT_DB':
        db = require(path.join(__dirname, switchLine[1], 'db.js'));
        dbInfo = require(path.join(__dirname, switchLine[1], 'dbInfo.json'));
        console.log(`<<Database ${switchLine[1]} Selected`);
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
        db.newDoc(switchLine[1]);
        break;
      case 'READ_DOC':
        db.readDoc(switchLine[1]);
        break;
      case 'WRITE_DOC':
        db.writeDoc(switchLine[1], switchLine[2]);
        break;
      case 'DEL_DOC':
        db.deleteDoc(switchLine[1]);
        break;
      case 'RESTORE_DOC':
        db.restoreDoc(switchLine[1]);
        break;
      case 'EMPTY_TRASH':
        db.emptyTrash();
        break;
      case 'RENAME_DOC':
        db.renameDoc(switchLine[1], switchLine[2]);
        break; 
  }
}