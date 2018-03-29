
var recastai = require('recastai')

function dialogMsgAI(text , convertionId) {

    var converId = convertionId || null;

    var build = new recastai.build('c875b4e00fd8253ca32eda035d121e37', 'en')
    return build.dialog({ type: 'text', content: text}, { conversationId: converId })

}

module.exports = {
    dialogMsg: dialogMsgAI
}