//GLOBAL variables

//Extras array for the extra-curricular activities for the school.
var extras = [
        "Athletics",
        "Chess",
        "Cricket",
        "Cycling",
        "Golf",
        "Hockey",
        "Netball",
        "Rugby",
        "Squash",
        "Swimming",
        "Tennis",
        "X-country"
];
//Array for the months of the year.
var months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
];

formValidity = true;
var userProfile;
var jsonString;

class Profile {
        constructor(email,username,password) {
                this.email = email;
                this.username = username;
                this.password = password;
        }
}

var length_of_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


//Validates the data for the form. It the data is incorrect/invalid, it displays an error messege, if the
//data is valid it processes the form.
function validateForm()
{
        formValidity = true;
        var article = document.getElementById("article");
        
        validateInput("account_details");
        validateInput("personal_info");
        validateExtras();
        validateContactInfo();
        validateAccountInfo();

        console.log(formValidity);

        if(formValidity === true)
        {
                createCookies();
                makeProfile();
                
                document.getElementById("error").innerHTML = "";
                document.getElementById("error").style.display = "none";
                

                document.getElementsByTagName("form")[0].submit();
        }
        else
        {
                document.getElementById("error").innerHTML = "Please rectify the errors indicated in your request and resubmit.";
                document.getElementById("error").style.display = "block";
                scroll(0,0);
        }
}
//Makes a profile object using the users data.
function makeProfile()
{
        var userName = document.getElementById("user_name");
        var userPassword = document.getElementById("user_password");
        var emailAddress =  document.getElementById("email_address");


        userProfile = new Profile(emailAddress.value,userName.value,userPassword.value);

        jsonString = JSON.stringify(userProfile);
}

