'use strict';

const configs = require('../config')
const line = require('@line/bot-sdk')
const lineClient = new line.Client(configs.lineconfig);
const productModels = require('../models/product')
const aiController = require('./aiController')

function webhookImp(req,res) {
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

    // if (event.type !== 'message' || event.message.type !== 'text') {
    //   // ignore non-text-message event //
    //   return Promise.resolve(null);
    // }
    console.log("event.type " + event.type)

    var convertionId = null;
    if (event.type == 'message') {

        console.log("event.message.text " + event.message.text)

        aiController.dialogMsg(event.message.text,convertionId)
        .then((resutl) => {
            console.log("resutl " + resutl)

            let echo = {type: 'text' , text: JSON.stringify(resutl.nlp.intents)};
            convertionId = result.conversation.id
            return lineClient.pushMessage(event.source.userId, echo);

        }).catch((ex) => {
            return ex;
        });
    }

    if (event.type == 'postback') {
        let echo = {type: 'text' , text: "จ่ายตังมา"};
        return lineClient.pushMessage(event.source.userId, echo);
    }  

    //const echo = {type: 'text' , text: event.message.text};
    // var echo =
    // {
    //     type: "template",
    //     altText: "this is a carousel template",
    //     template: {
    //         type: "carousel",
    //         columns: [],
    //         imageAspectRatio: "rectangle",
    //         imageSize: "cover"
    //     }
    // }

    // var column = {
    //     thumbnailImageUrl: "https://example.com/bot/images/item1.jpg",
    //     imageBackgroundColor: "#FFFFFF",
    //     title: "this is menu",
    //     text: "description",
    //     defaultAction: {
    //         "type": "uri",
    //         "label": "View detail",
    //         "uri": "http://example.com/page/123"
    //     },
    //     actions: [
    //         {
    //             "type": "postback",
    //             "label": "Buy",
    //             "data": "action=buy&itemid=111"
    //         },
    //         {
    //             "type": "postback",
    //             "label": "Add to cart",
    //             "data": "action=add&itemid=111"
    //         },
    //         {
    //             "type": "uri",
    //             "label": "View detail",
    //             "uri": "http://example.com/page/111"
    //         }]
    //   }

    // productModels.find({text:'เที่ยง'})
    // .then((result) => {
    //     result.forEach((data) => {

    //         column.title = data.type
    //         column.text = data.text

    //         echo.template.columns.push(column)

    //     });
        
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