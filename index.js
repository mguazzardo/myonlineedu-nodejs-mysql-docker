'use strict';
var mysql = require('mysql');
var express = require('express');

var app = express();
var port = process.env.PORT || 8080;
var responseStr = "MySQL Data:";

app.get('/',function(req,res){
   
   var mysqlHost = process.env.MYSQL_HOST || 'mariadb';
   var mysqlPort = process.env.MYSQL_PORT || '3306';
   var mysqlUser = process.env.MYSQL_USER || 'user1';
   var mysqlPass = process.env.MYSQL_PASS || 'master';
   var mysqlDB   = process.env.MYSQL_DB   || 'test';

   var connectionOptions = {
     host: mysqlHost,
     port: mysqlPort,
     user: mysqlUser,
     password: mysqlPass,
     database: mysqlDB
   };

   console.log('MySQL Connection config:');
   console.log(connectionOptions);

   var connection = mysql.createConnection(connectionOptions);

   connection.connect();
 
   connection.query('SELECT * FROM MOE_ITEM_T', function (error, results, fields) {
     if (error) throw error;
     
     responseStr = '';

     results.forEach(function(data){
        responseStr += data.ITEM_NAME + ' : ';
        console.log(data);
     });

     if(responseStr.length == 0)
        responseStr = 'No records found';

     console.log(responseStr);

     res.status(200).send(responseStr);
   });
    
   connection.end();
});


app.listen(port, '0.0.0.0' , function(){
    console.log('Sample mySQL app listening on port ' + port);
});
