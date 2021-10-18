let connected = false;
let baudRate = 0;
const connectButton = document.getElementById("connect");
const baudRateSelection = document.getElementById("baudRateSelection");
const receivedData = document.getElementById("receivedData");

// Disable controls
connectButton.disabled = true;
baudRateSelection.disabled = true;

// Check i f browser support the 'Web Serial API'
if ("serial" in navigator) 
{
    // Enable controls
    connectButton.disabled = false;
    baudRateSelection.disabled = false;
}
else
{
    // Disable the connect button
    connectButton.disabled = true;
    // Message for the user
    alert("Sorry, but your browser not support 'Web Serial API', try with Chrome or Edge");
}

baudRateSelection.addEventListener("change", (event) =>
{
    console.log(event.target.value);
    baudRate = event.target.value;
});
// Add event function on connectButton
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

function connetti()
{
    console.log("Cliccato connetti");
}


async function serialConnect()
{
    try
    {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });

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

            // value is a Uint8Array.
            //console.log(value);
            receivedData.value = receivedData.value + value + '\r\n';

            // Auto scroll down
            receivedData.scrollTop = receivedData.scrollHeight;
        }


    }
    catch(error)
    {
        console.log(error);
    }
}