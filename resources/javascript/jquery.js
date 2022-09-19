//Hides the school menu by use of jQuery.
function menu()
{
        $("#drop-down").children("ul").hide();


        $("#drop-down").hover(function(){
                $("#drop-down").children("ul").show();
        },function(){
                $("#drop-down").children("ul").hide();
        });
}

if(window.addEventListener)
{
        window.addEventListener("load",menu,false);
}
else if(window.attachEvent)
{
        window.attachEvent("onload",menu,false);
}

