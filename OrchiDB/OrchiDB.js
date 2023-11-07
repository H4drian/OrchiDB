const fs = require('fs');
const path = require('path');

class collection{
  constructor(name){
    this.name = name;
    this.colPath = path.join(__dirname, this.name);
    if (!fs.existsSync(this.colPath)) {
      fs.mkdirSync(this.colPath);
      fs.mkdirSync(path.join(this.colPath, 'TRASH'));
      console.log(`Folder ${this.name} created with TRASH folder.`);
      console.log(`Original files copied to the new directory.`);
    } else {
      console.log(`Folder ${this.name} already exists.`);
    }
  };

  newDoc(filename, data){
    const filePath = path.join(this.colPath, filename + '.json');
    if (fs.existsSync(filePath)) {
        return console.log(`Document ${filePath} exists.`);
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Document ${filename} created.`);
  };

  returnDocPath(filename){
    console.log(`Path to ${filename}: ${path.join(this.colPath, filename + '.json')}`);
    return path.join(this.colPath, filename + '.json');
  };

  deleteDoc(filename){
    const filePath = path.join(this.colPath, filename + '.json');
    const targetPath = path.join(this.colPath, 'TRASH', filename + '.json');
    if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
        fs.rmdirSync(targetPath, { recursive: true });
    }
    fs.renameSync(filePath, targetPath);
    console.log(`Document ${filename} moved to TRASH folder.`);
  };

  restoreDoc(filename){
    const filePath = path.join(this.colPath, 'TRASH', filename + '.json');
    if (!fs.existsSync(filePath)) {
        console.log('Document does not exist in trash.');
        return;
    }
    const newFilePath = path.join(this.colPath, filename + '.json');
    fs.copyFileSync(filePath, newFilePath);
    fs.unlinkSync(filePath);
    console.log(`Document ${filename} restored.`);
  };

  emptyTrash(){
    const trashPath = path.join(this.colPath, 'TRASH');
    fs.readdirSync(trashPath).forEach((file) => {
        const filePath = path.join(trashPath, file);
        fs.unlinkSync(filePath);
    });
    console.log('Trash emptied.');
  };

  renameDoc(filename, newFilename){
    const filePath = path.join(this.colPath, filename + '.json');
    const newFilePath = path.join(this.colPath, newFilename + '.json');
    if (fs.existsSync(newFilePath)) {
        console.log(`Document ${newFilename} already exists.`);
        return;
    }
    fs.renameSync(filePath, newFilePath);
    console.log(`Document ${filename} changed to ${newFilename}.`);
  };

  readDoc(filename){
    const filePath = path.join(this.colPath, filename + '.json');
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(`${filename}:\n${data}`);
    return JSON.parse(data);
  };

  updateDoc(filename, data){
    const filePath = path.join(this.colPath, filename + '.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Document ${filename} written to.`);
  };

  copyCol(targetCollection) {
    const targetColPath = path.join(__dirname, targetCollection);
    if (!fs.existsSync(targetColPath)) {
      fs.mkdirSync(targetColPath);
    }
    const fileList = fs.readdirSync(this.colPath);
    fileList.forEach((file) => {
      const filePath = path.join(this.colPath, file);
      const targetPath = path.join(targetColPath, file);
      fs.copyFileSync(filePath, targetPath);
    });
    console.log(`All files copied to collection '${targetCollection}'.`);
  };

  copyDocToCol(docName, targetCollection){
    const filePath = path.join(this.colPath, `${docName}.json`);
    const targetColPath = path.join(__dirname, targetCollection);
    if (!fs.existsSync(targetColPath)) {
      fs.mkdirSync(targetColPath);
    }
    const targetPath = path.join(targetColPath, `${docName}.json`);
    fs.copyFileSync(filePath, targetPath);
    console.log(`Document '${docName}.json' copied to collection '${targetCollection}'.`);
  };
  
