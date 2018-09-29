var express = require('express');
var router = require('express-promise-router')();
var jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const PUBLIC_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

function jwtsign(role, username) {
  return jwt.sign({
    role: role,
    user: username,
  },
  PRIVATE_KEY,
  {
    algorithm: 'RS256',
    expiresIn: '30d',
  });
}

function jwtdecode(token) {
  return jwt.verify(token, PUBLIC_KEY);
}

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
