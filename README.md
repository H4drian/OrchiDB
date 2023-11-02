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
The deleteDoc function is used to delete a document in the database, deleting a document doesnt fully remove it as it can be restored to the database as long as its still in the TRASH folder.
~~~
db.deleteDoc('john');
~~~
### returnDocPath(docName)
The returnDocPath function returns the path to the document entered.
~~~
db.returnDocPath('jonh');
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
The renameDoc function is useed to rename a function from one name to another.
~~~
db.renameDoc('john', 'jane');
~~~
### readDoc(docName)
The readDoc function is used to return the data containted in a document.
~~~
db.readDoc('john');
~~~
### writeDoc(docName, content)
The writeDoc function is used to write or overwrite the data in a document, the contents being writen in the form of a JSON object not string.
~~~
db.writeFile('john', {name: 'John', age: '22'});
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
The addVariable function adds a new variable with given value to a document.
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