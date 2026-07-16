import { createRoot } from "react-dom/client";

import { GoogleOAuthProvider }
from "@react-oauth/google";

import "./index.css";

import App from "./App.jsx";

import "./emma-core/tests/testConnectors";

// import "./emma-core/tests/testGitHubConnector";

// import "./emma-core/tests/testLLMConnector"

// import "./emma-core/tests/reflectionTest";
// import "./emma-core/tests/testBecoming"; // TEMP TEST

// import "./emma-core/testEmma.js";   // 👈 TEMP TEST

// 🧪 TEMP TEST ONLY
// import "./emma-core/testConnectors";


// import "./emma-core/tests/testEmmaDay12";


createRoot(
document.getElementById("root")
)
.render(


<GoogleOAuthProvider

clientId={
import.meta.env.VITE_GOOGLE_CLIENT_ID
}

>

<App />

</GoogleOAuthProvider>


);