var i = 0;

let info =
`cat info.txt
Edward Lu - ECE student at Carnegie Mellon University class of 2022
`;

var typing = true;
var type_speed = 20;

let prompt = "user@edwards_website:$ ";

var files = [
"info.txt",
"github.txt"
];

let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
function display_header() {
    let d = new Date();
    let header =
    `Welcome to Edwards Website LTS (GNU/Linux ${Math.round(Math.random() * 5 + 1)}.${Math.round(Math.random() * 5 + 1)}.${Math.round(Math.random() * 5 + 1)}-${Math.round(Math.random() * 9 + 50)}-generic x86_64)
    <br><br>
    ${Math.round(Math.random() * 299 + 100)} packages can be updated.
    ${Math.round(Math.random() * 6 + 2)} updates are security updates.
    <br><br>
    Your Hardware Enablement Stack (HWE) is supported until April ${Math.round(Math.random() * 100 + d.getFullYear())}.
    <br>
    Last login: ${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} on ttys000`;

    document.getElementById("header").innerHTML = header;
}

function print_prompt() {
    let terminal = document.getElementById("terminal");
    let cursor = document.getElementById("cursor");
    let text = document.getElementById("text");
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
        let to_add = info.charAt(i);
        let text = document.getElementById("text");
        let terminal = document.getElementById("terminal");
        text.innerHTML += to_add;
        if (info.charAt(i) == '\n') {
            print_prompt();
        }
        ++i;
        setTimeout(type_info, 50);
    }
    else {
        typing = false;
    }
}

function blink_cursor() {
    let cursor = document.getElementById("cursor");
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
    let text = document.getElementById("text");
    text.innerHTML += '\n';
    command = command.split(" ")
    switch (command[0]) {
        case "":
            break;
        case "ls":
            if (command.length == 1) {
                for (var j = 0; j < files.length; ++j) {
                    text.innerHTML += files[j] + '\n';
                }
            }
            else if (files.includes(command[1])) {
                text.innerHTML += `${command[1]}\n`
            }
            else {
                text.innerHTML += `ls: ${command[1]}: No such file or directory\n`
            }
            break;
        case "cat":
            switch (command[1]) {
                case files[0]:
                    text.innerHTML += "Edward Lu - ECE student at Carnegie Mellon University class of 2022\n"
                    break;
                case files[1]:
                    text.removeAttribute("id");
                    terminal.insertAdjacentHTML('beforeend', '<a href="https://github.com/EdwardLu2018">github link</a><br>');
                    break;
                default:
                    text.innerHTML += `cat: ${command[1]}: No such file or directory\n`
            }
            break;
        case "pwd":
            text.innerHTML += "/the/internet/edwardswebsite/user\n"
            break;
        default:
            text.innerHTML += `command not found: ${command[0]}\n`
            break;
    }
}

function handle_keypress(event) {
    if (!typing) {
        let text = document.getElementById("text");
        switch (event.key) {
            case 'Backspace':
                if (text.innerHTML.length != 0) {
                    text.innerHTML = text.innerHTML.slice(0, -1);
                }
                break;
            case 'Enter':
                let command = text.innerHTML;
                perform_command(command);
                print_prompt();
                break;
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                break;
            default:
                text.innerHTML += event.key;
                break;
        }
    }
}

function main() {
    display_header();
    print_prompt();
    type_info();
}

window.onload = main();
window.setInterval(blink_cursor, 750);
window.addEventListener('keydown', handle_keypress);
