# OrchiDB
OrchiDB is a lightweight, JSON Document-Oriented database managment system with an emphasis on simple syntax and easy setup. OrchiDB can take queries using JavaScript code using the OrchiDB module, text-based input via the terminal, or even through its very own data query language, OrchidQL.

# How to Setup a Database
To set up a database, first create the folder where the collections will be stored, then download the OrchiDB.js module and move it to the database folder. Lastly import the module to the program which will be taking the queries.
~~~
const db = require('./OrchiDB/orchidb.js');
~~~
# Using JavaScript to Query to the Database
To use JavaScript with OrchiDB, create a new collection using the collection class,
~~~
const myCollection = new db.Collection('myCollection')
~~~
Now you can use the collection object's functions to query the collection.

## Collection Functions
### newDoc(docName, data)
The newDoc function creates a document inside of the collection with data writen to it. 
~~~
myCollection.newDoc('john', {
  name: 'John',
  age: 22,
  address: '123 Main St'
});
~~~
### returnDocPath(docName)
The returnDocPath function returns the path to the document.
~~~
myCollection.returnDocPath('john');
~~~
### deleteDoc(docName)
The deleteDoc function deletes the document and moves it to the TRASH folder in the collection.
~~~
myCollection.deleteDoc('john'); // moves john.json to myCollection's TRASH
~~~
### restoreDoc(docName)
The restoreDoc function restored deleted documents and moves them back to the collection folder.
~~~
myCollection.restoreDoc('john'); // moves john.json back to the myCollection folder
~~~
### emptyTrash()
The emptyTrash function permanently deletes all documents in the collection's TRASH folder.
~~~
myCollection.emptyTrash(); // deletes every file in myCollection's TRASH folder
~~~
### renameDoc(docName, newDocName)
The renameDoc function renames a document in the collection to a new name.
~~~
myCollection.renameDoc('john', 'jane');
~~~
### readDoc(docName)
The readDoc function returns the data inside of a document in the collection.
~~~
myCollection.readDoc('jane');
~~~
### updateDoc(docName, data)
The updateDoc function overwrites all data inside of a document in the collection with the data inputed.
~~~
myCollection.updateDoc('jane',{
  name: 'Jane',
  age: 21,
  address: '456 Cobalt St'
});
~~~
### copyCol(targetCollection)
The copyCol function copies every file in the collection to another target collection.
~~~
const myCollection2 = new db.Collection('myCollection2');
myCollection.copyCol('myCollection2'); // copies all files from myCollection to myCollection2
~~~
### copyDocToCol(docName, targetCollection)
The copyDocToCol function copies a specific document from the collection to another target collection.
~~~
myCollection.copyDocToCol('jane', 'myCollection2');
~~~
### deleteCol()
The deleteCol function permanently deletes the collection and all of its documents and folders.
~~~
myCollection.deleteCol(); // permanently deletes myCollection
~~~
### listDocs()
The listDocs function lists every folder and document inside of a collection.
~~~
myCollection.listDocs();
~~~
### updateVariable(docName, variable, value)
The updateVariable function changes the value of a variable inside a document in the collection.
~~~
myCollection.updateVariable('jane', 'age', 22);
~~~
### newVariable(docName, variable, value)
The newVariable function adds a new variable to a document in the collection.
~~~
myCollection.newVariable('jane', 'gender', 'female');
~~~
### returnVariable(docName, variable)
The returnVariable function returns the value of a variable inside a document in the collection.
~~~
myCollection.returnVariable('jane', 'gender'); //returns 'female'
~~~
### deleteVariable(docName, variable)
The deleteVariable function removes the variable and its associated value from the document in the collection.
~~~
myCollection.deleteVariable('jane', 'gender');
~~~
## Nested Collections
Collections can have collections inside of them. To create a collection inside of a collection first create a primary collection
~~~
const primaryCollection = new db.Collection('primaryCollection');
~~~
Then create another collection within the directory of the primary one
~~~
const secondaryCollection = new db.Collection('primaryCollection/secondaryCollection');
~~~
Some primaryCollection functions can work on the secondaryCollection.
- listDocs will list the secondaryCollection as a folder inside of the primaryCollection
- copyCol can copy every document and folder in the primaryCollection to the secondaryCollection (including the secondayCollection itself)
- copyDocToCol can copy a document to the secondaryCollection

