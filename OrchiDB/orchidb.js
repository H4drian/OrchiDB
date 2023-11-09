const fs = require('fs');
const path = require('path');
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
    this.terminal = {
      promptMessage: `${path.basename(__dirname)}@${this.name}:~$`,
      run: () => {
        console.log(`\n|--------------------${this.name} Terminal--------------------|`);
        while (true) {
          let command = prompt(this.terminal.promptMessage);
          switch (command) {
            case 'EXIT':
              console.log('Exiting Terminal');
              console.log('|-------------------------------------------------------------| \n');
              return;
            case 'NEW_DOC':
              console.log('Enter Doc Name:');
              const newDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Content:');
              const newContentStr = prompt(this.terminal.promptMessage);
              const newContent = JSON.parse(newContentStr);
              this.newDoc(newDocName, newContent);
              break;
            case 'READ_DOC':
              console.log('Enter Doc Name:');
              const readDocName = prompt(this.terminal.promptMessage);
              this.readDoc(readDocName);
              break;
            case 'UPDATE_DOC':
              console.log('Enter Doc Name:');
              const updatedDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Content:');
              const updatedContentStr = prompt(this.terminal.promptMessage);
              const updatedContent = JSON.parse(updatedContentStr);
              this.updateDoc(updatedDocName, updatedContent);
              break;
            case 'DEL_DOC':
              console.log('Enter Doc Name:');
              const deleteDocName = prompt(this.terminal.promptMessage);
              this.deleteDoc(deleteDocName);
              break;
            case 'RESTORE_DOC':
              console.log('Enter Doc Name:');
              const restoreDocName = prompt(this.terminal.promptMessage);
              this.restoreDoc(restoreDocName);
              break;
            case 'EMPTY_TRASH':
              this.emptyTrash();
              break;
            case 'RENAME_DOC':
              console.log('Enter Doc Name:');
              const renameDocName = prompt(this.terminal.promptMessage);
              console.log('Enter New Doc Name:');
              const newName = prompt(this.terminal.promptMessage);
              this.renameDoc(renameDocName, newName);
              break;
            case 'RETURN_PATH':
              console.log('Enter Doc Name:');
              const returnPathName = prompt(this.terminal.promptMessage);
              this.returnDocPath(returnPathName);
              break;
            case 'COPY_COL':
              console.log('Enter Target Collection:');
              const copyColName = prompt(this.terminal.promptMessage);
              this.copyCol(copyColName);
              break;
            case 'COPY_DOC_TO_COL':
              console.log('Enter Doc Name:');
              const copyDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Target Collection:');
              const copy_ColName = prompt(this.terminal.promptMessage);
              this.copyDocToCol(copyDocName, copy_ColName);
              break;
            case 'DEL_COL':
              this.deleteCol();
              break;
            case 'CLEAR':
              console.clear();
              console.log(`|--------------------${this.name} Terminal--------------------|`);
              break;
            case 'UPDATE_DOC_VAR':
              console.log('Enter Doc Name:');
              const updateDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Variable Name:');
              const variable = prompt(this.terminal.promptMessage);
              console.log('Enter Value:');
              const value = prompt(this.terminal.promptMessage);
              this.updateVariable(updateDocName, variable, value);
              break;
            case 'NEW_DOC_VAR':
              console.log('Enter Doc Name:');
              const new_DocName = prompt(this.terminal.promptMessage);
              console.log('Enter Variable Name:');
              const newVarName = prompt(this.terminal.promptMessage);
              console.log('Enter Variable Value:');
              const varValue = prompt(this.terminal.promptMessage);
              this.newVariable(new_DocName, newVarName, varValue);
              break;
            case 'DEL_DOC_VAR':
              console.log('Enter Doc Name:');
              const delDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Variable Name:');
              const delVarName = prompt(this.terminal.promptMessage);
              this.deleteVariable(delDocName, delVarName);
              break;
            case 'LIST_DOCS':
              this.listDocs();
              break;
            case 'RETURN_DOC_VAR':
              console.log('Enter Doc Name:');
              const readDocname = prompt(this.terminal.promptMessage);
              console.log('Enter Variable Name:');
              const readVarName = prompt(this.terminal.promptMessage);
              this.returnVariable(readDocname, readVarName);
              break;
            case 'HELP':
              console.log('|------------------------------------------COMMANDS-----------------------------------------|')
              console.log("EXIT: Exit the terminal.");
              console.log('');
              console.log("NEW_DOC: Create a new document in the collection with specified name and content.");
              console.log('');
              console.log("READ_DOC: Read the content of a document with specified name.");
              console.log('');
              console.log("UPDATE_DOC: Update the content of a document with specified name.");
              console.log('');
              console.log("DEL_DOC: Delete a document with specified name and move it to the TRASH folder.");
              console.log('');
              console.log("RESTORE_DOC: Restore a document from the TRASH folder to its original location.");
              console.log('');
              console.log("EMPTY_TRASH: Empty the TRASH folder and permanently delete all its contents.");
              console.log('');
              console.log("RENAME_DOC: Rename a document by providing its current name and the new name.");
              console.log('');
              console.log("RETURN_PATH: Return the file path of a document with specified name.");
              console.log('');
              console.log("COPY_COL: Create a copy of the entire collection with a new name.");
              console.log('');
              console.log("COPY_DOC_TO_COL: Copy a document from the current collection to another collection.");
              console.log('');
              console.log("DEL_COL: Delete the entire collection, including all its documents and the TRASH folder.");
              console.log('');
              console.log("CLEAR: Clear the console screen.");
              console.log('');
              console.log("UPDATE_DOC_VAR: Update the value of a variable in a document.");
              console.log('');
              console.log("NEW_DOC_VAR: Add a new variable with a value to a document.");
              console.log('');
              console.log("DEL_DOC_VAR: Delete a variable from a document.");
              console.log('');
              console.log("LIST_DOCS: List all the documents in the collection.");
              console.log('');
              console.log("RETURN_DOC_VAR: Return the value of a variable in a document.");
              console.log('');
              console.log("HELP: Display information about the available commands.");
              console.log('');
              console.log('|--------------------------------------------------------------------------------------|');
              console.log('');
              break;
            default:
              console.log('Invalid Command');
              break;
          }
        }
      }
    };
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
}

module.exports = { Collection };