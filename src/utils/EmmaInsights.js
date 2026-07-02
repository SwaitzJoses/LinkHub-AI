export function getEmmaInsight({
  pageViews,
  productViews,
  products,
  leads,
}) {

  if (pageViews === 0) {
    return {
      insight:
        "Nobody has visited your page today. Share your LinkHub on WhatsApp Status."
    };
  }

  if (pageViews > 0 && productViews === 0) {
    return {
      insight:
        "People are visiting your page but nobody is viewing your products. Feature your best product at the top."
    };
  }

  if (productViews >= pageViews) {
    return {
      insight:
        "Visitors are exploring your products. Great! Now encourage them to contact you on WhatsApp."
    };
  }

  if (products < 5) {
    return {
      insight:
        `You only have ${products} products. Adding more products usually increases customer engagement.`
    };
  }

  if (leads === 0) {
    return {
      insight:
        "You're getting visitors but no leads yet. Try adding a limited-time offer or a stronger call-to-action."
    };
  }

  return {
    insight:
      "Your business is performing well today. Keep promoting your LinkHub."
  };

}