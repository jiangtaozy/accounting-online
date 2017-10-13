### install gin

go get github.com/gin-gonic/gin

### install go pq driver

go get -u github.com/lib/pq

### install the gorm orm

go get -u github.com/jinzhu/gorm

### start a single-node cluster

~/workspace/project/accounting-online$ cockroach start --insecure --store=store-1 --host=localhost

### create a user

$ cockroach user set dest --insecure

### create a database and grant privileges

$ cockroach sql --insecure

create database accounting;

grant all on database accounting to dest;

## sql

### SHOW TABLES FROM accounting;

### show columns from accounting.journal_accounts;