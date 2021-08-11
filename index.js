const {Telegraf, Markup, Extra} = require("telegraf")


const config = {
botName: "E'lon Qo`yuvchi Admin bot",
botToken:"1771859288:AAEERV_SKcwCgWjB7mCimKImVy7A2XvYAvU",
admin: {type: Number},
mainChannelId:"@Telefon_bozorim_zor",
mainChannelUrl: "https://t.me/Telefon_bozorim_zor",
channelName: "Telefon Bozor"
}

try {
    

const bot = new Telegraf(config.botToken);

let data = {
usersId:[],
blockId:[]
}



bot.start(async(msg)=>{
msg.replyWithHTML(`<b>Assalomu alaykum <code>${msg.message.from.first_name}</code>.  E'lon beruvchi botimizga Xush kelibsiz!</b>`)
if (data.usersId.indexOf(msg.message.from.id)==-1){
    
    data.usersId.push(msg.message.from.id);

} 


try {
    let user = await msg.tg.getChatMember(config.mainChannelId,msg.message.from.id)
    
if (user.status!='member'){
data.blockId.push(msg.message.from.id)
msg.replyWithHTML("Siz Quyidagi kanallarga a'zo bo`lishingiz kerak!", Extra.markup(Markup.inlineKeyboard([{text: "Kanal 1", url: config.mainChannelUrl},{text:"Tekshirish", callback_data:"tekshirish"}])))


} else{
msg.replyWithHTML("Kanalga A'zo bo`lganligingiz tasdiqlandi!", Extra.markup(Markup.keyboard(keyboards.mainKey, {columns:2}).resize(true)))
data.blockId.splice(data.blockId.indexOf(msg.message.from.id), 1)

}
    
    
} catch (error) {
    
    data.blockId.push(msg.message.from.id)
    msg.replyWithHTML("Siz Quyidagi kanallarga a'zo bo`lishingiz kerak!", Extra.markup(Markup.inlineKeyboard([{text: "Kanal 1", url: config.mainChannelUrl},{text:"Tekshirish", callback_data:"tekshirish"}])))
    

}

//let user = await msg.tg.getChatMembersCount(config.mainChannelId)



})
let st=[
    {
        id: new Number(),
        stat: new String(),
        image: new String(),
        izoh: new String(),
        manzil: new String()
    }
]
bot.on([ "text" ,"photo"], msg=>{
try {
    

switch (msg.message.text) {
    case "Bosh menyu":
        if  (data.blockId.indexOf(msg.message.from.id)==-1){
            msg.replyWithHTML("<b>Bosh menyu</b>", Extra.markup(Markup.keyboard(keyboards.mainKey, {columns:2}).resize(true)))
            }    
            return 
        break;
    case keyboards.mainKey[0][0]:
        if (st.find(({id})=>id==msg.message.from.id)==undefined) st.push({ id: msg.message.from.id, stat: "Rasm"})

        msg.replyWithHTML("E'lon rasmini jo`nating", Extra.markup(Markup.removeKeyboard()))    

return 
    break;

case keyboards.mainKey[1][0]:
msg.replyWithHTML(`<b>
🆔: <code>${msg.message.from.id}</code>
🔗: @${msg.from.username}
👤: ${msg.from.first_name}</b>
`)

break;

case keyboards.mainKey[1][1]:
msg.replyWithHTML(`<b>
Bu bot <a href="${config.mainChannelUrl}">${config.channelName}</a> kanaliga e'lonlar joylashtirish uchun maxsus tayyorlandi!
Dasturchi: @Abdumannon_shamsiyev</b>
`)

break;


default:
        break;
}
if (st.find(({id})=>id==msg.message.from.id)!=undefined){

switch (st.find(({id})=>id==msg.message.from.id).stat) {
    case 'Rasm':
        st.find(({id})=>id==msg.message.from.id).image = msg.message.photo[0].file_id;
        st.find(({id})=>id==msg.message.from.id).stat = "izoh"
        msg.replyWithHTML("<b>Endi Bu e'longa mos Izoh qo`shing</b>")
return
        break;
case "izoh":
    st.find(({id})=>id==msg.message.from.id).izoh = msg.message.text
        st.find(({id})=>id==msg.message.from.id).stat = "manzil"
        msg.replyWithHTML("<b>Istiqomat qiladigan manzilingizni kiriting</b>")
return

case "manzil":

    st.find(({id})=>id==msg.message.from.id).manzil = msg.message.text
        st.find(({id})=>id==msg.message.from.id).stat = ""

msg.tg.sendPhoto(msg.chat.id,st.find(({id})=>id==msg.message.from.id).image, Extra.HTML(true).caption(post(st.find(({id})=>id==msg.message.from.id))+`<b>👤: <a href="https://t.me/${msg.message.from.username}">${msg.message.from.first_name}</a>\n\nTASDIQLAYSIZMI?</b>`).markup(Markup.inlineKeyboard([{text: "Ha", callback_data:"ha"}, {text: "Yo`q", callback_data: "yoq"}], {columns:2})));


return


break;
    default:
        break;
}


}

} catch (error) {
    
    msg.replyWithHTML("Notog`ri amal bajarildi /start tugmasini bosing")
}



})


let post = (data)=>{
return `<b>
🆔: <code>${data.id}</code>
⚙️: <i>${data.izoh}</i>
📍: ${data.manzil}</b>
`

}




const keyboards = {
   mainKey:[["E'lon berish"], ["Men haqimda", "Bot haqida"], ["Adminga Murojaat"]],
   
}

bot.action("yoq", msg=>{
msg.tg.deleteMessage(msg.callbackQuery.message.chat.id, msg.callbackQuery.message.message_id);
st.splice(st.findIndex(({id})=>id==msg.callbackQuery.message.chat.id), 1);
if  (data.blockId.indexOf(msg.callbackQuery.message.chat.id)==-1){
    msg.replyWithHTML("<b>Bosh menyu</b>", Extra.markup(Markup.keyboard(keyboards.mainKey, {columns:2}).resize(true)))
    }    



})

bot.action("ha", async(msg)=>{
msg.tg.sendPhoto(config.mainChannelId,st.find(({id})=>id==msg.callbackQuery.message.chat.id).image, Extra.HTML(true).caption("#Elon\n\n"+post(st.find(({id})=>id==msg.callbackQuery.message.chat.id))+`<b>👤: <a href="https://t.me/${msg.callbackQuery.message.chat.username}">${msg.callbackQuery.message.chat.first_name}</a></b>`));

msg.replyWithHTML("<code>E'loningiz muvaffaqiyatli yuborildi!</code>", Extra.inReplyTo(msg.callbackQuery.message.message_id))
st.splice(st.findIndex(({id})=>id==msg.callbackQuery.message.chat.id), 1);
if  (data.blockId.indexOf(msg.callbackQuery.message.chat.id)==-1){
    msg.replyWithHTML("<b>Bosh menyu</b>", Extra.markup(Markup.keyboard(keyboards.mainKey, {columns:2}).resize(true)))
    }    



})


bot.action("tekshirish", async(msg)=>{


    try {
        let user = await msg.tg.getChatMember(config.mainChannelId,msg.callbackQuery.from.id)
        
    if (user.status!='member'){
    data.blockId.push(msg.callbackQuery.from.id)
    msg.replyWithHTML("Siz Quyidagi kanallarga a'zo bo`lishingiz kerak!", Extra.markup(Markup.inlineKeyboard([{text: "Kanal 1", url: config.mainChannelUrl},{text:"Tekshirish", callback_data:"tekshirish"}])))
    
    
    } else{
    msg.replyWithHTML("Kanalga A'zo bo`lganligingiz tasdiqlandi!", Extra.markup(Markup.keyboard(keyboards.mainKey, {columns:2}).resize(true)))
    data.blockId.splice(data.blockId.indexOf(msg.callbackQuery.from.id), 1)
    
    }
        
        
    } catch (error) {
        
        data.blockId.push(msg.callbackQuery.from.id)
        msg.replyWithHTML("Siz Quyidagi kanallarga a'zo bo`lishingiz kerak!", Extra.markup(Markup.inlineKeyboard([{text: "Kanal 1", url: config.mainChannelUrl},{text:"Tekshirish", callback_data:"tekshirish"}])))
        
    
    }
    
    

})


bot.launch({polling:true})

} catch (error) {
    
}