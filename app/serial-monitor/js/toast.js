let noSupportToastTime = document.getElementById("noSupportToastTime");
let noSupportToast = document.getElementById("noSupportToast");
let noSupportToastClose = document.getElementById("noSupportToastClose");

if("serial" in navigator)
{

}
else
{
    let currentdate = new Date(); 
    let datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
    noSupportToastTime.innerText = datetime;

    noSupportToast.style.opacity = 1;
}

noSupportToastClose.addEventListener("click", () =>
{
    noSupportToast.style.opacity = 0;
});
