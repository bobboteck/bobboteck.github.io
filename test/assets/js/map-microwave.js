/*
    //const { locatorToLatLng, distance, bearingDistance, latLngToLocator } = require('qth-locator');
    console.log(locatorToLatLng('IO91wm')); // [51.521, -0.125]
    console.log(distance('IO91wm', 'KP20le')); // 1821.5 km
    console.log(bearingDistance('FN20qr', 'KP21ol')); // 6586.72 km, 49.16 degrees
    console.log(latLngToLocator(60.179, 24.945)); // KP21le
*/
// Define global object
const iconRed = L.icon({ iconUrl: 'assets/images/red-marker.png', iconSize: [26,41], iconAnchor: [12,40], popupAnchor: [0,-30] });
let myStation = {};
let stationsData = {};
// Init map object
let map = L.map('map').setView([41.912, 13.330], 6);
// Define map parameters
let mwMap = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', 
{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 10,
    ext: 'png'
}).addTo(map);
// Load intial data
onLoadStationsData();

//#region CTA function

function onLoadStationsData()
{
    //let _stationsData;

    if(window.location.protocol === "file:")
    {
        stationsData =
        [
            {
                "callsign": "IW3HWT",
                "name": "Giuseppe (Beppe)",
                "locator": "JN55VT",
                "f1200": {
                    "antenna": "Direttiva, Parabola",
                    "power": "1 - 50 Watt"
                },
                "f2300": {
                    "antenna": "Direttiva, Parabola",
                    "power": "1 - 50 Watt"
                },
                "f5700": "",
                "f10000": {
                    "antenna": "Parabola",
                    "power": "1 - 10 Watt"
                },
                "f24000": "",
                "f47000": "",
                "f76000": "",
                "f122000": ""
            },
            {
                "callsign": "IW3HWT2",
                "name": "Duplicato",
                "locator": "JN55VT",
                "f1200": {
                    "antenna": "Direttiva, Parabola",
                    "power": "1 - 50 Watt"
                },
                "f2300": "",
                "f5700": "",
                "f10000": "",
                "f24000": "",
                "f47000": "",
                "f76000": "",
                "f122000": ""
            },
            {
                "callsign": "IU0PHY",
                "name": "Roberto",
                "locator": "JN61GW",
                "f1200": "",
                "f2300": "",
                "f5700": "",
                "f10000": "",
                "f24000": "",
                "f47000": "",
                "f76000": "",
                "f122000": ""
            },
            {
                "callsign": "IK3GHY",
                "name": "Giorgio",
                "locator": "JN65DM",
                "f1200": "",
                "f2300": "",
                "f5700": {
                    "antenna": "Parabola",
                    "power": "1 - 50 Watt"
                },
                "f10000": {
                    "antenna": "Parabola",
                    "power": "20  - 50 Watt"
                },
                "f24000": {
                    "antenna": "Parabola",
                    "power": "1 - 5 Watt"
                },
                "f47000": "",
                "f76000": "",
                "f122000": ""
            },
            {
                "callsign": "IZ6BMP",
                "name": "Ottorino",
                "locator": "JN72AG",
                "f1200": "",
                "f2300": "",
                "f5700": "",
                "f10000": "",
                "f24000": "",
                "f47000": "",
                "f76000": "",
                "f122000": ""
            },
            {
                "callsign": "IK0WMJ",
                "name": "GIANNI",
                "locator": "JN61GW",
                "f1200": "",
                "f2300": "",
                "f5700": "",
                "f10000": "",
                "f24000": "",
                "f47000": "",
                "f76000": "",
                "f122000": ""
            }
        ];

        DrawDataOnMap(stationsData, myStation);
    }
    else
    {
        fetch("./data-microwave.json")
        .then(response => 
        {
            return response.json();
        })
        .then(jsonData =>
        {
            stationsData =  jsonData;
            DrawDataOnMap(stationsData, myStation);
        });
    }

    //return _stationsData;
}

function onCLickApplyFilter()
{
    let jsonDataFiltered = stationsData;
    console.log("PRIMA: ", jsonDataFiltered);

    jsonDataFiltered = FilterData(stationsData, QueryFilter());

    console.log("DOPO: ", jsonDataFiltered);

    DrawDataOnMap(jsonDataFiltered);
}

function onClickResetFilter()
{
    
}

function onClickSetMyLocator()
{
    const _userCallsign = document.getElementById("userCallsign").value;
    const _userLocator = document.getElementById("userLocator").value;

    myStation = { "callSign": _userCallsign, "locator": _userLocator };

    DrawDataOnMap(stationsData, myStation);
}

