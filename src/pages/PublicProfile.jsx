import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import WhatsAppLeadForm from "../components/WhatsAppLeadForm";
import "../styles/PublicProfile.css";

function PublicProfile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [products, setProducts] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

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

    setProfile(data);

    if (data) {
      let visitorId = localStorage.getItem("visitor_id");

      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("visitor_id", visitorId);
      }

      await supabase.from("profile_views").insert({
        profile_id: data.id,
        visitor_id: visitorId,
      });

      const { data: linksData } = await supabase
        .from("links")
        .select("*")
        .eq("profile_id", data.id)
        .order("created_at");

      setLinks(linksData || []);

      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", data.id)
        .order("created_at", { ascending: false });

      setProducts(productsData || []);
    }
  };

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || "Products";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);
    return acc;
  }, {});

  if (!profile) {
    return (
      <div className="public-profile">
        <h2 style={{ color: "white" }}>Loading...</h2>
      </div>
    );
  }





const trackClick = async (title, url) => {
  const { error } = await supabase
    .from("link_clicks")
    .insert([
      {
        profile_id: profile.id,
        link_title: title,
      },
    ]);

  if (error) {
    console.log("Tracking Error:", error);
  }

  window.open(url, "_blank");
};

  return (
    <div className="public-profile">
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
        trackClick("Website", profile.website)
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

      

      <div className="consultation-card">
        <div className="consultation-icon">
          📞
        </div>

        <h2 className="consultation-title">
          Contact
        </h2>

        <p>Get in Touch</p>

        <WhatsAppLeadForm
          profileId={profile.id}
          whatsapp={profile.whatsapp}
        />
      </div>

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
              {groupedProducts[
                openCategory
              ]?.map((p) => (
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

                    <p className="product-description">
                      {p.description}
                    </p>

                    <h3>₹{p.price}</h3>

                    {profile.whatsapp && (
                    <button
  className="whatsapp-button"
  onClick={() =>
    trackClick(
      "WhatsApp",
      `https://wa.me/${profile.whatsapp}?text=Hi, I want to order ${p.name}`
    )
  }
>
  Order on WhatsApp
</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="links-section">
  {links.map((link) => (
    <button
      key={link.id}
      className="link-button premium-link"
      onClick={() => handleLinkClick(link)}
    >
      {link.title}
    </button>
  ))}
</div>

      <footer className="profile-footer">
        Powered by LinkHub AI
      </footer>

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
