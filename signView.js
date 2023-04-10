function SignView(el) {

    this.view = ()=>{
        const formView = document.createElement("div");
        formView.className = "modal white padding"
        const templete = `<div style="" class="modal-item w3-padding">
            <img class="w3-image" src="Img/Texter.png">
            <form class="w3-animate-bottom" id="enter_form">
                <p class="w3-small">Enter your real phone number to join</p>
                <label class="">Phone Number:</label>
                <input type="tel" id="phone_number" class="w3-input w3-padding-16" max="11" minlength="11" maxlength="11" required pattern="^0[7-9][0-1][1-8][0-9]{7}$">
                <button id="enter_btn" class="w3-btn btn-bar w3-margin-top color-theme w3-shadow round w3-padding-16" >Enter</button>
              </form>
              <form class="w3-animate-bottom hide"  id="confirmation_form">
                <label class="">Code:</label><br>
                <span id="error"></span>
                <input type="text" id="confirmation_code" class="w3-input w3-padding-16 round" max="6" minlenght="6" maxlength="6" required pattern="[0-9]{6}">
                <button id="confirm_btn" class="w3-btn btn-bar w3-margin-top color-theme w3-shadow round w3-padding-16" >Confirm</button>
              </form>
        </div>`;

        formView.innerHTML = templete;
        el.appendChild(formView);

        formView.querySelector("#enter_form").addEventListener("submit", event=>{
            event.preventDefault();
            app.ShowProgress( "Proccessing..." );
            $("#enter_btn").desabled = true;
            const phoneNumber = event.target.phone_number.value;
            
            //sign(phoneNumber);
            
        const userContacts = {
          version: 0,
          last_update: new Date(),
          contacts: []
    }

      const userSettings = {
        name: "",
        sender_id: "VictoryTech",
        phone_number: phoneNumber,
        balance: 100,

    }
    
     let params = `action=sign|phone_number=${phoneNumber}`;
    app.HttpRequest("POST","http://texter.victorytech.com.ng", "/api/", params, function(error, response, status){
      
      if(!error & status == "200"){
      
        
         if(response == "OK"){
             $("#enter_form").hide()
             app.HideProgress();
             $("#confirmation_form").show();
             $("#confirmation_form").on("submit", event=>{
                 event.preventDefault();
                 app.ShowProgress( "Proccessing..."  );
                 
                 
                 const code = event.target.confirmation_code.value;
                 params = `action=confirm|phone_number=${phoneNumber}|confirmation_code=${code}`;
                 app.HttpRequest( "POST", "http://texter.victorytech.com.ng", "/api/", params, function(error, response, status){
                     app.HideProgress()
                     if(status == "200"){
                        if(response == "OK"){
                            localStorage.setItem("userContacts", JSON.stringify(userContacts));
                            localStorage.setItem("userSettings", JSON.stringify(userSettings));
                            localStorage.setItem("logged",true);
                            location.reload();
                        }else if(response == "NO"){
                            $("#error").innerHTML = "Invalid Confirmation Code";
                            CreateAlert("Invalid Confirmation Code");
                            
                        }else{
                           CreateAlert( "Cant confirm you. Try again!" );
                        }
                     }
                 } );
             })
             
         }else{
           CreateAlert( "Cant sign you. Try again later! ");
         }
      }else{
        CreateAlert("Cant connect! ");
      }
      app.HideProgress();
    });
        }
        );

        formView.addEventListener("change", event=>{
            console.log(event)
        }
        )
    }

    /**/
    this.view();
}