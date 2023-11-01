* OrchidQL Test Program

INIT_DB myDb 123
SELECT_DB myDb
ENTER_PASS 123
RETURN_SELECTED_DB
NEW_DOC john
WRITE_DOC john {name: 'John', age: '22'}
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