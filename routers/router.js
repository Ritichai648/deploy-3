const express = require('express');
const router = express.Router();

router.get('/login-success', (req, res) => {
    res.render('login-success')
})


module.exports = router;    