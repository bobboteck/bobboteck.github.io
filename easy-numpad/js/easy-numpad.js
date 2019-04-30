let _outputID = "";

function show_easy_numpad(thisElement)
{
    let easy_numpad = document.createElement("div");
    easy_numpad.id = "easy-numpad-frame";
    easy_numpad.className = "easy-numpad-frame";
    easy_numpad.innerHTML = `
    <div class="easy-numpad-container">
        <div class="easy-numpad-output-container">
            <p class="easy-numpad-output" id="easy-numpad-output"></p>
        </div>
        <div class="easy-numpad-number-container">
            <table>
                <tr>
                    <td><a href="7" onclick="easynum()">7</a></td>
                    <td><a href="8" onclick="easynum()">8</a></td>
                    <td><a href="9" onclick="easynum()">9</a></td>
                    <td><a href="Del" class="del" id="del" onclick="easy_numpad_del()">Del</a></td>
                </tr>
                <tr>
                    <td><a href="4" onclick="easynum()">4</a></td>
                    <td><a href="5" onclick="easynum()">5</a></td>
                    <td><a href="6" onclick="easynum()">6</a></td>
                    <td><a href="Clear" class="clear" id="clear" onclick="easy_numpad_clear()">Clear</a></td>
                </tr>
                <tr>
                    <td><a href="1" onclick="easynum()">1</a></td>
                    <td><a href="2" onclick="easynum()">2</a></td>
                    <td><a href="3" onclick="easynum()">3</a></td>
                    <td><a href="Cancel" class="cancel" id="cancel" onclick="easy_numpad_cancel()">Cancel</a></td>
                </tr>
                <tr>
                    <td colspan="2" onclick="easynum()"><a href="0">0</a></td>
                    <td onclick="easynum()"><a href=".">.</a></td>
                    <td><a href="Done" class="done" id="done" onclick="easy_numpad_done()">Done</a></td>
                </tr>
            </table>
        </div>
    </div>
    `;

    document.getElementsByTagName('body')[0].appendChild(easy_numpad);
    _outputID = thisElement.id;
    document.getElementById("easy-numpad-output").innerText = thisElement.value;
}

function easy_numpad_close()
{
    let elementToRemove = document.querySelectorAll("div.easy-numpad-frame")[0];
    elementToRemove.parentNode.removeChild(elementToRemove);
}

function easynum() {
    event.preventDefault();

    var easy_num_button = $(event.target);
    var easy_num_value = easy_num_button.text();
    $('#easy-numpad-output').append(easy_num_value);
}
function easy_numpad_del() {
    event.preventDefault();
    var easy_numpad_output_val = $('#easy-numpad-output').text();
    var easy_numpad_output_val_deleted = easy_numpad_output_val.slice(0, -1);
    $('#easy-numpad-output').text(easy_numpad_output_val_deleted);
}
function easy_numpad_clear() {
    event.preventDefault();
    $('#easy-numpad-output').text("");
}
function easy_numpad_cancel() {
    event.preventDefault();
    $('#easy-numpad-frame').remove();
}
function easy_numpad_done() {
    event.preventDefault();
    var easy_numpad_output_val = $('#easy-numpad-output').text();
    document.getElementById(_outputID).value=easy_numpad_output_val;
    easy_numpad_close();
}