// ====================================================
// EmmaBrain.js
// LINKHUB - Emma AI Business Assistant
// ====================================================

export function analyzeBusiness(data) {
  const suggestions = [];
  const products = data.products || [];

  // -----------------------------
  // PROFILE
  // -----------------------------

  if (!data.logo_url) {
    suggestions.push({
      priority: 100,
      title: "Upload your logo",
      reason: "Businesses with logos earn more trust.",
      icon: "🖼️",
      action: "#profile",
    });
  }

  if (!data.business_name) {
    suggestions.push({
      priority: 99,
      title: "Add your business name",
      reason: "Customers should know who you are.",
      icon: "🏪",
      action: "#profile",
    });
  }

  if (!data.bio) {
    suggestions.push({
      priority: 98,
      title: "Write your business description",
      reason: "Tell customers what makes you special.",
      icon: "✍️",
      action: "#profile",
    });
  }

  // -----------------------------
  // PRODUCTS
  // -----------------------------

  if (products.length === 0) {
    suggestions.push({
      priority: 95,
      title: "Add your first product",
      reason: "Customers cannot buy what they cannot see.",
      icon: "🛍️",
      action: "#products",
    });
  } else if (products.length < 5) {
    suggestions.push({
      priority: 70,
      title: "Add more products",
      reason: "More products usually bring more enquiries.",
      icon: "➕",
      action: "#products",
    });
  }

  // -----------------------------
  // VISITS
  // -----------------------------

  if ((data.views || 0) < 20) {
    suggestions.push({
      priority: 90,
      title: "Share your LinkHub",
      reason: "Let's bring more visitors today.",
      icon: "📢",
      action: "#dashboard",
    });
  }

  // -----------------------------
  // AI POSTER
  // -----------------------------

  if (products.length > 0 && (data.posters || 0) === 0) {
    suggestions.push({
      priority: 85,
      title: "Create an AI Poster",
      reason: "Promote today's products on social media.",
      icon: "🎨",
      action: "/poster-generator",
    });
  }

  // -----------------------------
  // LEADS
  // -----------------------------

  if ((data.leads || 0) > 0) {
    suggestions.push({
      priority: 88,
      title: "Reply to your customers",
      reason: `${data.leads} people are waiting for your reply.`,
      icon: "💬",
      action: "#leads",
    });
  }

  // -----------------------------
  // Sort Suggestions
  // -----------------------------

  suggestions.sort((a, b) => b.priority - a.priority);

  // -----------------------------
  // Greeting
  // -----------------------------

  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  // -----------------------------
  // Mood
  // -----------------------------

  let mood = "😊";

  if ((data.views || 0) >= 100) mood = "🚀";
  if ((data.leads || 0) >= 5) mood = "🔥";
  if (products.length === 0) mood = "🤔";

  // -----------------------------
  // Celebration
  // -----------------------------

  let celebration = "";

  if ((data.views || 0) >= 100) {
    celebration = "🎉 Amazing! Your business crossed 100 profile views!";
  }

  if (products.length >= 20) {
    celebration = "🏆 Your catalogue looks fantastic!";
  }

  // -----------------------------
  // Compliment
  // -----------------------------

  let compliment = "";

  if (data.logo_url && data.bio) {
    compliment = "Your business profile looks professional.";
  }

  if (products.length >= 10) {
    compliment = "Great job! You have a strong product catalogue.";
  }

  // -----------------------------
  // Warning
  // -----------------------------

  let warning = "";

  if ((data.views || 0) > 30 && (data.clicks || 0) === 0) {
    warning = "People are visiting but not clicking your products.";
  }

  // -----------------------------
  // Motivation
  // -----------------------------

  const motivations = [
    "Small improvements every day create successful businesses.",
    "Consistency beats perfection.",
    "Every customer starts with one visit.",
    "Let's grow your business together.",
    "One new customer today is progress.",
  ];

  const motivation =
    motivations[Math.floor(Math.random() * motivations.length)];

  // -----------------------------
  // Previous Mission
  // -----------------------------

  const previousMission = data.previousMission;

  let intro = "";

  if (previousMission) {
    if (previousMission.completed) {
      intro = `🎉 Excellent! Yesterday you completed "${previousMission.mission}".`;
    } else {
      intro =
        "😊 Yesterday's mission is still waiting. Let's finish it today!";
    }
  } else {
    intro = "👋 Welcome! Let's grow your business together.";
  }

  // -----------------------------
  // Today's Mission
  // -----------------------------

  const mission =
    suggestions.length > 0
      ? suggestions[0]
      : {
          title: "Relax",
          reason: "Everything looks fantastic today!",
          icon: "🎉",
          action: "#dashboard",
        };
        const tasks = suggestions.slice(0, 3);
        const total = 5;

let completed = 0;

if (data.logo_url) completed++;
if (data.business_name) completed++;
if (products.length > 0) completed++;
if ((data.posters || 0) > 0) completed++;
if ((data.leads || 0) === 0) completed++;

const progress = Math.round((completed / total) * 100);

  // -----------------------------
  // Return Emma Brain
  // -----------------------------

  return {
    greeting,
    intro,
    mood,
    compliment,
    celebration,
    warning,
    motivation,
    mission,
    suggestions,
     tasks,
     completed,
total,
progress,
    stats: {
      views: data.views || 0,
      clicks: data.clicks || 0,
      leads: data.leads || 0,
      products: products.length,
    },
  };
}