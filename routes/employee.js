var router = require('express-promise-router')();

const {
    Pool,
    Client
} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

router.get('/getdonations', async (req, res, next) => {
    if (req.user.role == 'admins') {
        var donations = await pool.query('SELECT * FROM donations');
        res.status(200).json({
            error: 0,
            msg: 'All donations for admin',
            donations: donations.rows
        });
        return;
    }

    var locIdFromAcc = await pool.query('SELECT locationid FROM employees WHERE username = $1 UNION SELECT locationid FROM managers WHERE username = $1', [req.user.user]);
    if (locIdFromAcc.rows.length != 1) {
        res.status(400).json({
            error: 1300,
            msg: 'User not found possibly relog in?'
        });
        return;
    }
    var donationList = await pool.query('SELECT * FROM donations WHERE locationid = $1', [locIdFromAcc.rows[0].locationid]);
    res.status(200).json({
        error: 0,
        msg: 'Donations at location of manager or employee',
        donations: donationList.rows
    });
});

router.post('/adddonation', async (req, res, next) => {
    if (req.user.role == 'admins') {
        var donations = await pool.query('SELECT * FROM donations');
        res.status(200).json({
            error: 0,
            msg: 'Admin add not implemented yet'
        });
        return;
    }

    var locIdFromAcc = await pool.query('SELECT locationid FROM employees WHERE username = $1 UNION SELECT locationid FROM managers WHERE username = $1', [req.user.user]);
    if (locIdFromAcc.rows.length != 1) {
        res.status(400).json({
            error: 1400,
            msg: 'User not found possibly relog in?'
        });
        return;
    }

    if (!req.body.shortdescription || !req.body.description || !req.body.value || !req.body.category || !req.body.name) {
        res.status(400).json({
            error: 1400,
            msg: 'Not all necessary params'
        });
    }
    var category = req.body.category;
    var reg = await pool.query('INSERT INTO donations' +
        ' (locationid, shortdescription, description, value, category, comments, addedby' + req.user.role.substring(0, req.user.role.length - 1) + ')' +
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [locIdFromAcc.rows[0].locationid, req.body.shortdescription, req.body.description, req.body.value,
            category.substring(0, 1) + category.substring(1, category.length).toLowerCase(), req.body.comments, req.user.user, req.body.name
        ]);
    res.status(200).json({
        error: 0,
        msg: 'Added yeet'
    });
    return;
});


module.exports = router;