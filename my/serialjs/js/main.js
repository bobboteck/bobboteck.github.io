const connectButton = document.getElementById('connect');

if ("serial" in navigator) 
{
    // The Web Serial API is supported.
    document.getElementById("messageStatus").innerText = "Web Serial API is supported";
    
    //connectButton  ABILITARE

    connectButton.addEventListener('click', () => 
    {
        // Prompt user to select any serial port.
        navigator.serial.requestPort().then(port =>
        {
            console.log(port);
        })
        .catch(error =>
        {
            console.log('Error! ' + error);
        });
    });
}
else
{
    document.getElementById("messageStatus").innerText = "Web Serial API is NOT supported!";
}


