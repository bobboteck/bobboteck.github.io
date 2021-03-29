const serviceUuid = document.querySelector('#service')
const characteristicUuid = document.querySelector('#characteristic')

const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');

const labelUS = document.getElementById('usValue');
const labelUSMin = document.getElementById('usValueMin');
const labelUSMax = document.getElementById('usValueMax');

const labelDC = document.getElementById('dcValue');
const labelDCMin = document.getElementById('dcValueMin');
const labelDCMax = document.getElementById('dcValueMax');

let btDevice = null;

let usData = { value:0, min:300, max:0 };
let dcData = { value:0, min:2500, max:0 };

let chartData = [0];    //[20, 10, 5, 2, 20, 30, 100];
let chartLabels = ['0'];    //['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

for(let i=1;i<51;i++)
{
    chartLabels.push(i.toString());
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, 
{
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data:
    {
        labels: chartLabels,
        datasets: 
        [
            {
                label: 'US Meter',
                //backgroundColor: 'rgb(0, 99, 132)',
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                lineTension: 0.1,
                data: chartData //[0, 10, 5, 2, 20, 30, 100]
            }
        ]
    },
    // Configuration options go here
    options: 
    {
        animation:
        {
            duration: 500
        },
        scales: 
        {
            yAxes: 
            [
                {
                    ticks: 
                    {
                        //max: 200,
                        //min: 0,
                        suggestedMin: 0,
                        suggestedMax: 200,
                        stepSize: 1
                    }
                }
            ]
        }
    }
});

connectButton.addEventListener('click', () => 
{
    let valueServiceUuid = serviceUuid.value;
    if (valueServiceUuid.startsWith('0x'))
    {
        valueServiceUuid = parseInt(valueServiceUuid);
    }
  
    let valueCharacteristicUuid = characteristicUuid.value;
    if (valueCharacteristicUuid.startsWith('0x'))
    {
        valueCharacteristicUuid = parseInt(valueCharacteristicUuid);
    }
  
    console.log('Requesting Bluetooth Device...');

    navigator.bluetooth.requestDevice({filters: [{services: [valueServiceUuid]}]})
    .then(device => 
    {
        console.log('Connecting to GATT Server...');
        return device.gatt.connect();
    })
    .then(server => 
    {
        console.log('Getting Service...');
        return server.getPrimaryService(valueServiceUuid);
    })
    .then(service =>
    {
        console.log('Getting Characteristic...');
        return service.getCharacteristic(valueCharacteristicUuid);
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

        btDevice = characteristic.service.device;

        characteristic.startNotifications()
        .then(() => 
        {
            console.log('Notification started');
            characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);

            connectButton.disabled = true;
            disconnectButton.disabled = false;
            serviceUuid.disabled = true;
            characteristicUuid.disabled = true;
        });
    })
    .catch(error =>
    {
        console.log('Argh! ' + error);
    });
});
  
disconnectButton.addEventListener('click', () => 
{
    if(btDevice)
    {
        // Add code to remove this handle?

        if(btDevice.gatt.connected)
        {
            btDevice.gatt.disconnect();
            
            connectButton.disabled = false;
            disconnectButton.disabled = true;
            serviceUuid.disabled = false;
            characteristicUuid.disabled = false;

            console.log("Disconnected");
        }
        else
        {
            console.log("Already disconnected");
        }
    }
});

var joy = new JoyStick('joyDiv');

function handleCharacteristicValueChanged(event)
{
    let value = new TextDecoder().decode(event.target.value);
    //console.log(value);

    let data = value.split("\n",2);

    data.forEach(dataInfo => 
    {
        let info = dataInfo.split(":");
        if(info[0]==="US")
        {
            usData.value = parseInt(info[1]);
            usData.min = usData.min > usData.value ? usData.value : usData.min;
            usData.max = usData.max < usData.value ? usData.value : usData.max;
        }
    
        if(info[0]==="DC")
        {
            dcData.value = parseInt(info[1]);
            dcData.min = dcData.min > dcData.value ? dcData.value : dcData.min;
            dcData.max = dcData.max < dcData.value ? dcData.value : dcData.max;
        }
    });

    labelUS.value = usData.value;
    labelUSMin.value = usData.min;
    labelUSMax.value = usData.max;

    labelDC.value = dcData.value;
    labelDCMin.value = dcData.min;
    labelDCMax.value = dcData.max;


    chart.data.datasets[0].data.push(usData.value);

    if(chart.data.datasets[0].data.length>51)
    {
        chart.data.datasets[0].data.shift();
    }

    chart.update();
}