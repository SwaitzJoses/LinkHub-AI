import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import WhatsAppLeadForm from "../components/WhatsAppLeadForm";
import "../styles/PublicProfile.css";

function PublicProfile() {
  const { username } = useParams();

  // ----------------------------
  // State
  // ----------------------------

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [products, setProducts] = useState([]);

  const [openCategory, setOpenCategory] =
    useState(null);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // ----------------------------
  // Initial Load
  // ----------------------------

  useEffect(() => {
    loadProfile();
  }, []);

  // ----------------------------
  // Track Visitor Event
  // ----------------------------

  const trackEvent = async (
    eventType,
    product = null
  ) => {
    if (!profile) return;

    try {
      let visitorId =
        localStorage.getItem("visitor_id");

      if (!visitorId) {
        visitorId = crypto.randomUUID();

        localStorage.setItem(
          "visitor_id",
          visitorId
        );
      }

      const { data, error } = await supabase
        .from("visitor_events")
        .insert({
          profile_id: profile.id,
          session_id: visitorId,
          event_type: eventType,
          product_id: product?.id || null,
          event_data: product
            ? {
                product_name: product.name,
                category: product.category,
                price: product.price,
              }
            : {},
        });
        console.log(error);
    } catch (err) {
      console.log(
        "Visitor Event Error:",
        err
      );
    }
  };

  // ----------------------------
  // Load Business
  // ----------------------------

  const loadProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      console.log(error);
      return;
    }

    if (!data) return;

    setProfile(data);

    //----------------------------------
    // Old Analytics
    //----------------------------------

    let visitorId =
      localStorage.getItem("visitor_id");

    if (!visitorId) {
      visitorId = crypto.randomUUID();

      localStorage.setItem(
        "visitor_id",
        visitorId
      );
    }

    await supabase
      .from("profile_views")
      .insert({
        profile_id: data.id,
        visitor_id: visitorId,
      });

    //----------------------------------
    // Emma Memory
    //----------------------------------

    await supabase
      .from("visitor_events")
      .insert({
        profile_id: data.id,
        session_id: visitorId,
        event_type: "PAGE_VIEW",
      });

    //----------------------------------
    // Links
    //----------------------------------

    const { data: linksData } =
      await supabase
        .from("links")
        .select("*")
        .eq("profile_id", data.id)
        .order("created_at");

    setLinks(linksData || []);

    //----------------------------------
    // Products
    //----------------------------------

    const { data: productsData } =
      await supabase
        .from("products")
        .select("*")
        .eq("user_id", data.id)
        .order("created_at", {
          ascending: false,
        });

    setProducts(productsData || []);
  };

  // ----------------------------
  // Group Products
  // ----------------------------

  const groupedProducts =
    products.reduce((acc, product) => {
      const category =
        product.category || "Products";

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(product);

      return acc;
    }, {});

  // ----------------------------
  // Track External Clicks
  // ----------------------------

  const trackClick = async (
    title,
    url
  ) => {
    if (!profile) return;

    await supabase
      .from("link_clicks")
      .insert({
        profile_id: profile.id,
        link_title: title,
      });

    if (title === "WhatsApp") {
      trackEvent(
        "WHATSAPP_CLICK",
        selectedProduct
      );
    }

    window.open(url, "_blank");
  };

  // ----------------------------
  // Product Details
  // ----------------------------

  const openProduct = async (product) => {
  // Open popup FIRST
  setSelectedProduct(product);

  // Then try to track the event
  try {
    await trackEvent("PRODUCT_VIEW", product);
  } catch (err) {
    console.log(err);
  }
};

  // ----------------------------
  // Loading Screen
  // ----------------------------

  if (!profile) {
    return (
      <div className="public-profile">
        <h2
          style={{
            color: "white",
          }}
        >
          Loading...
        </h2>
      </div>
    );
  }

  return (<div className="public-profile">

  {/* ---------------- Hero ---------------- */}

  <div className="hero-card">

    {profile.logo_url && (
      <img
        src={profile.logo_url}
        alt="Logo"
        className="logo"
      />
    )}

    <h1 className="profile-name">
      {profile.business_name}
    </h1>

    <p className="profile-bio">
      {profile.bio}
    </p>

    <div className="hero-stats">

      <div>
        <h3>{Object.keys(groupedProducts).length}</h3>
        <p>Categories</p>
      </div>

      <div>
        <h3>{products.length}</h3>
        <p>Products</p>
      </div>

      <div>
        <h3>24/7</h3>
        <p>Support</p>
      </div>

    </div>

    <div className="contact-links">

      {profile.website && (
        <button
          className="contact-btn"
          onClick={() =>
            trackClick(
              "Website",
              profile.website
            )
          }
        >
          🌐 Website
        </button>
      )}

      {profile.instagram && (
        <button
          className="contact-btn"
          onClick={() =>
            trackClick(
              "Instagram",
              `https://instagram.com/${profile.instagram}`
            )
          }
        >
          📷 Instagram
        </button>
      )}

      {profile.whatsapp && (
        <button
          className="contact-btn"
          onClick={() =>
            trackClick(
              "WhatsApp",
              `https://wa.me/${profile.whatsapp}`
            )
          }
        >
          💬 WhatsApp
        </button>
      )}

    </div>

  </div>

  {/* ---------------- Contact ---------------- */}

  <div className="consultation-card">

    <div className="consultation-icon">
      📞
    </div>

    <h2 className="consultation-title">
      Contact
    </h2>

    <p>
      Get in Touch
    </p>

    <WhatsAppLeadForm
      profileId={profile.id}
      whatsapp={profile.whatsapp}
    />

  </div>

  {/* ---------------- Products ---------------- */}

  <div className="products-section">

    {!openCategory &&
      Object.keys(groupedProducts).length > 0 && (
        <>

          <h2 className="category-title">
            Browse Categories
          </h2>

          <div className="category-grid">

            {Object.entries(groupedProducts).map(
              ([category, items]) => (

                <div
                  key={category}
                  className="category-card"
                  onClick={() =>
                    setOpenCategory(category)
                  }
                >

                  <img
                    src={
                      items[0]?.image_url ||
                      "https://placehold.co/400x300"
                    }
                    alt={category}
                    className="category-image"
                  />

                  <div className="category-name">

                    {category}

                    <div className="category-count">
                      {items.length} Products
                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </>
      )}

    {openCategory && (
      <>

        <button
          className="back-button"
          onClick={() =>
            setOpenCategory(null)
          }
        >
          ← Back to Categories
        </button>

        <h2 className="category-title">
          {openCategory}
        </h2>

        <div className="products-grid">

          {groupedProducts[openCategory]?.map(
            (p) => (

              <div
                key={p.id}
                className="product-card"
              >

                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="product-image"
                  />
                )}

                <div className="product-body">

                  <h3>{p.name}</h3>

                  <h3>
                    ₹{p.price}
                  </h3>

                  <button
                    className="view-details-btn"
                    onClick={() =>
                      openProduct(p)
                    }
                  >
                    View Details →
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </>
    )}

  </div>

        {/* ---------------- Links ---------------- */}

      <div className="links-section">
        {links.map((link) => (
          <button
            key={link.id}
            className="link-button premium-link"
            onClick={() =>
              trackClick(link.title, link.url)
            }
          >
            {link.title}
          </button>
        ))}
      </div>

      {/* ---------------- Product Modal ---------------- */}

      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >
          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="close-modal"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ✕
            </button>

            {selectedProduct.image_url && (
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                className="modal-product-image"
              />
            )}

            <h2>
              {selectedProduct.name}
            </h2>

            <p>
              {selectedProduct.description}
            </p>

            <h3>
              ₹{selectedProduct.price}
            </h3>

            {profile.whatsapp && (
              <button
                className="whatsapp-button"
                onClick={() =>
                  trackClick(
                    "WhatsApp",
                    `https://wa.me/${profile.whatsapp}?text=Hi, I want to order ${selectedProduct.name}`
                  )
                }
              >
                Order on WhatsApp
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---------------- Footer ---------------- */}

      <footer className="profile-footer">
        Powered by LinkHub AI
      </footer>

      {/* ---------------- Floating WhatsApp ---------------- */}

      {profile.whatsapp && (
        <button
          className="floating-whatsapp"
          onClick={() =>
            trackClick(
              "WhatsApp",
              `https://wa.me/${profile.whatsapp}`
            )
          }
        >
          💬
        </button>
      )}

    </div>
  );
}

export default PublicProfile;