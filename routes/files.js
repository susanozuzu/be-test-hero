const express = require('express');
const router = express.Router();
const fs = require('fs')

router.get('/readFile', (req, res, next) => {
    fs.readFile('readme.txt', (err, data) => {
        if (err) {
            next(err)
        } else {
            res.send(data)
        }
    })
})


module.exports = router;