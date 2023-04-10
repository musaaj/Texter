function EditContactView(contact, id){
    const template = `<div class="">
        <header class="top bar color-theme padding-8"><span id="back" class="btn" onClick = "submit(event)">Back</span><button class="btn" form="contact_form" id="okay" style="float:right;">Save</button></header>
            <form id="contact_form" class="margin-64 padding-8">
                  <div class="margin">
                            <label class="">First Name:</label>
                            <input id="first_name" type="text" required class="input">
                   </div>
                        <div class="margin">
                            <label class="">Last Name:</label>
                            <input id="last_name" type="text" class="input">
                        </div>
                        <div class="margin">
                            <label class="">Mobile:</label>
                            <input id="mobile" min="11" type="tel" required pattern="0[7-9][0-1][0-9]{7,}" class="input">
                        </div>
                        <div class="margin">
                            <label class="">Sex:</label>
                            <select id="sex" class="input">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div class="margin">
                            <label class="">Date Of Birth:</label>
                            <input id="date_of_birth" type="date" required class="input">
                        </div>
                        <div class="margin">
                            <label class="">Address:</label>
                            <input id="address" type="text" class="input">
                        </div>
        </form>
    </div>`;
    const el = document.createElement("div");
    el.className = "";
    el.innerHTML = template;
    $(el).$("#contact_form").on("submit", function(event){
        event.preventDefault();
        const myEvent = new CustomEvent("onsubmit",{
            bubble: true,
            cancealable: true
        });
        myEvent.data = event.target;
       el.dispatchEvent(myEvent);
    });
    
    this.submit = function(event){
        
        const myEvent = new CustomEvent("onsubmit",{
            bubble: true,
            cancealable: true,
            form: el.querySelector("#contact_form")
        });
       el.dispatchEvent(myEvent);
    }
    
    
    
    
    return el;
}