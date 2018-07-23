//User variable that can be changed client-side
var user="default"

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

//Socket IO bit
var socket = io("https://netflixnchat.herokuapp.com/");
socket.on('chat message', function (msg) {
    if(msg){
    $(".text-window").append("<p class='message' >" + msg + "</p>");
    $(".text-window")[0].scrollTop = $(".text-window")[0].scrollHeight;
    }
});


//Create and adds the input field and submit button
var input = $('<input class="chat-input" type="text">');
input.keypress((e) => {
    if (e.key == "Enter") {
        if ($(".chat-input").val().length > 0) {
            socket.emit("chat message", (user + ": " + $(".chat-input").val()));
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
                socket.emit("chat message", (user + ": " + $(".chat-input").val()));
                $(".chat-input").val("");
            }
        }

    });
butt2.addClass("chat-butt");
$(".main-window").append(butt2);

//Create and adds the input field and submit button
var name_field = $('<input class="name-input" placeholder="Type a nickname here" type="text">');
name_field.keypress((e) => {
    if (e.key == "Enter") {
        if ($(".name-input").val().length > 0) {
            user = $(".name-input").val();
            alert("Name changed to " + $(".name-input").val());
            $(".name-input").val("");
        }
    }
})
$(".main-window").append(name_field);
