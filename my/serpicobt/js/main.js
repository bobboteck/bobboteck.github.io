const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');


let serviceUuid = parseInt("0xFFE0");


connectButton.addEventListener('click', () => 
{
    navigator.bluetooth.requestDevice({ filters: [ { Services: [ serviceUuid ] } ] })
    .then(device => { console.log(device) })
    .catch(error => { console.log(error); });
});
  
disconnectButton.addEventListener('click', () => 
{

});