const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');
const labelUS = document.getElementById('usValue');
const labelDC = document.getElementById('dcValue');


connectButton.addEventListener('click', () => 
{
    let serviceUuid = document.querySelector('#service').value;
    if (serviceUuid.startsWith('0x'))
    {
        serviceUuid = parseInt(serviceUuid);
    }
  
    let characteristicUuid = document.querySelector('#characteristic').value;
    if (characteristicUuid.startsWith('0x'))
    {
        characteristicUuid = parseInt(characteristicUuid);
    }
  
    console.log('Requesting Bluetooth Device...');
    navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]})
    .then(device => 
    {
        console.log('Connecting to GATT Server...');
        return device.gatt.connect();
    })
    .then(server => 
    {
        console.log('Getting Service...');
        return server.getPrimaryService(serviceUuid);
    })
    .then(service =>
    {
        console.log('Getting Characteristic...');
        return service.getCharacteristic(characteristicUuid);
    })
    .then(characteristic => 
    {
        console.log('> Characteristic UUID:  ' + characteristic.uuid);
        console.log('> Broadcast:            ' + characteristic.properties.broadcast);
        console.log('> Read:                 ' + characteristic.properties.read);
        console.log('> Write w/o response:   ' + characteristic.properties.writeWithoutResponse);
        console.log('> Write:                ' + characteristic.properties.write);
        console.log('> Notify:               ' + characteristic.properties.notify);
        console.log('> Indicate:             ' + characteristic.properties.indicate);
        console.log('> Signed Write:         ' + characteristic.properties.authenticatedSignedWrites);
        console.log('> Queued Write:         ' + characteristic.properties.reliableWrite);
        console.log('> Writable Auxiliaries: ' + characteristic.properties.writableAuxiliaries);

        characteristic.startNotifications()
        .then(() => 
        {
            console.log('Notification started');
            characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
        });
    })
    .catch(error =>
    {
        console.log('Argh! ' + error);
    });
});
  
disconnectButton.addEventListener('click', () => 
{

});


function handleCharacteristicValueChanged(event)
{
    let value = new TextDecoder().decode(event.target.value);
    //console.log(value);

    let data = value.split("\n",2);


    data.forEach(dataInfo => {
        let info = dataInfo.split(":");
        if(info[0]==="US")
        {
            labelUS.innerHTML = info[1];
        }
    
        if(info[0]==="DC")
        {
            labelDC.innerHTML = info[1];
        }
    });


}