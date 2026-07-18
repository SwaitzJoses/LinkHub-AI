// Emma Logger

window.Emma = window.Emma || {};

window.Emma.EventBus.on(
    "emma:conversationChanged",
    (data) => {

        console.log("📝 Logger received conversation change");
        console.log(data);

    }
);