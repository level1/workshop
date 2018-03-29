'use strict';

const configs = require('../config')
const line = require('@line/bot-sdk')
const lineClient = new line.Client(configs.lineconfig);
const productModels = require('../models/product')

function webhookImp(req,res) {
    console.log("req>>>>>>" + req.body)
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}

// event handler
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event //
      return Promise.resolve(null);
    }

    const echo = {type: 'text' , text: event.message.text};

    productModels.create({
        name : "Test",
        type : echo.type,
        text : echo.text,
        price : 1200.50,
        createdate : Date.now()
    })
    .then((result) => {
        echo.text = JSON.stringify(result);
        return lineClient.pushMessage(event.source.userId, echo);
    })
    .catch((ex) =>{
        return lineClient.pushMessage(event.source.userId, ex);
    });

   
}

module.exports = {
    webhook: webhookImp
}