class GitHubConnector {

    constructor(token) {

        this.token = token;

        this.baseUrl = "https://api.github.com";

        console.log(
            "🐙 GitHub Connector Ready"
        );

    }


    // ==========================
    // COMMON REQUEST
    // ==========================

    async request(endpoint) {

        const response = await fetch(

            `${this.baseUrl}${endpoint}`,

            {

                headers: {

                    Authorization: `Bearer ${this.token}`,

                    Accept: "application/vnd.github+json"

                }

            }

        );

        if (!response.ok) {

         throw new Error(

    `GitHub API Error (${response.status})`

);

        }

        return await response.json();

    }


    // ==========================
    // USER
    // ==========================

    async getUser() {

        return await this.request("/user");

    }


    // ==========================
    // REPOSITORIES
    // ==========================

    async getRepositories() {

        return await this.request(
    "/user/repos?sort=updated&per_page=20");

    }


    // ==========================
    // COMMITS
    // ==========================

    async getRecentCommits(owner, repo) {

        return await this.request(

            `/repos/${owner}/${repo}/commits?per_page=20`

        );

    }


    // ==========================
    // ISSUES
    // ==========================

    async getRecentIssues(owner, repo) {

        return await this.request(

            `/repos/${owner}/${repo}/issues`

        );

    }

}

export default GitHubConnector;