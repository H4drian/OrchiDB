const fs = require('fs');
const path = require('path');
const readline = require('readline');
const prompt = require('prompt-sync')();

class Collection{
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
    console.log(`Document ${filename} updated.`);
  };

  copyCol(targetCollection) {
    function copyDir(source, target){
      if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach((file) => {
          const curSource = path.join(source, file);
          const curTarget = path.join(target, file);
          this.copyDir(curSource, curTarget);
        });
      } else {
        fs.copyFileSync(source, target);
      }
    }
    const targetColPath = path.join(__dirname, targetCollection);
    if (!fs.existsSync(targetColPath)) {
      fs.mkdirSync(targetColPath);
    }
    const targetTrashPath = path.join(targetColPath, 'TRASH');
    if (!fs.existsSync(targetTrashPath)) {
      fs.mkdirSync(targetTrashPath);
    } 
    const fileList = fs.readdirSync(this.colPath);
    fileList.forEach((file) => {
      const filePath = path.join(this.colPath, file);
      const targetPath = path.join(targetColPath, file);
      const isDirectory = fs.lstatSync(filePath).isDirectory();
      if (isDirectory) {
        fs.mkdirSync(targetPath, { recursive: true });
        copyDir(filePath, targetPath);
      } else {
        fs.copyFileSync(filePath, targetPath);
      }
    });
    console.log(`All files copied to collection '${targetCollection}' and overwritten if exists.`);
  }
  
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
        deleteFolderRecursive(colPath);
        console.log(`Collection ${this.name} deleted.`);
    } catch (err) { 
        console.error(`Error while deleting collection ${this.name}: ${err}`);
    }
  };

  listDocs(){
    const fileList = fs.readdirSync(this.colPath);
    console.log(fileList);
  };

  updateVariable(filename, variable, value){
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

  newVariable(filename, variable, value){
    const filePath = path.join(this.colPath, filename + '.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    jsonData[variable] = value;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    console.log(`New variable ${variable} with value ${value} added to file '${filename}.json'.`);
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
    console.log(`Variable ${variable} removed from file '${filename}.json'.`);
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
          const newContentStr = prompt('<<Enter Content: \n>>');
          const newContent = JSON.parse(newContentStr);
          this.newDoc(newDocName, newContent);
          this.terminal.run();
          break;
        case 'READ_DOC':
          const readDocName = prompt('<<Enter Doc Name: \n>>');
          this.readDoc(readDocName);
          this.terminal.run();
          break;
        case 'UPDATE_DOC':
          const updatedDocName = prompt('<<Enter Doc Name: \n>>');
          const updatedContentStr = prompt('<<Enter Content: \n>>');
          const updatedContent = JSON.parse(updatedContentStr);
          this.updateDoc(updatedDocName, updatedContent);
          this.terminal.run();
          break;
        case 'DEL_DOC':
          const deleteDocName = prompt('<<Enter Doc Name: \n>>');
          this.deleteDoc(deleteDocName);
          this.terminal.run();
          break;
        case 'RESTORE_DOC':
          const restoreDocName = prompt('<<Enter Doc Name: \n>>');
          this.restoreDoc(restoreDocName);
          this.terminal.run();
          break;
        case 'EMPTY_TRASH':
          this.emptyTrash();
          this.terminal.run();
          break;
        case 'RENAME_DOC':
          const renameDocName = prompt('<<Enter Doc Name: \n>>');
          const newName = prompt('<<Enter New Doc Name: \n>>');
          this.renameDoc(renameDocName, newName);
          this.terminal.run();
          break;
        case 'RETURN_PATH':
          const returnPathName = prompt('<<Enter Doc Name: \n>>');
          this.returnDocPath(returnPathName);
          this.terminal.run();
          break;
        case 'COPY_COL':
          const copyColName = prompt('<<Enter New Collection Name: \n>>');
          this.copyCol(copyColName);
          this.terminal.run();
          break;
        case 'COPY_DOC_TO_COL':
          const copyDocName = prompt('<<Enter Doc Name: \n>>');
          const copy_ColName = prompt('<<Enter Collection Name: \n>>');
          this.copyDocToCol(copyDocName, copy_ColName);
          this.terminal.run();
          break;
        case 'DEL_COL':
          this.deleteCol();
          this.terminal.run();
          break;
        case 'CLEAR':
          console.clear();
          this.terminal.run();
          break;
        case 'UPDATE_DOC_VAR':
          const updateDocName = prompt("<<Enter Doc Name: \n>>");
          const variable = prompt("<<Enter Variable Name: \n>>");
          const value = prompt("<<Enter Value: \n>>");
          this.updateVariable(updateDocName, variable, value);
          this.terminal.run();
          break;
        case 'NEW_DOC_VAR':
          const new_DocName = prompt('<<Enter Doc Name: \n>>');
          const newVarName = prompt('<<Enter Variable Name: \n>>');
          const varValue = prompt('<<Enter Variable Value: \n>>');
          this.newVariable(new_DocName, newVarName, varValue);
          this.terminal.run();
          break;
        case 'DEL_DOC_VAR':
          const delDocName = prompt("<<Enter Doc Name: \n>>");
          const delVarName = prompt("<<Enter Variable Name: \n>>");
          this.deleteVariable(delDocName, delVarName);
          this.terminal.run();
          break;
        case 'LIST_DOCS':
          this.listDocs();
          this.terminal.run();
          break;
        case 'RETURN_DOC_VAR':
          const readDocname = prompt('<<Enter Doc Name: \n>>');
          const readVarName = prompt('<<Enter Variable Name: \n>>');
          this.returnVariable(readDocname, readVarName);
          this.terminal.run();
          break;
        default:
          console.log('<<Invalid Command');
          this.terminal.run();
          break;
      }
    }
  };
}

module.exports = { Collection };