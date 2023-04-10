"uses strict";
cfg.Light, cfg.MUI;
app.SetNavBarColor("#D32F2F");
app.SetStatusBarColor("#D32F2F" );
app.SetAutoBoot("Service");


document.addEventListener("DOMContentLoaded", (event)=>{
    var service = app.CreateService( "this", "this", function(event){
         app.Debug( this );
    });
    service.SetOnMessage(function(msg){
        app.ShowPopup( msg );
    });
    
    const windowManager = new WindowManager();
    const logged = localStorage.getItem("logged");

    setTimeout(()=>{
        flash.style.display = "none";
        if (!logged) {

        const sgn = new SignView(document.body);
        
    }else if (logged) {
        const settings = new SettingsView("#settings",new SettingsModel());
        const accountView = new AccountView("#accountView",new SettingsModel())
        const contacts = new ContactsView("contacts",new ContactsModel());
        const msg = new MessageView("messages");
        const editContactView = new EditContactView({},1);
    }
    }
    , 3000);

    

    

    windowManager.gotoPage(home, home);
    const pageSwitches = document.querySelectorAll(".page-switch")
    pageSwitches.forEach((pageSwitch)=>{

        pageSwitch.addEventListener("click", (switchEvent)=>{

            switch (pageSwitch.attributes.page.value) {

            case "home":
                windowManager.gotoPage(home, null);
                break

            case "contacts":
                windowManager.gotoPage(contacts, home);
                break

            case "messages":
                windowManager.gotoPage(messages, home);
                break

            case "settings":
                windowManager.gotoPage($("#settings"), home);
                break

            case "about":
                windowManager.gotoPage(about, home);
                break

            }
        }
        );

    }
    );

}
);

function WindowManager() {

    this.history = [];
    this.pages = document.querySelectorAll(".page");
    this.currentPage = null;

    this.closeAllPages = function() {
        this.pages.forEach(function(page) {
            page.style.display = "none";
            //console.log(page);
        })
    }

    this.gotoPage = function(pageToGo, pageToGoFrom) {

        this.closeAllPages()

        if (pageToGo.id == "home") {
            this.history = [];
            home.style.display = "block";

        } else {
            this.history.shift(pageToGoFrom);
            pageToGo.style.display = "block";
            pageToGoFrom.style.display = "none"
        }

        return;

    }

    //closeAllPages();

}



function ContactsModel() {

    this.contacts = JSON.parse(localStorage.getItem("userContacts"));

    this.add = function(contact) {
        this.contacts.contacts.push(contact);
        return this.contacts.contacts.length;
    }

    this.update = function(id) {}

    this.getAll = function() {
        return this.contacts.contacts;
    }

    this.get = function(id) {
        return this.contacts.contacts[id];
    }
    
    this.replace = function(id, contact){
        this.contacts.contacts[id] = contact;
    }

    this.save = function() {
        localStorage.setItem("userContacts", JSON.stringify(this.contacts));
    }
11    
    this.init = function(){
        if( this.contacts.version == 0 ){
            const uri = "content://com.android.contacts/data";
        const columns = "display_name,data1";
        const select = "mimetype='vnd.android.cursor.item/phone_v2'";
        const rows = app.QueryContent( uri, columns, select, null, "display_name" );
        
        for( i in rows){
            let contact = {
                    first_name: rows[i].display_name,
                    last_name: "",
                    mobile: rows[i].data1,
                    home_no: "",
                    business_no: "",
                    alternative_no: "",
                    sex: "",
                    date_of_birth:"",
                    address:"",
                    personality: "",
                    loyalty: 0,
                    profession: "",
                    language: ""
                }
                this.add(contact);
                this.contacts.version = 1;
                this.save();
        }
        
        }
        
          
    }
    
    this.init();

}

function SettingsModel() {
    settings = JSON.parse(localStorage.getItem("userSettings"));

    this.get = (name)=>settings[name];
    this.set = (name,value)=>settings[name] = value;
    this.save = ()=>localStorage.setItem("userSettings", JSON.stringify(settings))
}

app.SetAutoBoot("Service" );