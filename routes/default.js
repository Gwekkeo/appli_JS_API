const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {username: "Gwen"})
})

router.get('/test', (req, res) => {
	res.render('test', {})
})

module.exports = router