//I don't know what I"m doing - Sahm Samarghandi
$( document ).ready(()=>{
//This pauses the video so for syncing purposes.
autopause = setInterval(() => { $(".button-nfplayerPause").click() }, 1)
console.log(autopause)
$(".group-play").click(() => { clearInterval(autopause);
console.log("cleared interval") })

//User variable that can be changed client-side
var user = "Snowden"

//Creating the socket connection
var socket = io("https://netflixnchat.herokuapp.com/");
socket.on('chat message', function (msg) {
    if (msg) {
        $(".text-window").append("<p class='message' >" + msg + "</p>");
        $(".text-window")[0].scrollTop = $(".text-window")[0].scrollHeight;
    }
});

//Main background window
var chat_main = $('<div style="display:none" class="main-window"> <div/>');
$(document.body).append(chat_main);

//Text box
var chat_text = $('<div class="text-window"> <div/>');
$(".main-window").append(chat_text);

//clicks the pause/play button on socket command button
socket.on('group control', function (e) {
    console.log("socket caught")
    console.log(e)
    if (e[0] == "Pause") {
        $(".button-nfplayerPause").click()
        console.log("pause triggered")
    }
    if (e[0] == "Play") {
        $(".button-nfplayerPlay").click()
        clearInterval(autopause);
        console.log("play triggered")
    }
    if (e[0] == "Sync") {
        location.href = e[1]
        $(".button-nfplayerPlay").click()
        console.log("Sync triggered")
    }
});

//Main button that opens and closes the main window
var chat_button = $('<button/>',
    {
        text: 'Chat',
        click: function () {
            $(".main-window").toggle()
        }
    });
chat_button.addClass("main-butt");
$(document.body).append(chat_button);


//Group Pause button
var group_pause = $('<button/>',
    {
        text: 'Pause',
        click: function () {
            socket.emit("group control", ["Pause", null])
        }
    });
group_pause.addClass("group-pause");
$(".main-window").append(group_pause);

//Group Play button
var group_play = $('<button/>',
    {
        text: 'Play',
        click: function () {
            socket.emit("group control", ["Play", null])
        }
    });
group_play.addClass("group-play");
$(".main-window").append(group_play);

//Group Sync button
var sync = $('<button/>',
    {
        text: 'Sync',
        click: function () {
            value = $(".scrubber-head").attr("aria-valuenow")
            url = location.href + "&t=" + value
            socket.emit("group control", ["Sync", url])
        }
    });
sync.addClass("sync");
$(".main-window").append(sync);

//Create and adds the input field
var input = $('<input class="chat-input" type="text">');
input.keypress((e) => {
    if (e.key == "Enter") {
        if ($(".chat-input").val().length > 0) {
            socket.emit("chat message", (user + ": " + "<span class=\"msg-text\">" + $(".chat-input").val() + "</span>"));
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
})

