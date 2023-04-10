function MessageView(el) {
    this.recipients = [];
    this.message = "";
    

    this.setRecipient = ()=>{}

    this.send = ()=>{}

    this.view = ()=>{
        const view = document.getElementById(el);
        const editorView = document.createElement("div");
        editorView.className = "";
        const templete = `<header class="bar top padding-8 color-theme">
          <span>Messages</span>
        </header>
        <form id="form" class="padding-8 margin-64">
                   <label>Recipients:</label>
                   <input id="recipients" type="text" class="input" required placeholder="07067864576"/>
                   <label>Message:</label>
                    <textarea name="msg" id="msg" class="input" placeholder="Type message here..." maxlength="159" minlength="1"></textarea>
                    <div class="row">
                        <button name="send" id="send" class="btn color-theme w3-padding round col margin">Send</button>
                        <button id="schedule" disable class="btn color-theme hide round col w3-padding margin">Send Later</button>
                    </div></form>`;
        editorView.innerHTML = templete;
        view.appendChild(editorView);

        editorView.querySelector("#recipients").addEventListener("click", event=>{
            this.recipients = [];
            const recipientsView = document.createElement("div");
            recipientsView.className = "w3-animate-zoom";
   
    
            

            let contacts = new ContactsModel();

            let templete = `<header class="top bar color-theme padding-8"><span id="back">Back</span><span id="okay" style="float:right">Okay</span></header>
            <ul class="list w3-padding-16">`;

            contacts.getAll().forEach((contact,id)=>{

                templete += `<li id="${id}" class="list-item row" mobile="${contact.mobile}">
                <input class=" check w3-margin" type="checkbox"/>
                <div><b>${contact.first_name + " " + contact.last_name}</b><br><i>${contact.mobile}</i></div>
                </li>`;
            }
            )

            templete += `</ul>`;

            recipientsView.innerHTML = templete;
            editorView.style.display = "none";
            view.appendChild(recipientsView);

            recipientsView.querySelectorAll(".list-item").forEach(item=>{
                item.addEventListener("click", event=>{
                    //event.preventDefault();

                    const checkbox = item.querySelector(".check");
                    checkbox.checked ? checkbox.checked = false : checkbox.checked = true;

                    if (checkbox.checked) {
                        this.recipients.push(item.attributes.mobile.value);
                    } else {
                        const index = this.recipients.indexOf(item.attributes.mobile.value);
                        delete this.recipients[index];
                        this.recipients = this.recipients.flat();

                    }

                }
                , true)
            }
            );

            recipientsView.querySelector("#back").addEventListener("click", event=>{
                view.removeChild(recipientsView);
                this.view();
            }
            );

            recipientsView.querySelector("#okay").addEventListener("click", event=>{
                editorView.querySelector("#recipients").value = this.recipients.toString();
                editorView.style.display = "block";
                view.removeChild(recipientsView);
                //
            }
            )
            //

        }
        )

        editorView.querySelector("#form").addEventListener("submit", event=>{
            event.preventDefault();
            app.ShowProgress("Sending sms..." )
            editorView.querySelector("#send").disabled = true;
            this.message = event.target.msg.value;
            const settings = new SettingsModel();
            let sender_id = settings.get("sender_id");
            const user_id = settings.get("phone_number");
            const count = this.recipients.length;
            if(sender_id == "") sender_id == "VictoryTech";
            /*if(count*3 > settings.get("balance")){
               app.Alert("Low balance! Buy more units please");
            }*/
            const params = `action=send_sms|sender_id=${sender_id}|recipients=${this.recipients}|user_id=${user_id}|count=${count}|msg=${this.message}`;
            
            app.HttpRequest( "POST", "http://texter.victorytech.com.ng", "/api/index.php", params, function(error, response, status){
                
                if( status == "200"){
                 if(response == "OK"){
                     CreateAlert( "Message sent!" )
                 }else if(response=="low balance"){
                   CreateAlert( "Low balance. Please buy more units" );
                 }else{
                   CreateAlert( "Sorry! System under mantainance" )
                 }
                }else{
                  CreateAlert( "Network error!" )
                }
                app.HideProgress();
                editorView.querySelector("#send").disabled = false;
            });
        }
        );

    }

    this.view();
}