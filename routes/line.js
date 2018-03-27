'use strict';

var express = require('express');
var router = express.Router();

const line = require('@line/bot-sdk')
const linecontroller = require('../controllers/lineController');
const configs = require('../config')
const client = new line.Client(config);

/* GET home page. */
router.post('/webhook',line.middleware(configs.lineconfig), linecontroller.webhook);

module.exports = router;