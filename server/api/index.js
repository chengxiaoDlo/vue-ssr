const mysql = require('mysql')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '199142',
  database : 'web'
})

connection.connect()



module.exports = connection