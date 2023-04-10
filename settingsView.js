function SettingsView(el, settingsModel) {
    const settingsView = $(el);

    this.view = ()=>{
        settingsView.$("#name").value = settingsModel.get("name");
        settingsView.$("#sender-id").value = settingsModel.get("sender_id");
        settingsView.$("#balance").innerHTML = "N" + settingsModel.get("balance")
        settingsView.$("#form").on("submit", event=>{
            event.preventDefault();

            settingsModel.set("name", settingsView.$("#name").value);
            settingsModel.set("sender_id", settingsView.$("#sender-id").value);
            settingsModel.save();

        }
        )
    }

    this.view();
}