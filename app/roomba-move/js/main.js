const connectButton = document.getElementById("connect");
const disconnectButton = document.getElementById("disconnect");

const dataArea = document.getElementById("dataArea");
dataArea.scrollTop = dataArea.scrollHeight;

const lblXValue = document.getElementById("lblXValue");
const lblYValue = document.getElementById("lblYValue");
const lblXValueNormalized = document.getElementById("lblXValueNormalized");
const lblYValueNormalized = document.getElementById("lblYValueNormalized");

let btDevice = null;
let btCharacteristic = null;


connectButton.addEventListener("click", () => 
{
    const valueServiceUuid = 65504;
    const valueCharacteristicUuid = 65505;

    console.log("Requesting Bluetooth Device...");

    navigator.bluetooth.requestDevice({filters: [{services: [valueServiceUuid]}]})
    .then(device => 
    {
        console.log("Connecting to GATT Server...");
        return device.gatt.connect();
    })
    .then(server => 
    {
        console.log("Getting Service...");
        return server.getPrimaryService(valueServiceUuid);
    })
    .then(service =>
    {
        console.log("Getting Characteristic...");
        return service.getCharacteristic(valueCharacteristicUuid);
    })
    .then(characteristic => 
    {
        console.log("> Characteristic UUID:  " + characteristic.uuid);
        console.log("> Broadcast:            " + characteristic.properties.broadcast);
        console.log("> Read:                 " + characteristic.properties.read);
        console.log("> Write w/o response:   " + characteristic.properties.writeWithoutResponse);
        console.log("> Write:                " + characteristic.properties.write);
        console.log("> Notify:               " + characteristic.properties.notify);
        console.log("> Indicate:             " + characteristic.properties.indicate);
        console.log("> Signed Write:         " + characteristic.properties.authenticatedSignedWrites);
        console.log("> Queued Write:         " + characteristic.properties.reliableWrite);
        console.log("> Writable Auxiliaries: " + characteristic.properties.writableAuxiliaries);

        btDevice = characteristic.service.device;
        btCharacteristic = characteristic;

        characteristic.startNotifications()
        .then(() => 
        {
            console.log("Notification started");
            characteristic.addEventListener("characteristicvaluechanged", handleCharacteristicValueChanged);

            connectButton.disabled = true;
            disconnectButton.disabled = false;
        });
    })
    .catch(error =>
    {
        console.log("D'oh! " + error);
    });
});
  
disconnectButton.addEventListener("click", () => 
{
    if(btDevice)
    {
        // Add code to remove this handle?

        if(btDevice.gatt.connected)
        {
            btDevice.gatt.disconnect();
            
            connectButton.disabled = false;
            disconnectButton.disabled = true;
            //serviceUuid.disabled = false;
            //characteristicUuid.disabled = false;

            console.log("Disconnected");
        }
        else
        {
            console.log("Already disconnected");
        }
    }
});

var joy = new JoyStick("joyDiv", { autoReturnToCenter: false }, (stickData) =>
{
    let joyX = stickData.x;
    let joyY = stickData.y;
    lblXValue.innerHTML = joyX;
    lblYValue.innerHTML = joyY;
    let joyXn = map(joyX, -100, 100, -2000, 2000);
    let joyYn = map(joyY, -100, 100, -500, 500);

    let joyXBytes = intToByteArray(joyXn);
    let joyYBytes = intToByteArray(joyYn);
    lblXValueNormalized.innerHTML = joyXn + "-" + joyXBytes[0] + "-" + joyXBytes[1];
    lblYValueNormalized.innerHTML = joyYn + "-" + joyYBytes[0] + "-" + joyYBytes[1];;

    const bufferToSend = new Uint8Array([35, 0, 0, 0, 0, 10]);
    bufferToSend[1] = joyXBytes[0];
    bufferToSend[2] = joyXBytes[1];
    bufferToSend[3] = joyYBytes[0];
    bufferToSend[4] = joyYBytes[1];

    btCharacteristic.writeValue(bufferToSend);
});

function handleCharacteristicValueChanged(event)
{
    let value = new TextDecoder().decode(event.target.value);
    console.log(value);

    dataArea.value = dataArea.value + value;

    dataArea.scrollTop = dataArea.scrollHeight;
}


const testButton = document.getElementById("test");
testButton.addEventListener("click", () =>
{
    //const bufferToSend = new Uint8Array(['#', 33, 33, 'A', 65]);
    const bufferToSend = new Uint8Array([35, 0, 1, 0, 1, 10]);

    btCharacteristic.writeValue(bufferToSend);
});


function map(x, in_min, in_max, out_min, out_max)
{
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

document.getElementById("moveForward").addEventListener("click", () =>
{
    const bufferToSend = new Uint8Array([35, 60, 0, 0, 0, 10]);

    btCharacteristic.writeValue(bufferToSend);
});

document.getElementById("moveStop").addEventListener("click", () =>
{
    const bufferToSend = new Uint8Array([35, 0, 0, 0, 0, 10]);

    btCharacteristic.writeValue(bufferToSend);
});

document.getElementById("moveBackward").addEventListener("click", () =>
{
    const bufferToSend = new Uint8Array([35, 196, 255, 0, 0, 10]);

    btCharacteristic.writeValue(bufferToSend);
});

document.getElementById("moveLeft").addEventListener("click", () =>
{
    const bufferToSend = new Uint8Array([35, 30, 0, 1, 0, 10]);

    btCharacteristic.writeValue(bufferToSend);
});

document.getElementById("moveRight").addEventListener("click", () =>
{
    const bufferToSend = new Uint8Array([35, 30, 0, 255, 255, 10]);

    btCharacteristic.writeValue(bufferToSend);
});

intToByteArray = function(intNumber)
{
    var byteArray = new Uint8Array([0, 0]);

    for(var index = 0; index < byteArray.length; index ++)
    {
        var byte = intNumber & 0xff;
        byteArray [index] = byte;
        intNumber = (intNumber - byte) / 256;
    }

    /*if(intNumber < 0)
    {
        byteArray[0] = byteArray[0] - 1;
    }*/

    return byteArray;
};