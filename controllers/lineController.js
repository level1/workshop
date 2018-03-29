'use strict';

const configs = require('../config')

const line = require('@line/bot-sdk')
const lineClient = new line.Client(configs.lineconfig);

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

    return lineClient.pushMessage(event.source.userId, echo);
}

module.exports = {
    webhook: webhookImp
}