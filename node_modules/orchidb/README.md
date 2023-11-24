![OrchiDB_logo](OrchiDB.png)
# OrchiDB
OrchiDB is a lightweight, JSON Document-Oriented database managment system with an emphasis on simple syntax and easy setup. OrchiDB can take queries using JavaScript code using the OrchiDB module or even through text based input through the built in terminal.

# How to Setup a Database
To set up a database create the folder where the collections will be held, then download the orchidb module.
~~~
npm i orchidb
~~~
And lastly import the module to the file of your choosing.
~~~
const db = require('orchidb');
~~~
# Using JavaScript to Query to the Database
To use JavaScript with OrchiDB, create a new collection using the `Collection` class,
~~~
const myCollection = new db.Collection('./OrchiDB', 'myCollection');
//First input is the path to the database folder, second is the collection name.
~~~
Now you can use the collection object's functions to query the collection.

## Collection Functions
### `newDoc(docName, data)`
The `newDoc` function creates a document inside of the collection with data writen to it. 
~~~
myCollection.newDoc('john', {
  name: 'John',
  age: 22,
  address: '123 Main St'
});
~~~
### `returnDocPath(docName)`
The `returnDocPath` function returns the path to the document.
~~~
myCollection.returnDocPath('john');
~~~
### `deleteDoc(docName)`
The `deleteDoc` function deletes the document and moves it to the TRASH folder in the collection.
~~~
myCollection.deleteDoc('john'); // moves john.json to myCollection's TRASH
~~~
### `restoreDoc(docName)`
The `restoreDoc` function restored deleted documents and moves them back to the collection folder.
~~~
myCollection.restoreDoc('john'); // moves john.json back to the myCollection folder
~~~
### `emptyTrash()`
The `emptyTrash` function permanently deletes all documents in the collection's TRASH folder.
~~~
myCollection.emptyTrash(); // deletes every file in myCollection's TRASH folder
~~~
### `renameDoc(docName, newDocName)`
The `renameDoc` function renames a document in the collection to a new name.
~~~
myCollection.renameDoc('john', 'jane');
~~~
### `readDoc(docName)`
The `readDoc` function returns the data inside of a document in the collection.
~~~
myCollection.readDoc('jane');
~~~
### `updateDoc(docName, data)`
The `updateDoc` function overwrites all data inside of a document in the collection with the data inputed.
~~~
myCollection.updateDoc('jane',{
  name: 'Jane',
  age: 21,
  address: '456 Cobalt St'
});
~~~
### `copyCol(targetCollection)`
The `copyCol` function copies every file in the collection to another target collection.
~~~
const myCollection2 = new db.Collection('myCollection2');
myCollection.copyCol('myCollection2'); // copies all files from myCollection to myCollection2
~~~
### `copyDocToCol(docName, targetCollection)`
The `copyDocToCol` function copies a specific document from the collection to another target collection.
~~~
myCollection.copyDocToCol('jane', 'myCollection2');
~~~
### `deleteCol()`
The `deleteCol` function permanently deletes the collection and all of its documents and folders.
~~~
myCollection.deleteCol(); // permanently deletes myCollection
~~~
### `listDocs()`
The `listDocs` function lists every folder and document inside of a collection.
~~~
myCollection.listDocs();
~~~
### `updateVariable(docName, variable, value)`
The `updateVariable` function changes the value of a variable inside a document in the collection.
~~~
myCollection.updateVariable('jane', 'age', 22);
~~~
### `newVariable(docName, variable, value)`
The `newVariable` function adds a new variable to a document in the collection.
~~~
myCollection.newVariable('jane', 'gender', 'female');
~~~
### `returnVariable(docName, variable)`
The `returnVariable` function returns the value of a variable inside a document in the collection.
~~~
myCollection.returnVariable('jane', 'gender'); //returns 'female'
~~~
### `deleteVariable(docName, variable)`
The `deleteVariable` function removes the variable and its associated value from the document in the collection.
~~~
myCollection.deleteVariable('jane', 'gender');
~~~
## Nested Collections
Collections can have collections inside of them. To create a collection inside of a collection first create a primary collection
~~~
const primaryCollection = new db.Collection('./OrchiDB', 'primaryCollection');
~~~
Then create another collection within the directory of the primary one
~~~
const secondaryCollection = new db.Collection('./OrchiDB', 'primaryCollection/secondaryCollection');
// Or
const secondaryCollection = new db.Collection('./OrchiDB/primaryColleection', 'secondaryCollection');
~~~
Some primaryCollection functions can work on the secondaryCollection.
- listDocs will list the secondaryCollection as a folder inside of the primaryCollection
- copyCol can copy every document and folder in the primaryCollection to the secondaryCollection (including the secondayCollection itself)
- copyDocToCol can copy a document to the secondaryCollection

