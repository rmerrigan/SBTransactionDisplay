var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.get('/:id', function(req, res){

  const connection = mysql.createConnection({
    host: 'janchen-170810.starbucks.net',
    user: 'kenv',
    password: 'test123'
  });

  const queryInput = req.params.id;
  const queryString = 'select * from paymentqa.transrecords1 WHERE registername like ' + '\'' + queryInput +  '%\';';
  console.log(queryString);

  connection.query(queryString, (err, rows) => {

    if(err){
        console.log('Failed to query users: ' + err);
        res.sendStatus(500);
        res.end();
        return;
    }

    for(var i = 0; i < rows.length; i++){
      var row = rows[i];
      console.log(row.registername + ' ' + row.cardtype);
    }

    res.render('data', {rows: rows});

  });
});


router.get('/', function(req, res) {

    const connection = mysql.createConnection({
      host: 'janchen-170810.starbucks.net',
      user: 'kenv',
      password: 'test123'
    });

    const queryInput = req.params.id;
    const queryString = 'SELECT * FROM paymentqa.transrecords1;';

    connection.query(queryString, (err, rows) => {

      if(err){
          console.log('Failed to query users: ' + err);
          res.sendStatus(500);
          res.end();
          return;
      }
      
      res.json(rows);

    });
});


module.exports = router;