//#endregion



function QueryFilter()
{
    const query = [];

    if(document.getElementById("FrequencyFilter1200").checked)
    {
        query.push("f1200");
    }

    if(document.getElementById("FrequencyFilter2300").checked)
    {
        query.push("f2300");
    }

    if(document.getElementById("FrequencyFilter5700").checked)
    {
        query.push("f5700");
    }

    if(document.getElementById("FrequencyFilter10000").checked)
    {
        query.push("f10000");
    }

    if(document.getElementById("FrequencyFilter24000").checked)
    {
        query.push("f24000");
    }

    if(document.getElementById("FrequencyFilter47000").checked)
    {
        query.push("f47000");
    }

    if(document.getElementById("FrequencyFilter76000").checked)
    {
        query.push("f76000");
    }

    if(document.getElementById("FrequencyFilter122000").checked)
    {
        query.push("f122000");
    }

    return query;
}

function FilterData(dataToFilter, query)
{
    const filteredData = dataToFilter.filter((item) => 
    {
        for (let key in query)
        {
            if (item[query[key]] !== undefined && item[query[key]].antenna !== undefined)
            {
                return true;
            }
        }

        return false;
    });

    return filteredData;
}

function OrderData(dataToOrder)
{
    let dataOrdered = dataToOrder.sort((a, b) => 
    {
        if (a.locator < b.locator)
        {
          return -1;
        }
    });

    return dataOrdered;
}

function DrawDataOnMap(data)
{
    map.eachLayer((layer) =>
    {
        if (layer instanceof L.Marker)
        {
            layer.remove();
        }
    });

    let orderData = OrderData(data);
    let popUpInfo = "";

    for(i=0;i<orderData.length;i++)
    {
        try
        {
            if(i < (orderData.length - 1) && orderData[i].locator === orderData[i+1].locator)
            {
                console.log(orderData[i].callsign + " has same locator of " + orderData[i+1].callsign + "[" + orderData[i].locator + "]");
                popUpInfo += StationPopupData(orderData[i]);
            }
            else
            {
                //L.marker(locatorToLatLng(orderData[i].locator)).addTo(map).bindPopup(StationPopup(orderData[i]));
                popUpInfo += StationPopupData(orderData[i]);
                let stationCoordinates = GetStationLocator(orderData[i].locator);
                L.marker(stationCoordinates).addTo(map).bindPopup(LocatorPopupData(orderData[i]) + popUpInfo);
                popUpInfo = "";
            }
        }
        catch
        {
            console.error("Il locatore di " + orderData[i].callsign + " non è un locatore valido [" + orderData[i].locator + "]");
        }
    }

    if(myStation.locator !== undefined)
    {
        try
        {
            L.marker(locatorToLatLng(myStation.locator), {icon: iconRed}).addTo(map).bindPopup(myStation.callSign);
        }
        catch
        {
            alert("Il locatore indicato non è nel formato corretto, inserirlo nel formato corretto e salvare di nuovo");
        }
    }
}

function LocatorPopupData(stationData)
{
    let stationView = "<b>" + stationData.locator.substring(0,6) + "</b>";

    if(myStation !== undefined && myStation.locator !== undefined && myStation.locator !== "")
    {
        const fromMy = bearingDistance(myStation.locator, stationData.locator);
        stationView += "<br />Distance: <b>" + parseInt(fromMy.km) + " Km</b><br />Direction: <b>" + parseInt(fromMy.deg) + "°</b>";
    }

    stationView += "<hr />";

    return stationView;
}

