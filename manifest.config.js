import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,

  name: "Evoloz",

  description: "Continuity Layer for AI",

  version: "1.0.0",

  permissions: [
    "storage",
    "downloads"
  ],

  host_permissions: [
  "https://chatgpt.com/*",
  "https://claude.ai/*",
  "https://gemini.google.com/*"
],

  background: {
    service_worker: "extension/background.js",
    type: "module"
  },

  action: {
    default_popup: "extension/popup/popup.html"
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