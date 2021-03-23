const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');




connectButton.addEventListener('click', () => 
{
    navigator.bluetooth.requestDevice({filters: [{Services: [0xFFE0]}]})
    .then(device => { console.log(device) })
    .catch(error => { console.log(error); });
});
  
disconnectButton.addEventListener('click', () => 
{

});