secondaryCollections cannot preform operations onto its primaryCollection, i.e. the primary can copy a document to the secondary, but not the secondary to the primary.

# Using the OrchiDB Terminal
To use the OrchiDB terminal, first set up a collection.
~~~
const db = require('orchidb');
const myCollection = new db.Collection('./OrchiDB', 'myCollection');
~~~
Then use the terminal.run() function
~~~
myCollection.terminal.run();
~~~
Then in the console the terminal input line will prompt.
~~~
|--------------------myCollection Terminal--------------------|
OrchiDB@myCollection:~$ 
~~~
From here just enter any of the terminal commands in the input line.

## Terminal Commands
|     Commands      |
|-------------------|
|       EXIT        |
|       CLEAR       |
|      NEW_DOC      |
|     READ_DOC      |
|   UPDATE_DOC      |
|      DEL_DOC      |
|  RESTORE_DOC      |
|    EMPTY_TRASH    |
|   RENAME_DOC      |
|     LIST_DOCS     |
|   RETURN_PATH     |
|     COPY_COL      |
| COPY_DOC_TO_COL   |
|      DEL_COL      |
| UPDATE_DOC_VAR    |
|    NEW_DOC_VAR    |
|   READ_DOC_VAR    |
|    DEL_DOC_VAR    |

# Example Programs
## JavaScript
~~~
/// index.js

const db = require('orchidb');
const myCollection = new db.Collection('./OrchiDB', 'myCollection');

myCollection.newDoc('john', {
  name: 'John',
  age: 22,
  address: '123 Main St'
});
myCollection.returnDocPath('john');
myCollection.deleteDoc('john');
myCollection.emptyTrash();
myCollection.newDoc('john', {
  name: 'John',
  age: 22,
  address: '123 Main St'
});
myCollection.renameDoc('john', 'jane');
myCollection.updateDoc('jane', {
  name: 'Jane',
  age: 21,
  address: '456 Main St'
});
myCollection.readDoc('jane');
const myCollection2 = new db.Collection('./OrchiDB', 'myCollection2');
myCollection.copyCol('myCollection2');
myCollection.newDoc('blank', {});
myCollection.copyDocToCol('blank', 'myCollection2');
myCollection2.readDoc('blank');
myCollection.newVariable('jane', 'country', 'USA');
myCollection.returnVariable('jane', 'country', 'USA');
myCollection.updateVariable('jane', 'country', 'Canada');
myCollection.deleteVariable('jane', 'country');
myCollection.deleteCol();
myCollection2.deleteCol();
~~~
## OrchiDB Terminal
~~~
// index.js 

