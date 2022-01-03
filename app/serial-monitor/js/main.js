const baudRateSelection = document.getElementById("baudRateSelection");
const connectButton = document.getElementById("connect");
const textToSend = document.getElementById("textToSend");
const sendButton = document.getElementById("sendButton");
const receivedData = document.getElementById("receivedData");
const autoScrollCheck = document.getElementById("autoScrollCheck") ;
const saveMenuItem = document.getElementById("saveMenuItem");

let connected = false;
let baudRate = 0;
let port;
let reader;


// Calculate the height of text area
let screenHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
receivedData.style.height = (screenHeight - 210).toString() + "px";
//TODO: manage the screen resize

// Disable controls
baudRateSelection.disabled = true;
connectButton.disabled = true;
textToSend.disabled = true;
sendButton.disabled = true;

// Check i f browser support the 'Web Serial API'
if ("serial" in navigator) 
{
    // Enable controls
    baudRateSelection.disabled = false;
}
else
{
    // Disable the connect button
    connectButton.disabled = true;
    baudRateSelection.disabled = true;
    // Message for the user
    //alert("Sorry, but your browser not support 'Web Serial API', try with Chrome, Edge or other browse that support it");
}

// Add event function on baudaRateSelecttion change
baudRateSelection.addEventListener("change", (event) =>
{
    console.log(event.target.value);
    baudRate = event.target.value;
    // If selected a valid baudrate, enable the connet button
    connectButton.disabled = baudRate > 0 ? false : true;
});

// Add event function on connectButton click
connectButton.addEventListener('click', async () => 
{
    console.log("Evento - connectButton");

    if (navigator.serial)
    {
        if(baudRate > 0 && !connected)
        {
            serialConnect().then(() =>
            {
                connectButton.innerText = "Disconnect";
                connectButton.classList.remove("btn-success");
                connectButton.classList.add("btn-outline-success");
                baudRateSelection.disabled = true;
                textToSend.disabled = false;
                sendButton.disabled = false;

                readUntilNotClose();
            });
        }
        else
        {
            console.log("Tentativo di chiusura");
            connected = false;
            console.log("Tentativo di chiusura - Prima di reader.cancel");
            reader.cancel();
            console.log("Tentativo di chiusura - Dopo di reader.cancel");
            // Allow the serial port to be closed
            reader.releaseLock();
            // Close serial port
            await port.close();
            console.log("Tentativo di chiusura - Dopo di await port.close");

            connectButton.innerText = "Connect";
            connectButton.classList.add("btn-success");
            connectButton.classList.remove("btn-outline-success");
            baudRateSelection.disabled = false;
            textToSend.disabled = true;
            sendButton.disabled = true;
        }
    }
});

sendButton.addEventListener("click", async () =>
{
    // Define writer
    const writer = port.writable.getWriter();
    // Init encoder object
    let enc = new TextEncoder();
    // convert text
    const data = enc.encode(textToSend.value);
    // send data
    await writer.write(data);
    // Allow the serial port to be closed
    writer.releaseLock();
    // Clean the textbox
    textToSend.value = "";
});

saveMenuItem.addEventListener("click", () =>
{
    const d = new Date();
    // define string date for file name
    let month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString();
    let day = d.getDate() >= 10 ? d.getDate().toString() : "0" + d.getDate().toString();
    let dataForFileName = d.getFullYear().toString() + month + day;
    // define string hour for file name
    let hours = d.getHours() >= 10 ? d.getHours().toString() : "0" + d.getHours().toString();
    let minutes = d.getMinutes() >= 10 ? d.getMinutes().toString() : "0" + d.getMinutes().toString();
    let hourForFileName = hours + minutes;

    let fileName = "SerialMonitor-" + dataForFileName + hourForFileName + ".txt";
    
    download(fileName, receivedData.value);
}, false);


/**
 * Create a connection with selected serial port
 */
async function serialConnect()
{
    try
    {
        console.log("serialConnect ...");

        port = await navigator.serial.requestPort();
        await port.open({ baudRate: baudRate });

        connected = true;

        console.log("Port opened!");
    }
    catch(error)
    {
        console.log(error);
    }
}


/**
 * Read the data and write it in to the text area
 */
async function readUntilNotClose()
{
    while(port.readable && connected)
    {
        try
        {
            console.log("readUntilNotClose ...");

            reader = port.readable.getReader();

            // Listen to data coming from the serial device.
            while (true) 
            {
                const { value, done } = await reader.read();
                if (done) 
                {
                    console.log("DONE");
                    // Allow the serial port to be closed
                    reader.releaseLock();
                    break;
                }
                else
                {
                    // Show in text area each char received
                    value.forEach(element => 
                    {
                        // The sequence of chars 13 and 10, insert a blank row in text area, this control is for skipping the 13 char and not have the blank row
                        if(element !== 13)
                        {
                            //console.log(element);
                            receivedData.value = receivedData.value + String.fromCharCode(element);
                        }
                    });

                    // Check if Autoscroll is selected or not
                    if(autoScrollCheck.checked)
                    {
                        // Auto scroll down
                        receivedData.scrollTop = receivedData.scrollHeight;
                    }
                }

                console.log("Into while true");
            }
        }
        catch(error)
        {
            console.log("CATCH");
            console.log(error);
        }
        finally
        {
            console.log("FINALLY");
            // Allow the serial port to be closed
            reader.releaseLock();
        }
    }

    console.log("Disconnesso!");
}

/**
 * Function to save serial data received into a file to save localy
 * 
 * @param filename {string} Name of file to be saved
 * @param data {string} Data to be saved
 */
function download(filename, data)
{
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}




navigator.serial.addEventListener("connect", (event) => 
{
    console.log("Event connected device");
});
  
navigator.serial.addEventListener("disconnect", (event) => 
{
    console.log("Event disconnect device");
});