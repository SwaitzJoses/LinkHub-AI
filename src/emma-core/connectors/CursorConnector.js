class CursorConnector {

    constructor() {

        this.workspace = null;

        this.activeFile = null;

        console.log(
            "🖥 Cursor Connector Ready"
        );

    }

    // ==========================
    // CONNECT
    // ==========================

    connect() {

        console.log(
            "🖥 Connected to Cursor"
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
            "📂 Cursor opened:",
            file
        );

    }

    fileSaved(file) {

        console.log(
            "💾 Cursor saved:",
            file
        );

    }

}

export default CursorConnector;