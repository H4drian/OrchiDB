# OrchiDB
#### OrchiDB is a lightweight, document-oriented database that works with backend JavaScript. OrchiDB makes small scale data management fast and simple, with tools such as the integrated database terminal and OrchidQL and modules such as db and init which allow for querying through JavaScript functions. 
#### OrchidDB is built to be easy to work with and set up. To set up the database just download the OrchiDB folder, then import the modules you need to use the database.

# OrchiDB JavaScript Functions
OrchiDB is able to take data queries via JavaScript functions using the init and db modules.
## To Create a Collection
To create a collection using JavaScript functions, import the init.js module from the database's folder and call the collection(colName) function.
~~~
const init = require('./OrchiDB/init.js');
init.collection('exampleCollection');
~~~
The code above creates a collection folder named exampleCollection inside of the OrchiDB folder.
## To write data queries using JavaScript Functions
The func.js module included in every initialized collection is the primary module used to read and modify documents in a database using JavaScript functions. To import the functions in func.js, find the directory to your collection's folder and add /func.js to it. 
~~~
const myCollection = require('./OrchiDB/exampleCollection/func.js');
~~~
Then you can write queries with the func module functions. Here are all of the functions in the func module:
### newDoc(docName)
The newDoc function is used to create a new empty document in the database.
~~~
myCollection.newDoc('john');
~~~
### deleteDoc(docName)
The deleteDoc function is used to delete a document in the database, deleting a document doesn't fully remove it as it can be restored to the database as long as it's still in the TRASH folder.
~~~
myCollection.deleteDoc('john');
~~~
### returnDocPath(docName)
The returnDocPath function returns the path to the document entered.
~~~
myCollection.returnDocPath('john');
~~~
### restoreDoc(docName)
The restoreDoc function is used to return a document from the TRASH folder to the main database folder.
~~~
myCollection.restoreDoc('john');
~~~
### emptyTrash()
The emptyTrash function is used to permanently delete every file in the TRASH folder.
~~~
myCollection.emptyTrash();
~~~
### renameDoc(docName, newDocName)
The renameDoc function is used to rename a function from one name to another.
~~~
myCollection.renameDoc('john', 'jane');
~~~
### readDoc(docName)
The readDoc function is used to return the data contained in a document.
~~~
myCollection.readDoc('john');
~~~
### writeDoc(docName, content)
The writeDoc function is used to write or overwrite the data in a document, the contents being written in the form of a JSON object not string.
~~~
myCollection.writeDoc('john', {name: 'John', age: '22'});
~~~
### deleteCol(pass)
The deleteCol function is used to remove a collection's directory and every file and or folder in it. The deleteCol function is delayed by 10 seconds to ensure that the function was called intentionally, giving time to revert any mistakes.
~~~
myCollection.deleteCol('123');
~~~
### copyCol(colName)
The copyCol function creates a copy of the collection inside a given directory.
~~~
myCollection.copyCol('exampleColCopy', '321');
~~~
### listDocs()
The listDocs function returns a list of every file and folder within the collection.
~~~
myCollection.listDocs();
~~~
### editVariable(doc, variable, newVal)
The editVariable function changes the value of a variable in a document.
~~~
myCollection.editVariable('john', 'age', 22)
~~~
### addVariable(doc, variable, val)
The addVariable function adds a new variable with a given value to a document.
~~~
myCollection.addVariable('john', 'height', 182);
~~~
### deleteVariable(doc, variable)
The deleteVariable function removes a variable from the given document.
~~~
myCollection.deleteVariable('john', 'height');
~~~
### Example Program
~~~
const init = require('./OrchiDB/init.js');
init.collection('myCollection');
const myCollection = require('./OrchiDB/myCollection/func.js');
myCollection.newDoc('john');
myCollection.writeDoc('john', {name: 'John', age: 22});
myCollection.readDoc('john');
myCollection.renameDoc('john', 'jane');
myCollection.editVariable('jane', 'name', 'Jane');
myCollection.readDoc('jane');
myCollection.addVariable('jane', 'height', 175);
myCollection.readDoc('jane');
myCollection.deleteVariable('jane', 'height');
myCollection.readDoc('jane');
myCollection.deleteDoc('jane');
myCollection.restoreDoc('jane');
myCollection.copyCol('myOtherCollection');
const myOtherCollection = require('./OrchiDB/myOtherCollection/db.js');
myCollection.deleteCol('123');
myOtherCollection.deleteCol('321');
~~~
### Note
Only the parameters val (any datatype) in editVariable and addVariable functions and content (JSON Object) in writeDoc are not strings, all other parameters are strings.

