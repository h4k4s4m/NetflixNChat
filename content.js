// Creates and adds button to document body
var Butt = $('<button/>',
{
    text: 'Chat',
    click: function () { 
        $(".main-window").toggle()
     }
});
Butt.addClass("main-butt")
$(document.body).append(Butt)

var chat = $('<div style="display:none" class="main-window"> <div/>');
$(document.body).append(chat)