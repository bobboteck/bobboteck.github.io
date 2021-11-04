let connected = false;
let baudRate = 0;
const connectButton = document.getElementById("connect");
const baudRateSelection = document.getElementById("baudRateSelection");
const receivedData = document.getElementById("receivedData");
const autoScrollCheck = document.getElementById("autoScrollCheck") ;

// Calculate the height of text area
let screenHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
receivedData.style.height = (screenHeight - 210).toString() + "px";
//TODO: manage the screen resize

// Disable controls
connectButton.disabled = true;
baudRateSelection.disabled = true;

// Check i f browser support the 'Web Serial API'
if ("serial" in navigator) 
{
    // Enable controls
    //connectButton.disabled = false;
    baudRateSelection.disabled = false;
}
else
{
    // Disable the connect button
    connectButton.disabled = true;
    baudRateSelection.disabled = true;
    // Message for the user
    alert("Sorry, but your browser not support 'Web Serial API', try with Chrome, Edge or other browse that support it");
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
connectButton.addEventListener('click', () => 
{
    console.log("Evento");
    if (navigator.serial)
    {
        if(baudRate > 0)
        {
            serialConnect();
        }
    }
});

/**
 * Create a connenction and write the data in to the text area
 */
async function serialConnect()
{
    try
    {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: baudRate });

        const reader = port.readable.getReader();

        // Listen to data coming from the serial device.
        while (true) 
        {
            const { value, done } = await reader.read();
            if (done) 
            {
                // Allow the serial port to be closed later.
                reader.releaseLock();
                break;
            }

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
    }
    catch(error)
    {
        console.log(error);
    }
}