const router = require('express-promise-router')();
const crypto = require('crypto');

const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const PUBLIC_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');
const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})

router.get('/locked', async (req, res, next) => {
  var lockedaccs = await pool.query('SELECT \'admins\' AS tablename, username FROM admins WHERE locked = true UNION SELECT \'users\' AS tablename, username FROM users WHERE locked = true UNION SELECT \'employees\' AS tablename, username FROM employees WHERE locked = true UNION SELECT \'managers\' AS tablename, username FROM managers WHERE locked = true');
  res.status(200).json({error:0, msg: 'Alllllllll gooooooodddd', locked: lockedaccs.rows});
});

router.post('/unlock', async (req, res, next) => {
  if (!req.body.username) {
    res.status(400).json({error: 1201, msg: 'Username not provided'});
    return;
  }
  var lockedacc = await pool.query('SELECT \'admins\' AS tablename, username FROM admins WHERE locked = true AND username = $1 UNION SELECT \'users\' AS tablename, username FROM users WHERE locked = true AND username = $1 UNION SELECT \'employees\' AS tablename, username FROM employees WHERE locked = true AND username = $1 UNION SELECT \'managers\' AS tablename, username FROM managers WHERE locked = true AND username = $1', [req.body.username]);
  if (lockedacc.rows.length < 1) {
    res.status(400).json({error: 1202, msg: 'Account not locked'});
    return;
  }
  lockedacc = lockedacc.rows[0]
  var unlockres = await pool.query('UPDATE ' + lockedacc.tablename + ' SET locked = false, loginattempts = 0 WHERE username = $1', [lockedacc.username]);
  res.status(200).json({error:0, msg: 'Alllllllll gooooooodddd'});
});

module.exports = router;