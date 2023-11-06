const fs = require('fs');
const path = require('path');
const collection = (dbName) => {
  const dbPath = path.join(__dirname, dbName);
  const currentFilePath = path.join(__dirname, 'func.js');
  const targetFilePath = path.join(dbPath, 'func.js');
  const sourceTxtFilePath = path.join(__dirname, 'func.txt');
  const targetJsFilePath = path.join(dbPath, 'func.js');
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath);
    fs.writeFileSync(path.join(dbPath, 'dbInfo.json'), JSON.stringify({ dbName }, null, 2));
    fs.mkdirSync(path.join(dbPath, 'TRASH'));
    if (fs.existsSync(currentFilePath)) {
      fs.copyFileSync(currentFilePath, targetJsFilePath);
    }
    if (fs.existsSync(sourceTxtFilePath)) {
      fs.copyFileSync(sourceTxtFilePath, targetFilePath);
    }
    console.log(`Folder ${dbName} created with dbInfo.json file and TRASH folder.`);
    console.log(`Original files copied to the new directory.`);
  } else {
    console.log(`Folder ${dbName} already exists.`);
    if (fs.existsSync(currentFilePath)) {
      fs.copyFileSync(currentFilePath, targetJsFilePath);
      console.log(`File func.js copied to the new directory.`);
    }
    if (fs.existsSync(sourceTxtFilePath)) {
      fs.copyFileSync(sourceTxtFilePath, targetFilePath);
      console.log(`File func.txt copied as func.js in the new directory.`);
    }
  }
};
module.exports = { collection }; 