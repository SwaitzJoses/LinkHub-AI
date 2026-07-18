(() => {

    class EmmaEventBus {

        constructor() {

            this.listeners = new Map();

        }

        subscribe(eventType, callback) {

            if (!this.listeners.has(eventType)) {
                this.listeners.set(eventType, []);
            }

            this.listeners.get(eventType).push(callback);

        }

        unsubscribe(eventType, callback) {

            if (!this.listeners.has(eventType)) {
                return;
            }

            const callbacks = this.listeners.get(eventType);

            const index = callbacks.indexOf(callback);

            if (index !== -1) {
                callbacks.splice(index, 1);
            }

        }

        publish(event) {

            console.log("🧠 Emma EventBus");
            console.log(event);

            const callbacks = this.listeners.get(event.type) || [];

            callbacks.forEach(callback => {

                try {
                    callback(event);
                }
                catch (error) {
                    console.error("EmmaEventBus Error:", error);
                }

            });

        }

    }

    window.EmmaCore = window.EmmaCore || {};

    window.EmmaCore.EventBus = new EmmaEventBus();

})();