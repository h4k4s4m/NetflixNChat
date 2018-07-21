// Creates and adds button to document body
var Butt = $('<button/>',
    {
        text: 'Chat',
        click: function () {
            $(".main-window").toggle()
        }
    });
Butt.addClass("main-butt");
$(document.body).append(Butt);

//Creates and adds chat window
var chat_main = $('<div style="display:none" class="main-window"> <div/>');
$(document.body).append(chat_main);

//Creates and adds chat window
var chat_text = $('<div class="text-window"> <div/>');
$(".main-window").append(chat_text);

//Create and adds the input field and submit button
var input = $('<input class="chat-input" type="text">');
input.keypress((e) => {
    if (e.key == "Enter") {
        if ($(".chat-input").val().length > 0) {
            $(".text-window").append("<p class='message' >Sahm: " + $(".chat-input").val() + "</p>");
            $(".chat-input").val("");
        }
    }
})
$(".main-window").append(input);

//submit button logic
var butt2 = $('<button/>',
    {
        text: 'Send',
        click: function () {
            if ($(".chat-input").val().length > 0) {
                $(".text-window").append("<p class='message' >Sahm: " + $(".chat-input").val() + "</p>");
                $(".chat-input").val("");
            }
        }

    });
butt2.addClass("chat-butt");
$(".main-window").append(butt2);