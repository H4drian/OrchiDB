# OrchiDB
#### OrchiDB is a lightweight, document-oriented database that works with backend JavaScript. OrchiDB makes small scale data management fast and simple, with tools such as the integrated database terminal and OrchidQL and modules such as db and init which allow for querying through JavaScript functions. 
#### OrchidDB is built to be easy to work with and set up. To set up the database just download the OrchiDB folder, then import the modules you need to use the database.

# OrchiDB JavaScript Functions
OrchiDB is able to take data queries via JavaScript functions using the init and db modules.
## To Create a Database
To create a database using JavaScript functions, import the init.js module from the OrchiDb folder and call the db() function. The parameters for the db function are the database name and database password, both being strings. Example: 
~~~
const init = require('./OrchiDB/init.js');
init.db('exampleDb', '123');
~~~
The code above creates a database folder named exampleDb inside of the OrchiDB folder.
## To write data queries using JavaScript Functions
The db.js module included in every initialized database is the primary module used to read and modify documents in a database using JavaScript functions. To import the functions in db.js, find the directory to your database's folder and add /db.js to it. 
~~~
const db = require('./OrchiDB/exampleDb/db.js');
~~~
Then you can write queries with the db module functions. Here are all of the functions in the db module:

### enterPass(pass)
The enterPass function is used to authenticate the user, for any other function to work properly the password entered in this function must be equal to the password of the database.
~~~
db.enterPass('123');
~~~
### newDoc(docName)
The newDoc function is used to create a new empty document in the database.
~~~
db.newDoc('john');
~~~
### deleteDoc(docName)
The deleteDoc function is used to delete a document in the database, deleting a document doesn't fully remove it as it can be restored to the database as long as it's still in the TRASH folder.
~~~
db.deleteDoc('john');
~~~
### returnDocPath(docName)
The returnDocPath function returns the path to the document entered.
~~~
db.returnDocPath('john');
~~~
### restoreDoc(docName)
The restoreDoc function is used to return a document from the TRASH folder to the main database folder.
~~~
db.restoreDoc('john');
~~~
### emptyTrash()
The emptyTrash function is used to permanently delete every file in the TRASH folder.
~~~
db.emptyTrash();
~~~
### renameDoc(docName, newDocName)
The renameDoc function is used to rename a function from one name to another.
~~~
db.renameDoc('john', 'jane');
~~~
### readDoc(docName)
The readDoc function is used to return the data contained in a document.
~~~
db.readDoc('john');
~~~
### writeDoc(docName, content)
The writeDoc function is used to write or overwrite the data in a document, the contents being written in the form of a JSON object not string.
~~~
db.writeDoc('john', {name: 'John', age: '22'});
~~~
### deleteDb(pass)
The deleteDb function deletes every file and folder within the database along with removing the directory. To prevent accidental data removal the password to the database must be entered into the function along with the enterPass function be entered properly, additionally a timer for 10 seconds is given before data deletion starts.
~~~
db.deleteDb('123');
~~~
### copyDb(dbCopyName, dbCopyPass)
The copyDb function creates a copy of the database with a new name and password.
~~~
db.copyDb('exampleDbCopy', '321');
~~~
### listDocs()
The listDocs function returns a list of every file and folder within the database.
~~~
db.listDocs();
~~~
### editVariable(doc, variable, newVal)
The editVariable function changes the value of a variable in a document.
~~~
db.editVariable('john', 'age', 22)
~~~
### addVariable(doc, variable, val)
The addVariable function adds a new variable with a given value to a document.
~~~
db.addVariable('john', 'height', 182);
~~~
### deleteVariable(doc, variable)
The deleteVariable function removes a variable from the given document.
~~~
db.deleteVariable('john', 'height');
~~~
### Example Program
~~~
const init = require('./OrchiDB/init.js');
init.db('myDb', '123');
const db = require('./OrchiDB/myDb/db.js');
db.enterPass('123');
db.newDoc('john');
db.writeDoc('john', {name: 'John', age: 22});
db.readDoc('john');
db.renameDoc('john', 'jane');
db.editVariable('jane', 'name', 'Jane');
db.readDoc('jane');
db.addVariable('jane', 'height', 175);
db.readDoc('jane');
db.deleteVariable('jane', 'height');
db.readDoc('jane');
db.deleteDoc('jane');
db.restoreDoc('jane');
db.copyDb('myDbCopy', '321');
const db2 = require('./OrchiDB/myDbCopy/db.js');
db2.enterPass('321');
db.deleteDb('123');
db2.deleteDb('321');
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
WRITE_FILE john {name: "John", age: 22}
~~~
Comments in OrchidQL are prefixed with *, and all comments are written on empty lines without code.
~~~
* This works
NEW_FILE john
~~~
~~~
NEW_FILE john * This does not
~~~

Example Program
~~~
* Test.orc
* OrchidQL test program

INIT_DB myDb 123
SELECT_DB myDb
ENTER_PASS 123
RETURN_SELECTED_DB
NEW_DOC john
WRITE_DOC john {name: 'John', age: 22}
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