import Emma from "./Emma";

class EmmaRuntime {
  constructor() {
    this.emma = null;

    this.user = null;
    this.repository = null;
    this.branch = "main";
    this.session = null;

    this.initialized = false;
    this.awake = false;
  }

  // ==================================
  // Runtime Lifecycle
  // ==================================

  initialize() {
    if (!this.emma) {
      console.log("🚀 Initializing Emma Runtime...");

      this.emma = new Emma();
      this.initialized = true;

      console.log("✅ Emma Runtime Initialized");
    }

    return this.emma;
  }

  async wake() {
    const emma = this.initialize();

    if (this.awake) {
      return emma;
    }

    console.log("🌅 Waking Emma...");

    try {
      await emma.experience({
        source: "system",
        type: "wake",
        event: "Emma awakened",
        message: "Emma has entered the active workspace.",
        importance: 5,
      });

      this.awake = true;

      console.log("✨ Emma Awake");
    } catch (err) {
      console.error("❌ Emma wake failed", err);
    }

    return emma;
  }

  shutdown() {
    console.log("🛑 Emma Runtime Shutdown");

    this.emma = null;

    this.initialized = false;
    this.awake = false;
  }

  // ==================================
  // Status
  // ==================================

  isInitialized() {
    return this.initialized;
  }

  isAwake() {
    return this.awake;
  }

  getEmma() {
    return this.initialize();
  }

  // ==================================
  // Context
  // ==================================

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setRepository(repository) {
    this.repository = repository;
  }

  getRepository() {
    return this.repository;
  }

  setBranch(branch) {
    this.branch = branch;
  }

  getBranch() {
    return this.branch;
  }

  setSession(session) {
    this.session = session;
  }

  getSession() {
    return this.session;
  }

  clearRepository() {
    this.repository = null;
    this.branch = "main";
    this.session = null;
  }
}

export default new EmmaRuntime();