INIT_DB myDb 123
SELECT_DB myDb
ENTER_PASS 123
NEW_DOC john
WRITE_DOC john {name: 'John', age: '22'}
READ_DOC john
EDIT_DOC_VAR john age 32
ADD_DOC_VAR john country USA
DEL_DOC_VAR john country
DEL_DB 123