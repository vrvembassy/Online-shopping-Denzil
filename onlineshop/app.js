var express = require('express')
var app = express()
var db = require('./db')

var inventory = require('./inventory/inventoryController')
app.use('/admin',inventory ,(req,res,next) => {
    res.status(200).status("success")    
})

module.exports = app
