const fs = require('fs');
const path = require('path');
const init = require(path.join(__dirname, './init.js'));
let db = '';
const splitLine = (str) => {
  let startIndex = str.indexOf('{');
  let endIndex = str.lastIndexOf('}');
  let object = '';
  if (startIndex !== -1 && endIndex !== -1) {
    object = str.substring(startIndex, endIndex + 1);
    str = str.slice(0, startIndex) + '#' + str.slice(endIndex + 1);
  }
  return str.trim().split(/#\s*|\s+/).map(subStr => subStr.replace('#', object));
};
const joinArrayRange = (array, start, stop) => {
    return array.slice(start, stop).join('');
}
const getCodeAtLine = (filepath, line_number) => {
    const fs = require('fs');
    const lines = fs.readFileSync(filepath, 'utf8').split('\n');
    if (line_number >= 1 && line_number <= lines.length) {
        return lines[line_number - 1].trim();
    } else {
        console.log(`Error: Ln${line_number}, Command Not Found`);
        return '';
    }
}
const countLinesOfCode = (filepath) => {
    const fs = require('fs');
    if (!filepath) {
        console.log('Error: filepath argument is missing');
        return 0;
    }
    const lines = fs.readFileSync(filepath, 'utf8').split('\n');
    return lines.length;
}
const run = (file) =>{
  const filepath = file + '.orc'
  for(let i = 1; i <= countLinesOfCode(filepath); i++){
    const line = getCodeAtLine(filepath, i);
    const splitLine = line.split(' ');
    const command = splitLine[0];
    switch(command){
      case 'ENTER_PASS':
        db.enterPass(splitLine[1]);
        break;
      case 'INIT_DB':
        init.db(splitLine[1], splitLine[2]);
        break;
      case 'SELECT_DB':
        db = require(path.join(__dirname, splitLine[1], 'db.js'));
        dbInfo = require(path.join(__dirname, splitLine[1], 'dbInfo.json'));
        console.log(`<<Database ${splitLine[1]} Selected`);
        break;
      case 'RETURN_SELECTED_DB':
        if(dbInfo.dbName === 'undefined'){
          console.log('<<No Database Curently Selected');
        }else{
          console.log(`<<Database ${dbInfo.dbName} is Curently Selected.`);
        }
        break;
      case 'NEW_DOC':
        db.newDoc(splitLine[1]);
        break;
      case 'READ_DOC':
        db.readDoc(splitLine[1]);
        break;
      case 'WRITE_DOC':
        const content = JSON.parse(joinArrayRange(splitLine, 2, splitLine.length).replace(/'/g, '"').replace(/([a-zA-Z_]+):/g, '"$1":'));
        console.log(content);
        db.writeDoc(splitLine[1], content);
        break;
      case 'DEL_DOC':
        db.deleteDoc(splitLine[1]);
        break;
      case 'RESTORE_DOC':
        db.restoreDoc(splitLine[1]);
        break;
      case 'EMPTY_TRASH':
        db.emptyTrash();
        break;
      case 'RENAME_DOC':
        db.renameDoc(splitLine[1], splitLine[2]);
        break;
      case 'RETURN_DOC_PATH':
        db.returnDocPath(splitLine[1]);
        break;
      case 'COPY_DB':
        db.copyDb(splitLine[1], splitLine[2]);
        break;
      case 'DEL_DB':
        db.deleteDb(splitLine[1]);
        break;
      case 'EDIT_DOC_VAR':
        db.editDoc(splitLine[1], splitLine[2], splitLine[3]);
        break;
      case 'ADD_DOC_VAR':
        db.addVariable(splitLine[1], splitLine[2], splitLine[3]);
        break;
      case 'DEL_DOC_VAR':
        db.deleteVariable(splitLine[1], splitLine[2]);
        break;
      case 'LIST_DOCS':
        db.listDocs();
        break;
      case '*':
        break;
      default:
        console.log('Error: Ln' + i + ', Command Not Found');
        break;
    }
  }
}
module.exports = {run};