
'use strict';

var recastai = require('recastai')

function dialogMsgAI(text , convertionId) {

    console.log("dialogMsgAI type " + text)
    console.log("dialogMsgAI convertionId " + convertionId)

    var build = new recastai.build('c875b4e00fd8253ca32eda035d121e37', 'th')

    return build.dialog({ type: 'text', content: text}, { conversationId: convertionId })

}

module.exports = {
    dialogMsg: dialogMsgAI
}