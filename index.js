//Add 'has' method that checks if a file exists in a collection, return true or false
const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();

class Collection{
  constructor(dbPath, name){
    this.dbPath = dbPath;
    this.name = name;
    this.colPath = path.join(dbPath, this.name);
    if (!fs.existsSync(this.colPath)) {
      fs.mkdirSync(this.colPath);
      fs.mkdirSync(path.join(this.colPath, 'TRASH'));
      console.log(`Folder ${this.name} created with TRASH folder.`);
      console.log(`Original files copied to the new directory.`);
    } else {
      console.log(`Folder ${this.name} already exists.`);
    }
    this.terminal = {
      promptMessage: `${path.basename(dbPath)}@${this.name}:~$`,
      run: () => {
        console.log(`\n|--------------------${this.name} Terminal--------------------|`);
        while (true) {
          let command = prompt(this.terminal.promptMessage).toLowerCase().trim();
          switch (command){
            case 'exit':
              console.log('Exiting Terminal');
              console.log('|-------------------------------------------------------------| \n');
              return;
            case 'insert':
              console.log('Enter Doc Name:');
              const newDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Content:');
              const newContentStr = prompt(this.terminal.promptMessage);
              const newContent = JSON.parse(newContentStr);
              this.insert(newDocName, newContent);
              break;
            case 'get':
              console.log('Enter Doc Name:');
              const readDocName = prompt(this.terminal.promptMessage);
              this.get(readDocName);
              break;
            case 'update':
              console.log('Enter Doc Name:');
              const updatedDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Content:');
              const updatedContentStr = prompt(this.terminal.promptMessage);
              const updatedContent = JSON.parse(updatedContentStr);
              this.update(updatedDocName, updatedContent);
              break;
            case 'del':
              console.log('Enter Doc Name:');
              const deleteDocName = prompt(this.terminal.promptMessage);
              this.delete(deleteDocName);
              break;
            case 'restore':
              console.log('Enter Doc Name:');
              const restoreDocName = prompt(this.terminal.promptMessage);
              this.restore(restoreDocName);
              break;
            case 'empty_trash':
              this.emptyTrash();
              break;
            case 'rename':
              console.log('Enter Doc Name:');
              const renameDocName = prompt(this.terminal.promptMessage);
              console.log('Enter New Doc Name:');
              const newName = prompt(this.terminal.promptMessage);
              this.rename(renameDocName, newName);
              break;
            case 'get_path':
              console.log('Enter Doc Name:');
              const returnPathName = prompt(this.terminal.promptMessage);
              this.getPath(returnPathName);
              break;
            case 'copy_col':
              console.log('Enter Target Collection:');
              const copyColName = prompt(this.terminal.promptMessage);
              this.copyCol(copyColName);
              break;
            case 'copy_doc_to_col':
              console.log('Enter Doc Name:');
              const copyDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Target Collection:');
              const copy_ColName = prompt(this.terminal.promptMessage);
              this.copyDocToCol(copyDocName, copy_ColName);
              break;
            case 'del_col':
              this.deleteCol();
              break;
            case 'clear':
              console.clear();
              console.log(`|--------------------${this.name} Terminal--------------------|`);
              break;
            case 'del_var':
              console.log('Enter Doc Name:');
              const delDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Variable Name:');
              const delVarName = prompt(this.terminal.promptMessage);
              this.deleteVar(delDocName, delVarName);
              break;
            case 'find':
              console.log('[Optional] Enter Properties: ');
              const properties = JSON.parse(prompt(this.terminal.promptMessage));
              this.find(properties);
              break;
            case 'get_var':
              console.log('Enter Doc Name:');
              const readDocname = prompt(this.terminal.promptMessage);
              console.log('Enter List of Variables:');
              const readVarList = prompt(this.terminal.promptMessage).split(', ');
              this.getVar(readDocname, readVarList);
              break;
            case 'overwrite':
              console.log('Enter Doc Name:');
              const overwriteDocName = prompt(this.terminal.promptMessage);
              console.log('Enter Content:');
              const overwriteContentStr = prompt(this.terminal.promptMessage);
              const overwriteContent = JSON.parse(overwriteContentStr);
              this.overwrite(overwriteDocName, overwriteContent);
              break; 
            case 'help':
              console.log('|------------------------------------------COMMANDS-----------------------------------------|')
              console.log("exit: Exit the terminal.");
              console.log('');
              console.log("insert: Create a new document in the collection with specified name and content.");
              console.log('');
              console.log("get: Read the content of a document with specified name.");
              console.log('');
              console.log("update: Update the content of a document with specified name.");
              console.log('');
              console.log("del: Delete a document with specified name and move it to the TRASH folder.");
              console.log('');
              console.log("restore: Restore a document from the TRASH folder to its original location.");
              console.log('');
              console.log("empty_trash: Empty the TRASH folder and permanently delete all its contents.");
              console.log('');
              console.log("rename: Rename a document by providing its current name and the new name.");
              console.log('');
              console.log("get_path: Return the file path of a document with specified name.");
              console.log('');
              console.log("copy_col: Create a copy of the entire collection with a new name.");
              console.log('');
              console.log("copy_doc_to_col: Copy a document from the current collection to another collection.");
              console.log('');
              console.log("del_col: Delete the entire collection, including all its documents and the TRASH folder.");
              console.log('');
              console.log("clear: Clear the console screen.");
              console.log('');
              console.log("del_var: Delete a variable from a document.");
              console.log('');
              console.log("find: Finds ever document in a collection with specified input properties.");
              console.log('');
              console.log("get_var: Return the value of a variable in a document.");
              console.log('');
              console.log("help: Display information about the available commands.");
              console.log('');
              console.log('Capitalization does not matter when using terminal commands, but spelling does.');
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

  insert(docName, data){
    const filePath = path.join(this.colPath, docName + '.json');
    if (fs.existsSync(filePath)) {
        return console.log(`Document ${filePath} exists.`);
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Document ${docName} created.`);
  };

  getPath(docName, logToConsole){
    const log = logToConsole || true;
    if(log){
      console.log(`Path to ${docName}: ${path.join(this.colPath, docName + '.json')}`);
    }
    return path.join(this.colPath, docName + '.json');
  };

  delete(docName){
    const filePath = path.join(this.colPath, docName + '.json');
    const targetPath = path.join(this.colPath, 'TRASH', docName + '.json');
    if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
        fs.rmdirSync(targetPath, { recursive: true });
    }
    fs.renameSync(filePath, targetPath);
    console.log(`Document ${docName} moved to TRASH folder.`);
  };

  restore(docName){
    const filePath = path.join(this.colPath, 'TRASH', docName + '.json');
    if (!fs.existsSync(filePath)) {
        console.log('Document does not exist in trash.');
        return;
    }
    const newFilePath = path.join(this.colPath, docName + '.json');
    fs.copyFileSync(filePath, newFilePath);
    fs.unlinkSync(filePath);
    console.log(`Document ${docName} restored.`);
  };

  emptyTrash(){
    const trashPath = path.join(this.colPath, 'TRASH');
    fs.readdirSync(trashPath).forEach((file) => {
        const filePath = path.join(trashPath, file);
        fs.unlinkSync(filePath);
    });
    console.log('Trash emptied.');
  };

  rename(docName, newDocName){
    const filePath = path.join(this.colPath, docName + '.json');
    const newFilePath = path.join(this.colPath, newDocName + '.json');
    if (fs.existsSync(newFilePath)) {
        console.log(`Document ${newDocName} already exists.`);
        return;
    }
    fs.renameSync(filePath, newFilePath);
    console.log(`Document ${docName} changed to ${newDocName}.`);
  };

  get(docName, logToConsole){
    const logToConsoleFlag = logToConsole;
    const filePath = path.join(this.colPath, docName + '.json');
    const data = fs.readFileSync(filePath, 'utf8');
    if(logToConsoleFlag == undefined){
      console.log(`${docName}:\n${data}`);
    }
    return JSON.parse(data);
  };

  update(docName, variables){
    const filePath = path.join(this.colPath, docName + '.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const keys = Object.keys(variables);
        const values = Object.values(variables);
        for(let i = 0; i < keys.length; i++){
          jsonData[keys[i]] = values[i];
        } 
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        console.log(`File '${docName}.json' updated.`);
    } else {
        console.log(`File '${docName}.json' does not exist.`);
    }
  };

  overwrite(docName, data){
    const filePath = path.join(this.colPath, docName + '.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`File '${docName}.json' overwritten.`);
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
    const targetColPath = path.join(this.dbPath, targetCollection);
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
    const targetColPath = path.join(this.dbPath, targetCollection);
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
        const colPath = path.join(this.dbPath, this.name);
        deleteFolderRecursive(colPath);
        console.log(`Collection ${this.name} deleted.`);
    } catch (err) { 
        console.error(`Error while deleting collection ${this.name}: ${err}`);
    }
  };

  find(inputProperties){
    const properties = inputProperties || {};
    let outputArr = [];
    const fileList = fs.readdirSync(this.colPath).filter(file => !fs.lstatSync(path.join(this.colPath, file)).isDirectory());
    if (Object.keys(properties).length === 0) {
      fileList.forEach((file) => {
        const data = fs.readFileSync(file, 'utf-8');
        outputArr.push(file);
        console.log(`${file}: `);
        console.log(data);
      });
    } else {
      fileList.forEach((file) => {
        const data = fs.readFileSync(path.join(this.colPath, file), 'utf-8');
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([key, value]) => properties[key] === value)
        );
        if (Object.keys(filteredData).length > 0) {
          outputArr.push(file);
          console.log(`${file}: `);
          console.log(JSON.stringify(filteredData, null, 2));
        }
      });
    }
    return outputArr;
  };

  getVar(docName, variables, logToConsole) {
    const docPath = path.join(this.colPath, docName + '.json');
    const doc = JSON.parse(fs.readFileSync(docPath, 'utf-8'));
    const log = logToConsole || true;
    if (!doc) {
      throw new Error(`Document "${docName}" not found`);
    }
    const result = {};
    variables.forEach(variable => {
      if (doc.hasOwnProperty(variable)) {
        result[variable] = doc[variable];
      }
    });
    if (log) {
      console.log(result);
    }
    return result;
  }

  deleteVar(docName, variables) {
    const filePath = path.join(this.colPath, docName + '.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    variables.forEach((variable) => {
      delete jsonData[variable];
    });
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    console.log(`Variables ${variables} removed from file '${docName}.json'.`);
  }; 

  has(docName, logToConsole){
    const log = logToConsole || true;
    const filePath = path.join(this.colPath, docName + '.json');
    if(log){
      if(fs.existsSync(filePath)){
        console.log(`Document ${docName} exists in collection ${this.name}`);
      }else{
        console.log(`Document ${docName} does not exist in collection ${this.name}`);
      }
    }
    return fs.existsSync(filePath);
  };
}

module.exports = { Collection }; 