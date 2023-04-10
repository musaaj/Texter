function AccountView(el, model) {
    const accountView = $(el);

    this.view = ()=>{
        accountView.$("#balance").innerHTML = "N" + model.get("balance");
        accountView.$("#refill").on("click", event=>{
            const refillView = new RefillView("#refillView",model);
        }
        );
    }

    this.view();
}

function RefillView(el, model) {
    const refillView = $(el);

    this.view = ()=>{
        refillView.style.display = "block";
        refillView.on("click", event=>{
            if("#"+event.target.id == el) event.target.style.display = "none";
        })
        refillView.$(".btn").on("click", event=>{
            const amount = event.target.attributes.amount.value;
            const payView = new PayView("#payView",amount, model)
        }
        );
    }

    this.view();
}

function PayView(el, amount, model) {
    const payView = $(el);
    const form = payView.$("#form");
    payView.show();

    payView.on("click", event=>{
        if(event.target.id == "payView") event.target.style.display = "none";
    });
    
    form.on("submit", event=>{
        event.preventDefault();
        payView.style.display = "none";
        CreateAlert("Sent!");
    },false);
}