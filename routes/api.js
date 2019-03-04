"use strict";

const express = require('express');
const router = express.Router();


router.get('/LastFM', (req, res) => {
	res.render('lastFm')
})

router.get('/Wheater_Map', (req, res) => {
	res.render('wheaterMap')
})

router.get('/Github', (req, res) => {
	res.render('', {})
})

module.exports = router