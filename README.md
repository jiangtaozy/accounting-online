# backend

### install gin

go get github.com/gin-gonic/gin

### install go pq driver

go get -u github.com/lib/pq

### install the gorm orm

go get -u github.com/jinzhu/gorm

### install gin-contrib/cors

go get github.com/gin-contrib/cors

### install cockroach

wget -qO- https://binaries.cockroachdb.com/cockroach-v1.1.1.linux-amd64.tgz | tar  xvz

cp -i cockroach-v1.1.1.linux-amd64/cockroach /usr/local/bin

### start a single-node cluster

~/workspace/project/accounting-online$

cockroach start --insecure --store=store-1 --host=localhost



### create a user

$ cockroach user set dest --insecure

### create a database and grant privileges

$ cockroach sql --insecure --database=accounting

create database accounting;

grant all on database accounting to dest;



## sql

### SHOW TABLES FROM accounting;

### show columns from accounting.journal_accounts;

### alter table accounting.journal_accounts drop column amount;

# front end

### create a react app

    npm install -g create-react-app
    create-react-app my-app

    cd my-app
    npm start
    npm run build
