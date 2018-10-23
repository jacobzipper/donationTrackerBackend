var router = require('express-promise-router')();

const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})

router.get('/getdonations', async (req, res, next) => {
  if (req.user.role == 'admins') {
    var donations = await pool.query('SELECT * FROM donations');
    res.status(200).json({error: 0, msg: 'All donations for admin', donations: donations.rows});
    return;
  }

  var locIdFromAcc = await pool.query('SELECT locationid FROM employees WHERE username = $1 UNION SELECT locationid FROM managers WHERE username = $1', [req.user.user]);
  if (locIdFromAcc.rows.length != 1) {
    res.status(400).json({error: 1300, msg: 'User not found possibly relog in?'});
    return;
  }
  var donationList = await pool.query('SELECT * FROM donations WHERE locationid = $1', [locIdFromAcc.rows[0].locationid]);
  res.status(200).json({error: 0, msg: 'Donations at location of manager or employee', donations: donationList.rows});
});

module.exports = router;