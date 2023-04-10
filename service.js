
function OnStart()
{
    setInterval(function(){
        app.SendMessage( "Hello World" );
    
    }, 10*60*1000);
}