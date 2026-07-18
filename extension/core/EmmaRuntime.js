(() => {

    class EmmaRuntime {

        constructor() {

            this.eventBus = window.EmmaCore.EventBus;

            this.adapters = [];

        }

        registerAdapter(adapter) {

            this.adapters.push(adapter);

        }

        start() {

            console.log("🚀 Emma Runtime Starting");

            this.adapters.forEach(adapter => {

                try {

                    adapter.initialize();

                    console.log(`✅ ${adapter.name} Initialized`);

                }
                catch (error) {

                    console.error(`❌ ${adapter.name} Failed`, error);

                }

            });

            console.log("🧠 Emma Runtime Ready");

        }

    }

    window.EmmaCore = window.EmmaCore || {};

    window.EmmaCore.Runtime = new EmmaRuntime();

})();