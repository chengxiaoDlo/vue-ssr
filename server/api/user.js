const express = require('express')
const router = express.Router()
const connection = require('./index')

router.get('/list', function(req, res) {
  const sql = 'SELECT * FROM websites'
  let limit = req.query.pageSize ? req.query.pageSize : 10;
  let current = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1
  connection.query(sql, (err, result) => {
    if (err) {
      util.errhandler(err)
    }
    let total = result.length
    res.status(200)
    res.type('application/json;charset=UTF-8')
    res.send({data: result.slice((current - 1) * limit, current * limit), total: total})
  })
})

router.get('/list/:id', (req, res) => {
  const sql = 'SELECT * FROM websites WHERE id=?'
  const id = req.params.id
  connection.query(sql, id, (err, result) => {
    if (err) {
      util.errhandler(err)
    }
    const r = JSON.stringify(result)
    res.status(200)
    res.type('application/json;charset=UTF-8')
    res.send(r)
  })
})

router.put('/list/:id', (req, res) => {
  const sql = 'UPDATE websites SET name=?, url=?, alexa=?, country=? WHERE id=?'
  var data = [req.body.name, req.body.url, req.body.alexa, req.body.country, req.params.id]
  connection.query(sql, data, (err, result) => {
    if (err) {
      util.errhandler(err)
    }
    res.status(200)
    res.send('update successfully!!!')
  })
})

router.delete('/list/:id', (req, res) => {
  const sql = 'DELETE FROM websites WHERE id=?'
  const id = req.params.id
  connection.query(sql, id, (err, result) => {
    if (err) {
      util.errhandler(err1)
    }
    res.status(200)
    res.send('delete successfully!!!')
  })
})

router.post('/list', (req, res) => {
  const sql = 'INSERT INTO websites (alexa, name, url, country) VALUES (?, ?, ?, ?)'
  const data = [req.body.alexa, req.body.name, req.body.url, req.body.country]
  connection.query(sql, data, (err, result) => {
    if (err) {
      util.errhandler(err)
    }
    res.status(200)
    res.send('add successfully!!!')
  })
})
module.exports = router