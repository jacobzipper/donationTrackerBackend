var router = require('express-promise-router')();

module.exports = router;
router.get('/searchdonations', async (req, res, next) => {
    var locationId = -1;
    if (req.query.location) {
        locationId = await pool.query('SELECT id FROM locations WHERE name = $1', [req.query.location]);
        if (locationId.rows.length == 0) {
            res.status(400).json({
                error: 1300,
                msg: 'Location not found?'
            });
            locationId = -1;
            return;
        } else {
            locationId = locationId.rows[0].id;
        }
    }

    var paramList = [];
    var whereList = [];

    if (locationId != -1) {
        paramList.push(locationId);
        whereList.push('locationid = $' + paramList.length);
    }

    if (req.query.name) {
        paramList.push('%' + req.query.name + '%');
        whereList.push('name ILIKE $' + paramList.length);
    }

    if (req.query.category) {
        paramList.push(req.query.category);
        whereList.push('category = $' + paramList.length);
    }
    var donations = -1;
    if (paramList.length > 0) {
        donations = await pool.query('SELECT * FROM donations WHERE ' + whereList.join(' AND '), paramList);
    } else {
        donations = await pool.query('SELECT * FROM donations');
    }
    res.status(200).json({
        error: 0,
        msg: 'Donations you searched for',
        donations: donations.rows
    });
});
