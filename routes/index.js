var express = require('express');
var router = require('express-promise-router')();
const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})

/* GET home page. */
router.get('/', async (req, res, next) => {

  res.render('index');
});

module.exports = router;