# OrchiDB Terminal
Another way to query the database is through the OrchiDB terminal. To set up the terminal import the terminal module and call the .start() function.
~~~
const terminal = require('./OrchiDB/terminal.js');
terminal.start()
~~~
## Terminal Commands
| Terminal Command | Function       |
|------------------|----------------|
|EXIT              | Exits Terminal |
|CLEAR             | Clears Terminal|
|ENTER_PASS        | Enters Database Password|
|INIT_DB           | Initiates Database|
|SELECT_DB         | Selects Database to be queried|
|RETURN_SELECTED_DB| Returns the database selected|
|NEW_DOC           | Creates new document in selected database|
|READ_DOC          | Reads a document in the selected database|
|WRITE_DOC         | Writes data to a document in the selected database|
|DEL_DOC           | Deletes a document in the selected database (moves document to trash)|
|RESTORE_DOC       | Restores a deleted document in the selected database's trash folder|
|EMPTY_TRASH       | Permanently deletes all files in trash folder|
|RENAME_DOC        | Renames a document in the selected database|
|RETURN_PATH       | Returns the path to a document in the selected database|
|COPY_DB           | Makes a copy of the selected database|
|DEL_DB            | Deletes the selected database|
|EDIT_DOC_VAR      | Edits a variable's value in a document in the selected database|
|ADD_DOC_VAR       | Adds a variable to a document in the selected database|
|DEL_DOC_VAR       | Removes a variable from a document in the selected database|
|LIST_DOCS         | Returns a list of the files and folders inside the database|
|RUN_ORCHIDQL      | Runs an OrchidQL program|

# OrchidQL
OrchidQL is the data query language used for OrchiDB based on the commands run in the terminal. 

## Setup
To use OrchidQL, first, in the main JavaScript file, import the interpreter module.
~~~
const OrchidQL = require('./OrchiDB/interpreter.js');
~~~
Then create a file ending in .orc to hold the program source code. And lastly, use the .run function to run the .orc file you created.
~~~
const OrchidQL = require('./OrchiDB/interpreter.js');
OrchidQL.run('exampleFile');
~~~

## Syntax
The keywords in OrchidQL are the same as the ones for the terminal. Commands are run in the format
~~~
<COMMAND> <PARAMETER> <PARAMETER> <PARAMETER>
~~~
For example,
~~~
WRITE_DOC john {name: "John", age: 22}
~~~
To write comments in OrchidQL, prefix them with an #. Comments can be Inline or on a seperate line of their own.
~~~
# Hi, this is a comment
NEW_DOC john #This also works as a comment
~~~
Variables can be declared in OrchidQL. To define a variable use the VAR command and declare the variable name and value,
~~~
VAR myVariable := hello
~~~
Variables are inputed as strings, you cannot have whitespace characters in the variable otherwise only the first part of it will be saved.
~~~
# This works
VAR docName := johnFromHr

# This doesn't work
VAR docName := john from hr
~~~
To use the variable use an * followed by the variable name, then the value of the parameter will be set to that of the variable. 
~~~
VAR myVariable := john  #creates variable named john
NEW_DOC *myVariable  #creates a document named john 
~~~ 
Example Program
~~~
# Test.orc
# OrchidQL test program

INIT_DB myDb 123
SELECT_DB myDb
ENTER_PASS 123
RETURN_SELECTED_DB
NEW_DOC john
VAR docName := john
WRITE_DOC *docName {name: 'John', age: 22}
READ_DOC john
EDIT_DOC_VAR john age 32
ADD_DOC_VAR john country USA
DEL_DOC_VAR john country
RETURN_DOC_PATH john
RENAME_DOC john jane
EDIT_DOC_VAR jane name Jane
DEL_DOC jane
RESTORE_DOC jane
LIST_DOCS
COPY_DB myDb_copy 321
DEL_DB 123
SELECT_DB myDb_copy 
ENTER_PASS 321
DEL_DB 321
~~~