//Checks if all the input elements in the field set are not empty.
function validateInput(fieldsetId)
{
        var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
        var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
        var fieldsetValidity = true;
        var elementCount = inputElements.length;
        var currentElement;
        try
        {
                for(var i = 0; i < elementCount; i++)
                {
                        currentElement = inputElements[i];
                        if(currentElement.value === "" && currentElement.name !== "complex_address")
                        {
                                currentElement.style.background = "rgb(255,233,233)";
                                fieldsetValidity = false;
                        }
                        else
                        {
                                currentElement.style.background = "white";
                        }
                }
                if(fieldsetValidity === false)
                {
                        throw "Please fill in all details."
                }
                else
                {
                        errorDiv.style.display = "none";
                        errorDiv.innerHTML = "";
                }
        }
        catch(message)
        {
                errorDiv.style.display = "block";
                errorDiv.innerHTML = message;
                formValidity = false;
        }
}
//Validates the 5 extras have been selected.
function validateExtras()
{
        var errorDiv = document.querySelector("#extra_curr .errorMessage");
        var fieldsetValidity = true;
        var no_of_activities = 0;
        var extra_currs = document.getElementsByName("extra[]");
        
        errorDiv.innerHTML = "";
        try
        {
                for(var i = 0; i < extra_currs.length; i++)
                {
                        if(extra_currs[i].checked === true)
                        {
                                no_of_activities++;
                        }
                }
                if(no_of_activities < 5)
                {
                        throw "Please select at least 5 extra-curricular activities."; 
                }
        }
        catch(message)
        {
                fieldsetValidity = false;
                errorDiv.innerHTML = message;
                formValidity = false;
        }
}
//Convers the extras array into a string and loads it into the form.
function loadExtrasArray()
{
        var activities = document.getElementById("extra_curricular");
        var html = "";
        for(var i = 0; i < extras.length; i++)
        {
                html += "<li><input type=\"checkbox\" name = \"extra[]\" value = \"" + extras[i] + "\" id=\"" + extras[i].toLowerCase() + "\"><label class=\"e_mural\" for=\"" + extras[i].toLowerCase() + "\">" + extras[i] + "</label></li>";
        }
        activities.innerHTML = html;
}
//Validates the contact of the user
function validateContactInfo()
{
        var phonenumElement = document.getElementById("phone_number");
        var emailElement = document.getElementById("email_address");
        var errorDiv = document.querySelectorAll("#contact .errorMessage")[0];
        var isEmailValid = true;
        var isPhoneNumValid = true;
        var errorMess = "";

        phonenumElement.value = phonenumElement.value.trim();
        emailElement.style.background = "white";
        phonenumElement.style.background = "white";
        errorDiv.innerHTML = "";
        try
        {
                
                if(phonenumElement.value === "" && emailElement.value === "")
                {
                        isEmailValid = false;
                        isPhoneNumValid = false;
                        errorMess += "Please enter your contact details in all the fields. ";
                }
                else
                {
                        
                        if(/.{10,}/.test(phonenumElement.value) === false)
                        {
                                isPhoneNumValid = false;
                                errorMess += "Phone number entered is invalid. ";
                        }
                       
                        if((/@/.test(emailElement.value) === false) || (/\..{2,6}$/.test(emailElement.value) === false))
                        {
                                isEmailValid = false;
                                errorMess += "The email address entered is invalid.";
                        }
                }
                
                if(isEmailValid === false || isPhoneNumValid === false)
                {
                        throw errorMess;
                }
        }
        catch(message)
        {
                errorDiv.innerHTML = message;
                
                if(isEmailValid === false)
                {
                        emailElement.style.background =  "rgb(255,233,233)";
                }
                if(isPhoneNumValid === false)
                {
                        phonenumElement.style.background =  "rgb(255,233,233)";
                }
                formValidity = false;
        }
}
//Validates if the user account infromation is correct.
function validateAccountInfo()
{
        var errorDiv = document.querySelectorAll("#account_details .errorMessage")[0];
        var usernameElement = document.getElementById("user_name");
        var pass1Element = document.getElementById("user_password");
        var pass2Element = document.getElementById("v_user_password");
        var passwordMatch = false;
        var userNameMatch = false;
        var invColor = "rgb(255,233,233)";

        try
        {
                usernameElement.style.background = "";
                pass1Element.style.background = "";
                pass2Element.style.background = "";

                if((usernameElement.value === "" || pass1Element.value === "" || pass2Element.value === ""))
                {
                        passwordMatch = true;
                        userNameMatch = true;
                        throw "Please complete all fields to create an account.";
                }

                if((usernameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== ""))
                {
                        if(pass1Element.value.localeCompare(pass2Element.value))
                        {
                                passwordMatch = true;
                                throw "The passwords entered do not match, please reenter.";
                        }
                        if(/.{5,}/.test(usernameElement.value) === false)
                        {
                                userNameMatch = true
                                throw "The given username entered is too short. Please re-enter.";
                        }
                        if((/.{8,}/.test(pass1Element.value) === false))
                        {
                                passwordMatch = true;
                                throw "The given password entered is too short. Please re-enter.";
                        }
                }
        }
        catch(message)
        {
                errorDiv.innerHTML = message;
                errorDiv.style.display = "block";

                if(passwordMatch)
                {
                        pass1Element.style.background = invColor;
                        pass2Element.style.background = invColor;
                }
                if(userNameMatch)
                {
                        usernameElement.style.background = invColor;
                }

                formValidity = false;
        }
}
//Returns the number of days for each month when the month number is given.
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
//Determines if the given year is a leap year.
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
//Initialises the date input.
function initdateInput()
{
        var dayElement = document.getElementById("day_input");
        var monthElement = document.getElementById("month_input");
        var yearElement = document.getElementById("year_input");
        var html = "";


        var current_Month_Number;
        for(var i = 0; i < months.length; i++)
        {
                if(monthElement === months[i])
                {
                        current_Month_Number = i;
                }
        }
        
 
        for(var i = 0; i < getNumOfDays(current_Month_Number); i++)
        {
                html += "<option value=\"" + (i + 1) + "\">" + (i + 1) + "</option>";
        }
        dayElement.innerHTML = html;

        html = "";

        for(var i = 0; i < months.length; i++)
        {
                html += "<option value\"" + months[i] + "\>" + months[i] + "</option>";
        }
        monthElement.innerHTML = html;
        
        html = "";

        for(var i = 0; i < 10; i++)
        {
                html += "<option value\"20" + (21 + i) + "\>20" + (21 + i) + "</option>";
        }
        yearElement.innerHTML = html;
}


