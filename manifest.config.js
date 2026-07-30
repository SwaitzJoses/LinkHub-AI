import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,

  name: "Evoloz",

  description: "Continuity Layer for AI",

  version: "1.0.0",

    icons: {
    "16": "extension/icons/icon16.png",
    "32": "extension/icons/icon32.png",
    "48": "extension/icons/icon48.png",
    "128": "extension/icons/icon128.png"
  },

  permissions: [
    "storage",
    "downloads",
     "identity"
  ],
oauth2: {
  client_id: "191930401350-jh824qn093p63l0l63u7k3s9onbhbcjm.apps.googleusercontent.com",
  scopes: [
    "openid",
    "email",
    "profile"
  ]
},
  host_permissions: [
  "https://chatgpt.com/*",
  "https://claude.ai/*",
  "https://gemini.google.com/*",
   "https://kfljpjdtvtespczktdoc.supabase.co/*"
],

  background: {
    service_worker: "extension/background.js",
    type: "module"
  },

 action: {
  default_popup: "extension/popup/popup.html",
  default_icon: {
    "16": "extension/icons/icon16.png",
    "32": "extension/icons/icon32.png",
    "48": "extension/icons/icon48.png"
  }
},

 content_scripts: [
  {
    matches: [
      "https://chatgpt.com/*",
      "https://claude.ai/*",
      "https://gemini.google.com/*"
    ],
      js: [
        "extension/content/content.js"
      ],
     run_at: "document_end"
    }
  ],

web_accessible_resources: [
  {
    resources: [
      "**/*"
    ],
    matches: [
      "https://chatgpt.com/*",
      "https://claude.ai/*",
      "https://gemini.google.com/*"
    ]
  }
]
});