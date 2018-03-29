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

    //const echo = {type: 'text' , text: event.message.text};

    let echo =
    {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                  "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
                  "imageBackgroundColor": "#FFFFFF",
                  "title": "this is menu",
                  "text": "description",
                  "defaultAction": {
                      "type": "uri",
                      "label": "View detail",
                      "uri": "http://example.com/page/123"
                  },
                  "actions": [
                      {
                          "type": "postback",
                          "label": "Buy",
                          "data": "action=buy&itemid=111"
                      },
                      {
                          "type": "postback",
                          "label": "Add to cart",
                          "data": "action=add&itemid=111"
                      },
                      {
                          "type": "uri",
                          "label": "View detail",
                          "uri": "http://example.com/page/111"
                      }
                  ]
                },
                {
                  "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
                  "imageBackgroundColor": "#000000",
                  "title": "this is menu",
                  "text": "description",
                  "defaultAction": {
                      "type": "uri",
                      "label": "View detail",
                      "uri": "http://example.com/page/222"
                  },
                  "actions": [
                      {
                          "type": "postback",
                          "label": "Buy",
                          "data": "action=buy&itemid=222"
                      },
                      {
                          "type": "postback",
                          "label": "Add to cart",
                          "data": "action=add&itemid=222"
                      },
                      {
                          "type": "uri",
                          "label": "View detail",
                          "uri": "http://example.com/page/222"
                      }
                  ]
                }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
      }
      return lineClient.pushMessage(event.source.userId, echo);

    // productModels.find()
    // .then((result) => {
    //     echo.text = JSON.stringify(result);
    //     return lineClient.pushMessage(event.source.userId, echo);
    // })
    // .catch((ex) =>{
    //     return lineClient.pushMessage(event.source.userId, ex);
    // });

    

    // productModels.create({
    //     name : "Test",
    //     type : echo.type,
    //     text : echo.text,
    //     price : 1200.50,
    //     createdate : Date.now()
    // })
    // .then((result) => {
    //     echo.text = JSON.stringify(result);
    //     return lineClient.pushMessage(event.source.userId, echo);
    // })
    // .catch((ex) =>{
    //     return lineClient.pushMessage(event.source.userId, ex);
    // });

   
}

module.exports = {
    webhook: webhookImp
}