import GitHubConnector from "../connectors/GitHubConnector";

async function testGitHub() {

    console.log("=================================");
    console.log("Emma GitHub Connector Test");
    console.log("=================================");

    const github = new GitHubConnector(

        import.meta.env.VITE_GITHUB_TOKEN

    );

    try {

        const user = await github.getUser();

        console.log("✅ Connected!");

        console.log(user);

    }

    catch (error) {

        console.error(error);

    }

}

testGitHub();