secondaryCollections cannot preform operations onto its primaryCollection, i.e. the primary can copy a document to the secondary, but not the secondary to the primary.

# Using the OrchiDB Terminal
To use the OrchiDB terminal, first set up a collection.
~~~
const db = require('./OrchiDB/orchidb.js');
const myCollection = new db.Collection('myCollection');
~~~
Then use the terminal.run() function
~~~
myCollection.terminal.run();
~~~
Now when you run the program the terminal will run in the console.
>> are input lines, you will write your input here.
<< are output lines, the terminal will write its output here
if there is no prefix to the text then it is an output writen by the function the command runs
~~~
>>
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

# Example Programs for JavaScript, OrchidQL, and the Terminal
## JavaScript
~~~
/// index.js

const db = require('./OrchiDB/orchidb.js');
const myCollection = new db.Collection('myCollection');

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
const myCollection2 = new db.Collection('myCollection2');
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

const db = require('./OrchiDB/orchidb.js');
async function runMyCollectionTerminal(){
  // function runs terminal for myCollection, halting all other terminals to avoid errors.
  const myCollection = new db.Collection('myCollection');
  myCollection.terminal.run();
};
runMyCollectionTerminal(); 
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log('Running myCollection2 Terminal');
const myCollection2 = new db.Collection('myCollection2');
myCollection2.terminal.run();
~~~
```
>>NEW_DOC
<<Enter Doc Name:
>>John
<<Enter Content: 
>>{"name": "John", "age": 22}
Document john created.
>>CLEAR
>>READ_DOC
<<Enter Doc Name:
>>john
john:
{
  "Name": "John",
  "age": 22
}
>>CLEAR
>>UPDATE_DOC
<<Enter Doc Name:
>>john
<<Enter Content:
<<{"Name": "Johnathan", "age": 23}
Document john updated.
>>CLEAR
>>DEL_DOC
<<Enter Doc Name:
>>john
Document john moved to TRASH folder
>>CLEAR
>>RESTORE_DOC
<<Enter Doc Name:
>>john
Document john restored..
>>CLEAR
>>EMTPY_TRASH
Trash emptied.
>>CLEAR
>>UPDATE_DOC
<<Enter Doc Name:
>>john
<<Enter Content:
>>{"name": "Jane", "age": 21}
Document john updated.
>>CLEAR
>>RENAME_DOC
<<Enter Doc Name:
>>john
<<Enter New Doc Name:
>>jane
Document john changed to jane.
>>CLEAR
>>LIST_DOCS
[ 'TRASH', 'jane.json' ]
>>CLEAR
>>RETURN_PATH
<<Enter Doc Name:
>>jane
Path to jane: /home/runner/OrchiDB/OrchiDB/myCollection/jane.json
>>CLEAR
>>COPY_COL
<<Enter New Collection Name:
>>myCollection2
All files copied to collection 'myCollection2' and overwritten if exists.
>>CLEAR
>>NEW_DOC
<<Enter Doc Name:
>>blank
<<Enter Content:
>>{}
Document blank created.
>>CLEAR
>>COPY_DOC_TO_COL
<<Enter Doc Name:
>>blank
<<Enter Collection Name:
>>myCollection2
Document 'blank.json' copied to collection 'myCollection2'.
>>CLEAR
>>NEW_DOC_VAR
<<Enter Doc Name:
>>jane
<<Enter Variable Name:
>>country
<<Enter Variable Value:
>>USA
New variable country with value USA added to file 'jane.json'
>>CLEAR
>>UPDATE_DOC_VAR
<<Enter Doc Name:
>>jane
<<Enter Variable Name
>>country
<<Enter Value:
>>Canada
Variable 'country' set to Canada in file 'jane.json'
>>CLEAR
>>RETURN_DOC_VAR
<<Enter Doc Name:
>>jane
<<Enter Variable Name:
>>country
Canada
>>CLEAR
>>DEL_DOC_VAR
<<Enter Doc Name:
>>jane
<<Enter Variable Name:
>>country
Variable country removed from file 'jane.json'.
>>DEL_COL
Collection myCollection deleted.
>>EXIT
<<Exiting Terminal
~~~~~~~~~~~~~~~~~~~~~~~~~~
Running myCollection2 Terminal
>>DEL_COL
Collection myCollection2 delete.
>>EXIT
<<Exiting Terminal
```