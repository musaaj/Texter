function ContactsView(el, contactsModel) {

    this.view = ()=>{
        const contactsView = document.createElement("div");
        contactsView.className = "";
        let templete = `
        <section class="plus menu">
             <button id="add" style="border:none;outline:none" class="color-theme padding center circle shadow"><span class="fas fa-plus"></span>
             </button>
        </section>
        <header class="top"><div class="bar padding-8 color-theme">Contacts</div></header>
        <ul class="list margin-64">`;

        if (contactsModel.getAll().length == 0) {
            templete += `<p class="margin-64 padding-8">Click on + button to add contact</p>`;
        } else {
            contactsModel.getAll().forEach((contact,id)=>{
                const contactTemplete = `<li id=${id} class="list-item contact"><b>${contact.first_name + " " + contact.last_name}</b><br><i>${contact.mobile}</i></li>`;
                templete += contactTemplete;
            }
            )
        }

        templete += "</ul>";
        contactsView.innerHTML = templete
        document.getElementById(el).appendChild(contactsView);

        contactsView.querySelector("#add").addEventListener("click", event=>{
            const formView = document.createElement("div");
            formView.className = "w3-animate-zoom";

            const templete = `<header class="top bar color-theme padding-8"><span id="back" class="btn">Back</span><button class="btn" form="contactForm" id="okay" style="float:right;">Save</button></header>
                <form id="contactForm" class="margin-64 padding-8">
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
                  </form>`;

            formView.innerHTML = templete;
            document.getElementById(el).appendChild(formView);
            contactsView.style.display = "none";

            formView.querySelector("#contactForm").addEventListener("submit", event=>{
                event.preventDefault();
                const contact = {
                    first_name: event.target.first_name.value,
                    last_name: event.target.last_name.value,
                    mobile: event.target.mobile.value,
                    home_no: "",
                    business_no: "",
                    alternative_no: "",
                    sex: event.target.sex.value,
                    date_of_birth: event.target.date_of_birth.value,
                    address: event.target.address.value,
                    personality: "",
                    loyalty: 0,
                    profession: "",
                    language: ""
                }

                contactsModel.add(contact);
                contactsModel.save();
                document.getElementById(el).removeChild(formView);
                this.view();

            }
            )

            formView.querySelector("#back").addEventListener("click", event=>{
                contactsView.style.display = "block";
                document.getElementById(el).removeChild(formView);
            }
            )

        }
        )

        contactsView.querySelectorAll(".contact").forEach((contact,id)=>{
            contact.addEventListener("click", event=>{

                const clickedContact = contactsModel.get(id);
                const contactView = document.createElement("div");
                contactView.className = "margin-64 w3-animate-zoom";
                const templete = `<header class="top bar color-theme padding-8"><span id="back">Back</span></header>
                <div class="row padding-8"><label class="col">First Name:</label><i class="col">${clickedContact.first_name}</i></div>
                <div class="row padding-8"><label class="col">Last Name:</label><i class="col">${clickedContact.last_name}</i></div>
                <div class="row padding-8"><label class="col">Mobile No:</label><i class="col">${clickedContact.mobile}</i></div>
                <div class="row padding-8"><label class="col">Home No:</label><i class="col">${clickedContact.home_no}</i></div>
                <div class="row padding-8"><label class="col">Business No:</label><i class="col">${clickedContact.business_no}</i></div>
                <div class="row padding-8"><label class="col">Alternative No:</label><i class="col">${clickedContact.alternative_no}</i></div>
                <div class="row padding-8"><label class="col">Sex:</label><i class="col">${clickedContact.sex}</i></div>
                <div class="row padding-8"><label class="col">Address:</label><i class="col">${clickedContact.address}</i></div>
                <div class="row padding-8"><label class="col">Personality:</label><i class="col">${clickedContact.personality}</i></div>
                <div class="row padding-8"><label class="col">Profession:</label><i class="col">${clickedContact.profession}</i></div>
                <div class="row padding-8"><label class="col">Loyalty Level:</label><i class="col">${clickedContact.loyalty}</i></div>`;

                contactView.innerHTML = templete;
                contactsView.style.display = "none";
                document.getElementById(el).appendChild(contactView);

                contactView.querySelector("#back").addEventListener("click", event=>{
                    contactsView.style.display = "block";
                    document.getElementById(el).removeChild(contactView);
                }
                )

            }
            )
        }
        )

        $(".contact").onTouchDown(event=>{
            contactsView.style.display = "none";
            const editContactView = EditContactView({},1);
            document.getElementById(el).appendChild(editContactView);
            $(editContactView).on("onsubmit",function(myevent){
                alert(myevent.data);
                contactsView.style.display = "block";
                document.getElementById(el).removeChild(editContactView);
            });
        });
    }

    this.view();

}