"use strict"

//GLOABL function
var monthArray = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

var dateObject = new Date();


//Loads calendar data into a html table to create a HTML calendar.
function displayCalendar(whichMonth)
{
        var date;
        var dateToday = new Date();
        var dayOfWeek;
        var daysInMonth;
        var dateCells;
        var captionValue;
        var month;
        var year;

        if(whichMonth === 1 && (dateObject.getFullYear() > 2021 || dateObject.getMonth() !== 1))
        {

        }
        else if (whichMonth === -1 && (dateObject.getFullYear() > 2021 || dateObject.getMonth() !== 1))
        {
                dateObject.setMonth(dateObject.getMonth() - 2);
        }

        month = dateObject.getMonth();
        year = dateObject.getFullYear();
        dateObject.setDate(1);
        dayOfWeek = dateObject.getDay();
        captionValue = monthArray[month] + " " + year;

        document.querySelector("#cal table caption").innerHTML = captionValue; 

        //Determines the days of each month.
        if( month === 0 || month === 2 || month === 4 || month === 6 ||
                month === 7 || month === 9 || month === 11)
        {
                        daysInMonth = 31;
        }
        else if(month === 1)
        {
                if(isLeapYear(year))
                {
                        daysInMonth = 29;
                }
                else
                {
                        daysInMonth = 28;
                }
        }
        else
        {
                daysInMonth = 30;
        }

        
        dateCells = document.getElementsByTagName("td");
        for( var i = 0; i < dateCells.length; i++)
        {
                dateCells[i].innerHTML = "";
                dateCells[i].className = "";
        }
        //Adds days to the calendar.
        for(var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++)
        {
                dateCells[i].innerHTML = dateObject.getDate();
                dateCells[i].className = "date";
                if(dateToday < dateObject)
                {
                        dateCells[i].className = "futuredate";
                }
                date = dateObject.getDate() + 1;
                dateObject.setDate(date);
        }
}
function getNumOfDays(month)
{
        if( month === 0 || month === 2 || month === 4 || month === 6 ||
                month === 7 || month === 9 || month === 11)
        {
                        return 31;
        }
        else if(month === 1)
        {
                if(isLeapYear(year))
                {
                        return 29;
                }
                else
                {
                        return 28;
                }
        }
        else
        {
                return 30;
        }
}
function isLeapYear(year)
{
        if(year % 4 === 0)
        {
                if(year % 100 === 0)
                {
                        if(year % 400 === 0)
                        {
                                return true;
                        }
                        else
                        {
                                return false;
                        }
                }
                else
                {
                        return true;
                }
        }
        else
        {
                return false;
        }

}

//Moves the calendar forward by one month.
function next()
{
        displayCalendar(1);
}
//Moves the calendar backwards by one month.
function previous()
{
        displayCalendar(-1);
}
function createEventListerners()
{
        displayCalendar(1);
        
        var prev_month = document.getElementById("prev");
        var next_month = document.getElementById("next");

        prev_month.addEventListener('click',previous,false);
        next_month.addEventListener('click',next,false);
}
//Creates the calendar event listerners
if(window.addEventListener)
{
        window.addEventListener("load",createEventListerners,false);
}
else if(window.attachEvent)
{
        window.attachEvent("onload",createEventListerners,false);
}