const db = require('orchidb');
async function runMyCollectionTerminal(){
  // function runs terminal for myCollection, halting all other terminals to avoid errors.
  const myCollection = new db.Collection('./OrchiDB', 'myCollection');
  myCollection.terminal.run();
};
runMyCollectionTerminal(); 
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log('Running myCollection2 Terminal');
const myCollection2 = new db.Collection('./OrchiDB', 'myCollection2');
myCollection2.terminal.run();
~~~
```
|--------------------myCollection Terminal--------------------|
OrchiDB@myCollection:~$ HELP
|----------------------------COMMANDS-------------------------|
EXIT: Exit the terminal.

NEW_DOC: Create a new document in the collection with specified name and content.

READ_DOC: Read the content of a document with specified name.

UPDATE_DOC: Update the content of a document with specified name.

DEL_DOC: Delete a document with specified name and move it to the TRASH folder.

RESTORE_DOC: Restore a document from the TRASH folder to its original location.

EMPTY_TRASH: Empty the TRASH folder and permanently delete all its contents.

RENAME_DOC: Rename a document by providing its current name and the new name.

RETURN_PATH: Return the file path of a document with specified name.

COPY_COL: Create a copy of the entire collection with a new name.

COPY_DOC_TO_COL: Copy a document from the current collection to another collection.

DEL_COL: Delete the entire collection, including all its documents and the TRASH folder.

CLEAR: Clear the console screen.

UPDATE_DOC_VAR: Update the value of a variable in a document.

NEW_DOC_VAR: Add a new variable with a value to a document.

DEL_DOC_VAR: Delete a variable from a document.

LIST_DOCS: List all the documents in the collection.

RETURN_DOC_VAR: Return the value of a variable in a document.

HELP: Display information about the available commands.
|--------------------------------------------------------------------------------------|

OrchiDB@myCollection:~$ NEW_DOC
Enter Doc Name:
OrchiDB@myCollection:~$ john
Enter Content: 
OrchiDB@myCollection:~$ {"name": "John", "age": 22}
Document John created.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ READ_DOC
Enter Doc Name:
OrchiDB@myCollection:~$ john
john:
{
  "name": "John",
  "age": 22
}
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ UPDATE_DOC
Enter Doc Name:
OrchiDB@myCollection:~$ john
Enter Content:
OrchiDB@myCollection:~$ {"name": "Johnathan", "age": 23}
Document john updated.
OrchiDB@myCollection:~$ CLEAR
OrchiDB@myCollection:~$ DEL_DOC
Enter Doc Name: 
OrchiDB@myCollection:~$ john
Document john moved to TRASH folder.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ RESTORE_DOC
Enter Doc Name: 
OrchiDB@myCollection:~$ john
Document john restored.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ EMTPY_TRASH
Trash emptied.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ UPDATE_DOC
Enter Doc Name: 
OrchiDB@myCollection:~$ john
Enter Content:
OrchiDB@myCollection:~$ {"name": "Jane", "age": 21}
Document john updated.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ RENAME_DOC
Enter Doc Name:
OrchiDB@myCollection:~$ john
Enter New Doc Name:
OrchiDB@myCollection:~$ jane
Document john changed to jane.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ LIST_DOCS
[ 'TRASH', 'jane.json']
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ RETURN_PATH
Enter Doc Name: 
OrchiDB@myCollection:~$ jane
Path to jane: /home/runner/OrchiDB/OrchiDB/myCollection/jane.json
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ COPY_COL
Enter Target Collection: 
OrchiDB@myCollection:~$ myCollection2
All files copied to collection 'myCollection2' and overwritten if exists.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ NEW_DOC
Enter Doc Name:
OrchiDB@myCollection:~$ blank
Enter Content: 
OrchiDB@myCollection:~$ {}
Document blank created.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ COPY_DOC_TO_COL
Enter Doc Name:
OrchiDB@myCollection:~$ blank
Enter Target Collection:
OrchiDB@myCollection:~$ myCollection2
Document 'blank.json' copied to collection 'myCollection2'.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ NEW_DOC_VAR
Enter Doc Name:
OrchiDB@myCollection:~$ jane
Enter Variable Name: 
OrchiDB@myCollection:~$ country
Enter Variable Value: 
OrchiDB@myCollection:~$ USA
New variable country with value USA added to file 'jane.json'.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ UPDATE_DOC_VAR
Enter Doc Name:
OrchiDB@myCollection:~$ jane
Enter Variable Name:
OrchiDB@myCollection:~$ country
Enter Value: 
OrchiDB@myCollection:~$ Canada
Variable 'country' set to Canada in file 'jane.json'.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ RETURN_DOC_VAR
Enter Doc Name: 
OrchiDB@myCollection:~$ jane
Enter Variable Name:
OrchiDB@myCollection:~$ country
Canada
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ DEL_DOC_VAR
Enter Doc Name: 
OrchiDB@myCollection:~$ jane
Enter Variable Name: 
OrchiDB@myCollection:~$ country
Variable country removed from file 'jane.json'.
OrchiDB@myCollection:~$ CLEAR

OrchiDB@myCollection:~$ DEL_COL
Collection myCollection deleted.
OrchiDB@myCollection:~$ EXIT
Exiting Terminal
|--------------------------------------------------------------|

|--------------------myCollection2 Terminal--------------------|
OrchiDB@myCollection:~$ DEL_COL
Collection myCollection2 deleted.
OrchiDB@myCollection:~$ EXIT
Exiting Terminal
|--------------------------------------------------------------|
```