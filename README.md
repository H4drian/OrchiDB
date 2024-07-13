# WARNING:
As of 2024 OrchiDB is currently not being maintained. Issues and pull requests can be made but updates from the main contributor(s) (H4diran) will cease.

![OrchiDB_logo](OrchiDB.png)

<p align="center">
  <img src="https://img.shields.io/badge/Repository-Here-yellow?link=https%3A%2F%2Fgithub.com%2FH4drian%2FOrchiDB" alt="Repository">
  <img src="https://img.shields.io/badge/NPM_Package-Here-yellow?cacheSeconds=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Forchidb" alt="NPM">
  <img src="https://img.shields.io/badge/Version-4.2.3-purple" alt="Version">
  <img src="https://img.shields.io/badge/Licence-MIT-blue?link=https%3A%2F%2Fopensource.org%2Flicense%2Fmit%2F" alt="Licence">
</p>

# OrchiDB
OrchiDB is an Open-Source, JSON Document-Oriented database managment system with an emphasis on simple syntax and easy setup. OrchiDB can take queries using JavaScript code using the OrchiDB module or even through text based input through the built in terminal.

# Setup
To get started with OrchiDB, first download the npm module.
```
npm i orchidb
```
then import it to the js file you want to use it in.
```
const db = require('orchidb');
//or with ES6 modules
import db from 'orchidb'
```
## Creating Collections
Collections are the basic unit of storage for OrchiDB, each collection can contain documents, a TRASH folder, and even other collections.

To create a collection use the `db.Collection` constructor, then input the path to your collection relative to the location of the main js file and the name of the collection.
```
const myCollection = new db.Collection('./OrchiDB', 'myCollection');
```
Then from their you can call the many methods included in the `Collection` class.

## Collection Methods
### Terminal
The integrated OrchiDB terminal can be run via the `terminal.run()` method included in the collection which you want to read or write data to.
```
myCollection.terminal.run() //Opens the terminal for the collection 'myCollection'
```
| Commands |
|----------|
|exit      |
|insert    |
|get       |
|update    |
|del       |
|restore   |
|empty_trash|
|rename    |
|get_path  |
|copy_col  |
|del_col   |
|clear     |
|del_var   |
|find      |
|get_var   |
|help      |

### JavaScript Methods
- `insert(docName: string, data: obj)` | Creates a new document
- `get(docName: string)` | Returns the value of the input document, optionally logs value to console
- `update(docName: string, data: obj)` | Adds or overwrites variables from document with input data
- `delete(docName: string)` | Moves document to collection's trash folder
- `getPath(docName: string)` | Returns the path to the document
- `restore(docName: string)` | Moves document from trash to collection folder proper
- `rename(docName: string, newDocName: string)` | Renames document
- `emptyTrash()` | Permanently deletes all documents from trash folder
- `overwrite(docName: string, data: obj)` | Overwrites all data in document to the data inputed
- `copyCol(targetCollection: string)` | Copies all documents and collections to the target collection
- `copyDocToCol(docName: string, targetCollection: string)` | Copies specified document to targetCol
- `deleteCol()` | Deletes directory to collection and every file/folder inside of it
- `find(inputProperties: obj)` | Returns all documents with specified input properties, if no properties specified then it will return all documents in the collection
- `getVar(docName: string, variables: arr)` | Returns the values for the variables specified
- `deleteVar(docName: string, variables: arr)` | Deletes all variables specified

All methods contain a logToConsole parameter as the last parameter of the function. By default this is set as false but if you want to log the results of a function then you can by setting the parameter to true. Additionally the Collection constructor method also has the logToConsole parameter.
## Example Program
~~~
const db = require('orchidb');
const myCollection = new db.Collection('', 'myCollection');
const myCollection2 = new db.Collection('', 'myCollection2');

myCollection.insert('john', {
  first_name: 'John',
  last_name: 'Smith',
  age: 32,
  gender: 'male',
  address: {
    street: '123 Main St',
    city: 'NYC',
    state: 'NY',
    zip: '10001'
  },
});

myCollection.insert('jane', {
  first_name: 'Jane',
  last_name: 'Smith',
  age: 30,
  gender: 'female',
  address: {
    street: '123 Main St',
    city: 'NYC',
    state: 'NY',
    zip: '10001'
  },
});

myCollection.get('john');

myCollection.update('jane', {
  age: 31
});

myCollection.delete('jane');
myCollection.restore('jane');
myCollection.emptyTrash();

myCollection.getPath('jane');

myCollection.insert('sarah', {
  first_name: 'Abagail',
  last_name: 'Thomas',
  age: 22,
  gender: 'female',
  address: {
    street: '123 Main St',
    city: 'NYC',
    state: 'NY',
    zip: '10001'
  },
}); 
myCollection.rename('sarah', 'abagail');

myCollection.copyCol('myCollection2');
myCollection.rename('abagail', 'blank');
myCollection.overwrite('blank', {});
myCollection.copyDocToCol('blank', 'myCollection2');

myCollection.find({
  last_name: 'Smith',
  address: {
    street: '123 Main St',
    city: 'NYC',
    state: 'NY',
    zip: '10001'
  }
});

myCollection.getVar('john', [
  'first_name',
  'last_name',
  'age'
]);
myCollection.deleteVar('john', [
  'address'
]);
myCollection.get('john');

myCollection.deleteCol();
myCollection2.deleteCol();
~~~
