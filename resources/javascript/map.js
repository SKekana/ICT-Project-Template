//Initialised the map that is displayed in the article section of the location page.
function mapInit()
{
        var school_latitude = -34.06653483228497;
        var school_longitude = 18.857442943361388;
        var school_location = {school_latitude,school_longitude};
        var mapOptions = {zoom: 12, center: school_location};
        var map = new google.maps.Map(document.getElementById("map"),mapOptions);
}

function loadMap()
{
        var mapElement = document.getElementById("map");
        
        if(navigator.onLine)
        {
                mapElement.innerHTML = ""//Iframe from Google Maps.
        }
        else
        {
                var map = new google.maps.Map(document.getElementById("map"),mapOptions);
        }
}
if(window.addEventListener)
{
        window.addEventListener("load",loadMap,false);
}
else if(window.attachEvent)
{
        window.attachEvent("onload",loadMap,false);
}