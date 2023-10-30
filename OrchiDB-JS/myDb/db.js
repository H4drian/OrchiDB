const fs = require('fs-extra');
const path = require('path');
const dbInfo = require('./dbInfo.json');
const enterPass = (inputPass) => {
  dbInfo.dbInputPass = inputPass;
};
const newDoc = (filename) => {
  if (dbInfo.dbInputPass === dbInfo.dbPass) {
    const dbPath = path.join(__dirname);
    console.log(dbPath);
    const filePath = path.join(dbPath, filename + '.json');
    if (fs.existsSync(filePath)) {
      return console.log(`Document ${filePath} exists.`);
    }
    fs.appendFileSync(filePath, '');
    console.log(`Document ${filename} created.`);
  } else {
    console.log('Invalid Password.');
  }
};
const returnDocPath = (filename) => {
  if (dbInfo.dbInputPass === dbInfo.dbPass) {
    const dbPath = path.join(__dirname);
    console.log(`Path to ${filename}: ${path.join(dbPath, filename +'.json')}`);
    return path.join(dbPath, filename +'.json');
  } else {
    console.log('Invalid Password.');
  }
};
const deleteDoc = (filename) => {
  if (dbInfo.dbInputPass === dbInfo.dbPass) {
    const dbPath = path.join(__dirname);
    const filePath = path.join(dbPath, filename + '.json');
    const targetPath = path.join(__dirname, 'TRASH', filename + '.json');
    if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
      fs.rmdirSync(targetPath, { recursive: true });
    }
    fs.renameSync(filePath, targetPath);
    console.log(`Document ${filename} moved to TRASH folder.`);
  } else {
    console.log('Invalid Password.');
  }
};
const restoreDoc = (filename) => {
  if (dbInfo.dbInputPass === dbInfo.dbPass) {
    const dbPath = path.join(__dirname);
    const filePath = path.join(__dirname, 'TRASH', filename + '.json');
    if (!fs.existsSync(filePath)) {
      console.log('Document does not exist in trash.');
      return;
    }
    const newFilePath = path.join(dbPath, filename + '.json');
    fs.copyFileSync(filePath, newFilePath);
    fs.unlinkSync(filePath);
    console.log(`Document ${filename} restored.`);
  } else {
    console.log('Invalid Password');
  }
};
const emptyTrash = () => {
  if (dbInfo.dbInputPass === dbInfo.dbPass) {
    const trashPath = path.join(__dirname, 'TRASH');
    fs.readdirSync(trashPath).forEach((file) => {
      const filePath = path.join(trashPath, file);
      fs.unlinkSync(filePath);
    });
    console.log('Trash emptied.');
  } else {
    console.log('Invalid Password.');
  }
};
const renameDoc = (filename, newFilename) => {
  if (dbInfo.dbInputPass === dbInfo.dbPass) {
    const dbPath = path.join(__dirname);
    const filePath = path.join(dbPath, filename + '.json');
    const newFilePath = path.join(dbPath, newFilename + '.json');
    if (fs.existsSync(newFilePath)) {
      console.log(`Document ${newFilename} already exists.`);
      return;
    }
    fs.renameSync(filePath, newFilePath);
    console.log(`Document ${filename} changed to ${newFilename}.`);
  } else {
    console.log('Invalid Password.');
  }
};
const readDoc = (filename) => {
  if (dbInfo.dbInputPass === dbInfo.dbPass) {
    const dbPath = path.join(__dirname);
    const filePath = path.join(dbPath, filename + '.json');
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(`${filename}:\n${data}`);
    return JSON.parse(data);
  } else {
    console.log('Invalid Password.');
  }
};
const writeDoc = (filename, data) => {
  if (dbInfo.dbInputPass === dbInfo.dbPass) {
    const dbPath = path.join(__dirname);
    const filePath = path.join(dbPath, filename + '.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Document ${filename} written to.`);
  } else {
    console.log('Invalid Password.');
  }
};
const copyDb = (dbName, dbPass) => {
  if(dbName == null){
    dbName = `Copy of ${dbInfo.dbName}`;
  }
  if(dbInfo.dbInputPass === dbInfo.dbPass){
    const copy = path.join('./OrchiDB-JS', dbName);
    try{
      fs.cpSync(__dirname, copy, {recursive: true});
      fs.writeFileSync(path.join(copy, 'dbInfo.json'), JSON.stringify({ dbName, dbPass }, null, 2));
      console.log(`Database ${dbInfo.dbName} copied to ${dbName}.`);
      copyDbInfo = require(path.join(copy, 'dbInfo.json'));
      copyDbInfo.dbName = dbName;
    }catch(err){
      console.log(`Error in copying database ${dbInfo.dbName}: ${err}`)
    }
  }
}
const deleteDbWithoutTimeout = (pass, confirmation) =>{
  try {
    if(confirmation == 'Y'){
      if (dbInfo.dbInputPass === dbInfo.dbPass && pass === dbInfo.dbPass) {
        const targetDbName = dbInfo.dbName;
        const dbPath = path.join(__dirname, '..', targetDbName);
        const deleteFolderRecursive = (directory) => {
          if (fs.existsSync(directory)) {
            fs.readdirSync(directory).forEach((file) => {
              const curPath = path.join(directory, file);
              if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
              } else {
                fs.unlinkSync(curPath);
              }
            });
            fs.rmdirSync(directory);
          } else {
            console.log(`Database ${targetDbName} does not exist.`); 
          }
        };
        deleteFolderRecursive(dbPath);
        console.log(`Database ${targetDbName} deleted.`);
      } else {
        console.log('Invalid Password.');
      }
    }else{
      console.log('Database deletion canceled.')
    }
  } catch (err) {
    console.error(err);
  }
}
const deleteDb = (pass) => {
  console.log(`Attempting to delete database ${dbInfo.dbName} in T -10s.`);
  setTimeout(() => {
    try {
      if (dbInfo.dbInputPass === dbInfo.dbPass && pass === dbInfo.dbPass) {
        const targetDbName = dbInfo.dbName;
        const dbPath = path.join(__dirname, '..', targetDbName);
        const deleteFolderRecursive = (directory) => {
          if (fs.existsSync(directory)) {
            fs.readdirSync(directory).forEach((file) => {
              const curPath = path.join(directory, file);
              if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
              } else {
                fs.unlinkSync(curPath);
              }
            });
            fs.rmdirSync(directory);
          } else {
            console.log(`Database ${targetDbName} does not exist.`);
          }
        };
        deleteFolderRecursive(dbPath);
        console.log(`Database ${targetDbName} deleted.`);
      } else {
        console.log('Invalid Password.');
      }
    } catch (err) {
      console.error(err);
    }
  }, 10000);
};
const listDocs = () => {
  if(dbInfo.dbPass === dbInfo.dbInputPass){
    const dbPath = path.join(__dirname);
    const fileList = fs.readdirSync(dbPath);
    console.log(fileList);
  }else{
    console.log('Invalid Password.')
  }
};
module.exports = {
  enterPass,
  newDoc,
  deleteDoc,
  returnDocPath,
  restoreDoc,
  emptyTrash,
  renameDoc,
  readDoc,
  writeDoc,
  deleteDb,
  deleteDbWithoutTimeout,
  copyDb,
  listDocs
};