  deleteCol(){
    const deleteFolderRecursive = (directory) => {
        if (fs.existsSync(directory)) {
            fs.readdirSync(directory).forEach((file, index) => {
            const curPath = path.join(directory, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
            });
            fs.rmdirSync(directory);
        }
    };
    try {
        const colPath = path.join(__dirname, this.name);
        setTimeout(() => {
            deleteFolderRecursive(colPath);
        }, 10000);
        console.log(`Collection ${this.name} deleted.`);
    } catch (err) {
        console.error(`Error while deleting collection ${this.name}: ${err}`);
    }
  };

  listDocs(){
    const fileList = fs.readdirSync(this.colPath);
    console.log(fileList);
  };

  editVariable(filename, variable, value){
    const filePath = path.join(this.colPath, filename + '.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        jsonData[variable] = value;
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        console.log(`Variable '${variable}' set to ${value} in file '${filename}.json'`);
    } else {
        console.log(`File '${filename}.json' does not exist.`);
    }
  };

  addVariable(filename, variable, value){
    const filePath = path.join(this.colPath, filename + '.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    jsonData[variable] = value;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    console.log(`New variable ${variable} with value ${value} added to file ${filename}.`);
  };

  returnVariable(docName, variable){
    const doc = require(path.join(this.colPath, `${docName}.json`));
    console.log(`${doc[variable]}`);
    return doc[variable];
  };
  
  deleteVariable(filename, variable){
    const filePath = path.join(this.colPath, filename + '.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    delete jsonData[variable];
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    console.log(`Variable ${variable} removed from file ${filename}.`);
  };

  terminal = {
    run: () => {
      let command = prompt('>>');
      switch (command) {
        case 'EXIT':
          console.log('<<Exiting Terminal');
          break;
        case 'NEW_DOC':
          const newDocName = prompt('<<Enter Doc Name: \n>>');
          this.newDoc(newDocName);
          run();
          break;
        case 'READ_DOC':
          const readDocName = prompt('<<Enter Doc Name: \n>>');
          this.readDoc(readDocName);
          run();
          break;
        case 'WRITE_DOC':
          const writeDocName = prompt('<<Enter Doc Name: \n>>');
          const contentStr = prompt('<<Enter Content: \n>>');
          const content = JSON.parse(contentStr);
          this.writeDoc(writeDocName, content);
          run();
          break;
        case 'DEL_DOC':
          const deleteDocName = prompt('<<Enter Doc Name: \n>>');
          this.deleteDoc(deleteDocName);
          run();
          break;
        case 'RESTORE_DOC':
          const restoreDocName = prompt('<<Enter Doc Name: \n>>');
          this.restoreDoc(restoreDocName);
          run();
          break;
        case 'EMPTY_TRASH':
          this.emptyTrash();
          run();
          break;
        case 'RENAME_DOC':
          const renameDocName = prompt('<<Enter Doc Name: \n>>');
          const newName = prompt('<<Enter New Doc Name: \n>>');
          this.renameDoc(renameDocName, newName);
          run();
          break;
        case 'RETURN_PATH':
          const returnPathName = prompt('<<Enter Doc Name: \n>>');
          this.returnPath(returnPathName);
          run();
          break;
        case 'COPY_COL':
          const copyColName = prompt('<<Enter Collection Name: \n>>');
          const newColName = prompt('<<Enter New Collection Name: \n>>');
          this.copyCol(copyColName, newColName);
          run();
          break;
        case 'DEL_COL':
          this.deleteCol();
          run();
          break;
        case 'CLEAR':
          console.clear();
          run();
          break;
        case 'EDIT_DOC_VAR':
          const editDocName = prompt("<<Enter Doc Name: \n>>");
          const variable = prompt("<<Enter Variable Name: \n>>");
          const value = prompt("<<Enter Value: \n>>");
          db.editVariable(editDocName, variable, value);
          run();
          break;
        case 'ADD_DOC_VAR':
          const addDocName = prompt('<<Enter Doc Name: \n>>');
          const addVarName = prompt('<<Enter Variable Name: \n>>');
          const varValue = prompt('<<Enter Variable Value: \n>>');
          db.addDocVar(addDocName, addVarName, varValue);
          run();
          break;
        case 'DEL_DOC_VAR':
          const delDocName = prompt("<<Enter Doc Name: \n>>");
          const delVarName = prompt("<<Enter Variable Name: \n>>");
          db.delDocVar(delDocName, delVarName);
          run();
          break;
        case 'LIST_DOCS':
          db.listDocs();
          run();
          break;
        case 'READ_DOC_VAR':
          const readDocname = prompt('<<Enter Doc Name: \n>>');
          const readVarName = prompt('<<Enter Variable Name: \n>>');
          db.readVariable(readDocname, readVarName);
          run();
          break;
        default:
          console.log('<<Invalid Command');
          run();
          break;
      }
    };
  };

  interpreter = {
    run: (file) => {
      const heap = {};
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
      };
      const varTest = (str) => {
        return str.charAt(0) === '*';
      };
      const returnVarName = (str) => {
        return str.slice(1);
      };
      const getCodeAtLine = (filepath, line_number) => {
        const fs = require('fs');
        const lines = fs.readFileSync(filepath, 'utf8').split('\n');
        if (line_number >= 1 && line_number <= lines.length) {
            return lines[line_number - 1].trim();
        } else {
            console.log(`Error: Ln${line_number}, Command Not Found`);
            return '';
        }
      };
      const countLinesOfCode = (filepath) => {
        const fs = require('fs');
        if (!filepath) {
            console.log('Error: filepath argument is missing');
            return 0;
        }
        const lines = fs.readFileSync(filepath, 'utf8').split('\n');
        return lines.length;
      };
      if(!file.substr(-4) === '.orc') {
          file = file + '.orc';
      }
      for(let i = 1; i < countLinesOfCode(file); i++){
        const line = getCodeAtLine(file, i);
        const splitLine = splitLine(line);
        const command = splitLine[0];
        for(let j = 0; j < splitLine.length; j++){
          if(varTest(splitLine[j])){
            splitLine[j] = heap[returnVarName(splitLine[j])];
          }
        }
        switch(command){
          case 'NEW_DOC':
            this.newDoc(splitLine[1]);
            break;
          case 'READ_DOC':
            this.readDoc(splitLine[1]);
            break;
          case 'WRITE_DOC':
            const content = JSON.parse(joinArrayRange(splitLine, 2, splitLine.length).replace(/'/g, '"').replace(/([a-zA-Z_]+):/g, '"$1":'));
            console.log(content);
            this.writeDoc(splitLine[1], content);
            break;
          case 'DEL_DOC':
            this.deleteDoc(splitLine[1]);
            break;
          case 'RESTORE_DOC':
            this.restoreDoc(splitLine[1]);
            break;
          case 'EMPTY_TRASH':
            this.emptyTrash();
            break;
          case 'RENAME_DOC':
            this.renameDoc(splitLine[1], splitLine[2]);
            break;
          case 'RETURN_DOC_PATH':
            this.returnDocPath(splitLine[1]);
            break;
          case 'COPY_COL':
            this.copyDb(splitLine[1], splitLine[2]);
            break;
          case 'DEL_COL':
            this.deleteDb(splitLine[1]);
            break;
          case 'EDIT_DOC_VAR':
            this.editVariable(splitLine[1], splitLine[2], splitLine[3]);
            break;
          case 'ADD_DOC_VAR':
            this.addVariable(splitLine[1], splitLine[2], splitLine[3]);
            break;
          case 'DEL_DOC_VAR':
            this.deleteVariable(splitLine[1], splitLine[2]);
            break;
          case 'LIST_DOCS':
            this.listDocs();
            break;
          case 'READ_DOC_VAR':
            this.readVariable(splitLine[1], splitLine[2]);
            break;
          case 'VAR':
            const varName = splitLine[1];
            if(!splitLine[2] == ':='){
              console.log(`Error: Ln ${i}, Syntax Error - Expected ':=', Got ${splitLine[2]}`);
            }
            const varValue = splitLine[3];
            heap[varName] = varValue;
            break;
          case '#':
            break;
          case '':
            break;
          default:
            console.log('Error: Ln' + i + ', Command Not Found');
            break;
        }
      }
    };
  };
}
module.exports = { collection };