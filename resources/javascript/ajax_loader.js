//FUnction to load the school times ajax data into the article section of the page.
function showSchoolTimes()
{
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200)
                {
                        document.getElementById("article").innerHTML = this.responseText;
                }
        };
        httpRequest.open("GET","resources/ajax/school_times.txt",true);
        httpRequest.send();
}
//Function that loads the txt ajax data for the Why this school? into the article section.
function showReasons()
{
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200)
                {
                        document.getElementById("article").innerHTML = this.responseText;
                }
        };
        httpRequest.open("GET","resources/ajax/why_this_school.txt",true);
        httpRequest.send();
}

//Loads the school fees data into the article section.
function showSchoolFees()
{
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200)
                {
                        document.getElementById("article").innerHTML = this.responseText;
                }
        };
        httpRequest.open("GET","resources/ajax/school_fees.txt",true);
        httpRequest.send();
}
//Loads the school history data into the article section of the page.
function showSchoolHistory()
{
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200)
                {
                        document.getElementById("article").innerHTML = this.responseText;
                }
        };
        httpRequest.open("GET","resources/ajax/school_history.txt",true);
        httpRequest.send();
}

//Converts the staff record into html and loads it into the article section of the page.
function loadStaffRecord()
{
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200)
                {
                        parseStaffList(this);
                }
        };
        httpRequest.open("GET","resources/xml/staff.xml",true);
        httpRequest.send();
}
//Processes the XML list.
function parseStaffList(xml_list)
{
        var i;
        var xmlDocument = xml_list.responseXML;
        var table = "<h2>Staff</h2>";
        table += "<table><tr><th>Title</th><th>Initials</th><th>Surname</th><th>Position</th></tr>";
        var members = xmlDocument.getElementsByTagName("MEMBER");
        console.log(members.length);
        for(i = 0; i < members.length; i++)
        {
                table += "<tr><td>"+ members[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue + "</td><td>" +
                members[i].getElementsByTagName("INITIAL")[0].childNodes[0].nodeValue + "</td><td>" +
                members[i].getElementsByTagName("SURNAME")[0].childNodes[0].nodeValue + "</td><td>" +
                members[i].getElementsByTagName("POSITION")[0].childNodes[0].nodeValue + "</td></tr>";
        }
        table += "</table>"
        document.getElementById("article").innerHTML = table;

        
}
//Function to create event listerners.
if(window.addEventListener && document.title === "Home Page")
{
        window.addEventListener("load",showSchoolHistory,false);
}
else if(window.attachEvent)
{
        window.attachEvent("onload",showSchoolHistory,false);
}