function StationPopupData(stationData)
{
    // let stationView = "<b>" + stationData.locator.substring(0,6) + "</b>";

    // if(myStation !== undefined && myStation.locator !== undefined && myStation.locator !== "")
    // {
    //     const fromMy = bearingDistance(myStation.locator, stationData.locator);
    //     stationView += "<br />Distance: <b>" + parseInt(fromMy.km) + " Km</b><br />Direction: <b>" + parseInt(fromMy.deg) + "°</b>";
    // }

    let stationView = "<label class=\"callSign\">" + stationData.callsign + "</label>";

    stationView += "<table class=\"table table-striped\"><tr><th>Freq</th><th>Antenna</th><th>Power</th></tr>";

    if(stationData.f1200 !== "")
    {
        stationView += "<tr><td>1.2 GHz</td><td>" + stationData.f1200.antenna + "</td><td>" + stationData.f1200.power + "</td></tr>"
    }

    if(stationData.f2300 !== "")
    {
        stationView += "<tr><td>2.3 GHz</td><td>" + stationData.f2300.antenna + "</td><td>" + stationData.f2300.power + "</td></tr>"
    }

    if(stationData.f5700 !== "")
    {
        stationView += "<tr><td>5.7 GHz</td><td>" + stationData.f5700.antenna + "</td><td>" + stationData.f5700.power + "</td></tr>"
    }

    if(stationData.f5700 !== "")
    {
        stationView += "<tr><td>5.7 GHz</td><td>" + stationData.f5700.antenna + "</td><td>" + stationData.f5700.power + "</td></tr>"
    }

    if(stationData.f10000 !== "")
    {
        stationView += "<tr><td>10 GHz</td><td>" + stationData.f10000.antenna + "</td><td>" + stationData.f10000.power + "</td></tr>"
    }

    if(stationData.f24000 !== "")
    {
        stationView += "<tr><td>24 GHz</td><td>" + stationData.f24000.antenna + "</td><td>" + stationData.f24000.power + "</td></tr>"
    }

    if(stationData.f47000 !== "")
    {
        stationView += "<tr><td>47 GHz</td><td>" + stationData.f47000.antenna + "</td><td>" + stationData.f47000.power + "</td></tr>"
    }

    if(stationData.f76000 !== "")
    {
        stationView += "<tr><td>76 GHz</td><td>" + stationData.f76000.antenna + "</td><td>" + stationData.f76000.power + "</td></tr>"
    }

    if(stationData.f122000 !== "")
    {
        stationView += "<tr><td>122 GHz</td><td>" + stationData.f122000.antenna + "</td><td>" + stationData.f122000.power + "</td></tr>"
    }

    stationView += "</table>"

    return stationView;
}

function GetStationLocator(locator)
{
    let coordinates = [];

    try
    {
        coordinates = locatorToLatLng(locator);
    }
    catch
    {
        console.error("Il locatore di " + orderData[i].callsign + " non è un locatore valido [" + orderData[i].locator + "]");
    }

    return coordinates;
}


function StationPopupOLD(stationData)
{
    let stationView = "<b>" + stationData.callsign + "</b><br />" + stationData.locator + "<br />";

    if(myStation !== undefined && myStation.locator !== undefined && myStation.locator !== "")
    {
        const fromMy = bearingDistance(myStation.locator, stationData.locator);
        stationView += "<hr /><b>Distance:</b> " + parseInt(fromMy.km) + " Km<br /><b>Direction:</b> " + parseInt(fromMy.deg) + "°";
    }

    stationView += "<table><tr><th>Freq</th><th>Antenna</th><th>Power</th></tr>";

    if(stationData.f1200 !== "")
    {
        stationView += "<tr><td>1.2 GHz</td><td>" + stationData.f1200.antenna + "</td><td>" + stationData.f1200.power + "</td></tr>"
    }

    if(stationData.f2300 !== "")
    {
        stationView += "<tr><td>2.3 GHz</td><td>" + stationData.f2300.antenna + "</td><td>" + stationData.f2300.power + "</td></tr>"
    }

    if(stationData.f5700 !== "")
    {
        stationView += "<tr><td>5.7 GHz</td><td>" + stationData.f5700.antenna + "</td><td>" + stationData.f5700.power + "</td></tr>"
    }

    if(stationData.f5700 !== "")
    {
        stationView += "<tr><td>5.7 GHz</td><td>" + stationData.f5700.antenna + "</td><td>" + stationData.f5700.power + "</td></tr>"
    }

    if(stationData.f10000 !== "")
    {
        stationView += "<tr><td>10 GHz</td><td>" + stationData.f10000.antenna + "</td><td>" + stationData.f10000.power + "</td></tr>"
    }

    if(stationData.f24000 !== "")
    {
        stationView += "<tr><td>24 GHz</td><td>" + stationData.f24000.antenna + "</td><td>" + stationData.f24000.power + "</td></tr>"
    }

    if(stationData.f47000 !== "")
    {
        stationView += "<tr><td>47 GHz</td><td>" + stationData.f47000.antenna + "</td><td>" + stationData.f47000.power + "</td></tr>"
    }

    if(stationData.f76000 !== "")
    {
        stationView += "<tr><td>76 GHz</td><td>" + stationData.f76000.antenna + "</td><td>" + stationData.f76000.power + "</td></tr>"
    }

    if(stationData.f122000 !== "")
    {
        stationView += "<tr><td>122 GHz</td><td>" + stationData.f122000.antenna + "</td><td>" + stationData.f122000.power + "</td></tr>"
    }

    stationView += "</table>"

    return stationView;
}
