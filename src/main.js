var i = 0;
var info =
`cat info.txt
Edward Lu - ECE student at Carnegie Mellon University class of 2022
`;
var typing = true;
var prompt = "user@edwards_website:$&nbsp;";
var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

function make_header() {
    var d = new Date();
    document.getElementById("header").innerHTML =
    `Last login: ${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} on ttys000`;
}

function insert_prompt() {
    var terminal = document.getElementById("terminal");
    var cursor = document.getElementById("cursor");
    var text = document.getElementById("text");
    if (cursor) {
        cursor.parentNode.removeChild(cursor);
    }
    if (text) {
        text.removeAttribute("id");
    }
    terminal.insertAdjacentHTML('beforeend', `<span class="prompt">${prompt}</span>`);
    terminal.insertAdjacentHTML('beforeend', '<p id="text"></p>');
    terminal.insertAdjacentHTML('beforeend', '<span id="cursor">&#9608;</span>');
    if (text) {
        text.scrollIntoView({behavior: "smooth"});
    }
}

function type_info() {
    if (i < info.length) {
        var to_add = info.charAt(i);
        var text = document.getElementById("text");
        var terminal = document.getElementById("terminal");
        text.innerHTML += to_add;
        if (info.charAt(i) == '\n') {
            insert_prompt();
        }
        ++i;
        setTimeout(type_info, 50);
    }
    else {
        typing = false;
    }
}

function blink_cursor() {
    var cursor = document.getElementById("cursor");
    if (cursor) {
        let cursor_text = cursor.innerHTML
        if (cursor_text == "") {
            cursor.innerHTML = "&#9608;";
        } else {
            cursor.innerHTML = "";
        }
    }
}

function perform_command(command) {
    var text = document.getElementById("text");
    text.innerHTML += '\n';
    switch (command) {
        case "":
            break;
        case "ls":
            text.innerHTML += "info.txt"
            break;
        case "cat info.txt":
            text.innerHTML = "Edward Lu - ECE student at Carnegie Mellon University class of 2022"
            break;
        default:
            text.innerHTML += `command not found: ${command}`
            break;
    }
}

function handle_keypress(event) {
    if (!typing) {
        var text = document.getElementById("text");
        if (event.key != 'Enter') {
            text.innerHTML += event.key;
        }
        else {
            var command = text.innerHTML;
            perform_command(command);
            if (command != "") text.innerHTML += '\n';
            insert_prompt();
        }
    }
}

function main() {
    var terminal = document.getElementById("terminal");
    make_header();
    insert_prompt();
    type_info();
}

window.onload = main();
window.setInterval(blink_cursor, 750);
window.addEventListener('keypress', handle_keypress);
