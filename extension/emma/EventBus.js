// Emma Event Bus
// Central communication hub for all Emma modules

window.Emma = window.Emma || {};

window.Emma.EventBus = {

    emit(eventName, data = {}) {

        window.dispatchEvent(
            new CustomEvent(eventName, {
                detail: data
            })
        );

    },

    on(eventName, callback) {

        window.addEventListener(eventName, (event) => {
            callback(event.detail);
        });

    }

};