class VSCodeConnector {

    constructor() {

        this.workspace = null;

        this.activeFile = null;

        console.log(
            "💻 VS Code Connector Ready"
        );

    }

    // ==========================
    // CONNECT
    // ==========================

    connect() {

        console.log(
            "💻 Connected to VS Code"
        );

    }

    // ==========================
    // WORKSPACE
    // ==========================

    setWorkspace(workspace) {

        this.workspace = workspace;

    }

    getWorkspace() {

        return this.workspace;

    }

    // ==========================
    // ACTIVE FILE
    // ==========================

    setActiveFile(file) {

        this.activeFile = file;

    }

    getActiveFile() {

        return this.activeFile;

    }

    // ==========================
    // FILE EVENTS
    // ==========================

    fileOpened(file) {

        this.activeFile = file;

        console.log(
            "📂 File opened:",
            file
        );

    }

    fileSaved(file) {

        console.log(
            "💾 File saved:",
            file
        );

    }

}

export default VSCodeConnector;