//Updates the date input.
function updateDays()
{
        var dayElement = document.getElementById("day_input");
        var currentMonth = document.getElementById("month_input").value;
        var currentYear = document.getElementById("year_input").value;
        var monthNum;
        for(var i = 0; i < months.length; i++)
        {
                if(currentMonth === months[i])
                {
                        monthNum = i;
                }
        }
        var html = "";

        //Determines if the current year is a leap year.
        if(isLeapYear(parseInt(currentYear)) && monthNum === 1)
        {
                for(var i = 0; i < 29; i++)
                {
                        html += "<option value=\"" + (i + 1) + "\">" + (i + 1) + "</option>";
                }  
        }
        else
        {
                for(var i = 0; i < length_of_months[monthNum]; i++)
                {
                        html += "<option value=\"" + (i + 1) + "\">" + (i + 1) + "</option>";
                }
        }
        dayElement.innerHTML = html;

}


//Creates cookies with the data given by the user.
function createCookies()
{
        var formFields = document.querySelectorAll("input[type=text],input[type=radio],input[type=checkbox],input[type=number],input[type=email]");
        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 7);
        var p_type = document.getElementsByName("payment_type");

        for(var i = 0; i < formFields.length; i++)
        {
                var currentValue = decodeURIComponent(formFields[i].value);
                currentValue = currentValue.replace(/\ + /g," ");
                document.cookie = formFields[i].name + "=" + currentValue + "; expires=" + expiresDate.toUTCString();
        }

        if(p_type[0].checked)
        {
                document.cookie = "payment_type" + "=" + "monthly" + ";expires=" + expiresDate.toUTCString();
        }
        else
        {
                document.cookie = "payment_type" + "=" + "yearly" + ";expires=" + expiresDate.toUTCString();
        }
}
//Clears most of the data from the form.
function clearAllFields()
{
        var formFields = document.querySelectorAll("input[type=text],input[type=radio],input[type=checkbox],input[type=number],input[type=email],input[type=password]");
        var extra_currs = document.getElementsByName("extra[]");
        
        for(var i = 0; i < formFields.length; i++)
        {
                formFields[i].value = "";
        }

        for(var i = 0; i < extra_currs.length; i++)
        {
                extra_currs[i].checked = false;
        }
}
//Deletes the cookie data from the browser storage.
function clearCookies()
{
        var cookieString = document.cookie;
        var cookieArray = cookieString.split("; ");
        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() - 7);

        for(var i = 0; i < cookieArray.length; i++)
        {
                document.cookie = cookieArray[i] + "; expires=" + expiresDate.toUTCString();
        }
}
//Initalises all the events for the form.
function initPage()
{
        initdateInput();
        loadExtrasArray();

        var month = document.getElementById("month_input");
        var year = document.getElementById("year_input");
        var validate = document.getElementById("validate");
        var clear_form = document.getElementById("clear-form");
        var create = document.getElementById("create-cookies");
        var clear_cookies = document.getElementById("clear-cookies");

        month.addEventListener('change',updateDays,false);
        year.addEventListener('change',updateDays,false);

        validate.addEventListener('click',validateForm,false);
        clear_form.addEventListener('click',clearAllFields,false);
        create.addEventListener('click',createCookies,false);
        clear_cookies.addEventListener('click',clearCookies,false);
}
if(window.addEventListener)
{
        window.addEventListener("load",initPage,false);
}
else if(window.attachEvent)
{
        window.attachEvent("onload",initPage,false);
}

