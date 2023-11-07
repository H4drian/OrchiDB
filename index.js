console.log('|-------------------------------------------------|');
console.log('|                     OrchiDB                     |');
console.log('|-------------------------------------------------|');
console.log('|                Welcome to OrchiDB               |');
console.log('|          A lightweight Document Oriented        |');
console.log('|      Database Management System for JavaScript  |');
console.log('|-------------------------------------------------|');
console.log('| OrchiDB is a Node.js package that allows you to |');
console.log('| Manage Data easily through text based input,    |');
console.log('| QL and Javascript. For more information please  |');
console.log('| visit https://github.com/H4drian/OrchiDB or     |');
console.log('| read the markdown file inside this replit.      |');
console.log('| OrchiDB is still in early development so expect |');
console.log('| some errors.                                    |');
console.log('|-------------------------------------------------|');

const collection = require('./OrchiDB/OrchiDB.js');
const myCollection = new collection.collection('myCollection');
myCollection.newDoc('john');
myCollection.updateDoc('john', {
  name: 'John',
  age: 20,
  address: '123 Main St'
});
myCollection.readDoc('john');
myCollection.returnDocPath('john');
myCollection.deleteDoc('john');
myCollection.restoreDoc('john');
myCollection.renameDoc('john', 'jane');
myCollection.writeDoc('jane', {
  name: 'Jane',
  age: 21,
  address: '456 Main St'
});
myCollection.addVariable('jane', 'country', 'USA');
myCollection.returnVariable('jane', 'country');
myCollection.editVariable('jane', 'country', 'Canada');
myCollection.returnVariable('jane', 'country');
myCollection.deleteVariable('jane', 'country');
myCollection.deleteCol();