import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./Dashboard.css";
import DailyViewsChart from "../components/DailyViewsChart";
import LeadsTable from "../components/LeadsTable";
import ProductCatalog from "../components/ProductCatalog";
import AnnouncementBroadcast from "../components/AnnouncementBroadcast";
 import { Menu, X } from "lucide-react";
 import { useNavigate } from "react-router-dom";




function Dashboard() {
  const [username, setUsername] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");

  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");

  const [views, setViews] = useState(0);
  const [clicks, setClicks] = useState(0);
const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [links, setLinks] = useState([]);
const [leads, setLeads] = useState([]);

  const [editingId, setEditingId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editUrl, setEditUrl] = useState("");
const [clickAnalytics, setClickAnalytics] = useState([]);
const [todayViews, setTodayViews] = useState(0);
const [weekViews, setWeekViews] = useState(0);
const [chartData, setChartData] = useState([]);
const [profile, setProfile] = useState({});
const [menuOpen, setMenuOpen] = useState(false);


const navigate = useNavigate();



// useEffect(() => {
//   setChartData([
//     { day: "Mon", views: 4 },
//     { day: "Tue", views: 7 },
//     { day: "Wed", views: 3 },
//     { day: "Thu", views: 9 },
//     { day: "Fri", views: 12 },
//     { day: "Sat", views: 8 },
//     { day: "Sun", views: 5 },
//   ]);
// }, []);

const loadChartData = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("profile_views")
    .select("visited_at")
    .eq("profile_id", user.id);

  if (error) {
    console.log(error);
    return;
  }

  const counts = {};

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const key = d.toLocaleDateString("en-IN", {
      weekday: "short",
    });

    counts[key] = 0;
  }

  data.forEach((view) => {
    const day = new Date(view.visited_at).toLocaleDateString("en-IN", {
      weekday: "short",
    });

    if (counts[day] !== undefined) {
      counts[day]++;
    }
  });

  const chart = Object.entries(counts).map(([day, views]) => ({
    day,
    views,
  }));

  setChartData(chart);
};


  useEffect(() => {
    loadProfile();
  }, []);

  const loadLinks = async (userId) => {
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("profile_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setLinks(data || []);
  };
const loadLeads = async (userId) => {
  const { data, error } = await supabase
    .from("whatsapp_leads")
    .select("*")
    .eq("profile_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);
console.log("Loading leads for:", userId);
  console.log("Leads:", data);

  if (error) {
    console.log(error);
    return;
  }

  setLeads(data || []);
};
  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setUsername(data.username || "");
      setBusinessName(data.business_name || "");
      setBio(data.bio || "");
      setWebsite(data.website || "");
      setWhatsapp(data.whatsapp || "");
      setInstagram(data.instagram || "");
      setLogoUrl(data.logo_url || "");

      const { count: viewCount } = await supabase
        .from("profile_views")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("profile_id", user.id);

      setViews(viewCount || 0);
const { data: uniqueData } = await supabase
  .from("profile_views")
  .select("visitor_id")
  .eq("profile_id", user.id);

const uniqueCount = new Set(
  uniqueData?.map((v) => v.visitor_id)
).size;

setUniqueVisitors(uniqueCount);
      const today = new Date();
today.setHours(0, 0, 0, 0);

const { count: todayViews } = await supabase
  .from("profile_views")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("profile_id", user.id)
  .gte("visited_at", today.toISOString());

setTodayViews(todayViews || 0);

const week = new Date();
week.setDate(week.getDate() - 7);

const { count: weeklyViews } = await supabase
  .from("profile_views")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("profile_id", user.id)
  .gte("visited_at", week.toISOString());

setWeekViews(weeklyViews || 0);

      const { count: clickCount } = await supabase
        .from("link_clicks")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("profile_id", user.id);

      setClicks(clickCount || 0);
const { data: analytics } = await supabase
  .from("link_clicks")
.select("link_title")
.eq("profile_id", user.id);
const counts = {};

analytics?.forEach((item) => {
  counts[item.link_title] =
    (counts[item.link_title] || 0) + 1;
});

setClickAnalytics(Object.entries(counts));
     await loadLinks(user.id);
await loadLeads(user.id);
await loadChartData();
    }
  };







  const uploadLogo = async () => {
    if (!logo) return logoUrl;

    const fileName = `${Date.now()}-${logo.name}`;

    const { error } = await supabase.storage
      .from("logos")
      .upload(fileName, logo);

    if (error) {
      console.log(error);
      alert(error.message);
      return logoUrl;
    }

    const { data } = supabase.storage
      .from("logos")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    let uploadedLogo = logoUrl;

    if (logo) {
      uploadedLogo = await uploadLogo();
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        business_name: businessName,
        bio,
        website,
        whatsapp,
        instagram,
        logo_url: uploadedLogo,
      })
      .eq("id", user.id);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("Profile saved!");
    loadProfile();
  };
const addLink = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
    if (!user) return;
    console.log("Dashboard User ID:", user.id);

    if (!linkTitle || !linkUrl) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("links")
      .insert({
        profile_id: user.id,
        title: linkTitle,
        url: linkUrl,
      });

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    setLinkTitle("");
    setLinkUrl("");

    loadLinks(user.id);
  };

  const deleteLink = async (id) => {
  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  setLinks(links.filter((link) => link.id !== id));
};


const editLink = (link) => {
  setEditingId(link.id);
  setEditTitle(link.title);
  setEditUrl(link.url);
};

const saveEdit = async () => {
  const { error } = await supabase
    .from("links")
    .update({
      title: editTitle,
      url: editUrl,
    })
    .eq("id", editingId);

  if (error) {
    console.log(error);
    alert(error.message);
    return;
  }

  setLinks((prev) =>
    prev.map((l) =>
      l.id === editingId
        ? {
            ...l,
            title: editTitle,
            url: editUrl,
          }
        : l
    )
  );

  setEditingId(null);
  setEditTitle("");
  setEditUrl("");
};

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };
const ctr =
  views > 0
    ? ((clicks / views) * 100).toFixed(1)
    : 0;
 const maxClicks =
  clickAnalytics.length > 0
    ? Math.max(
        ...clickAnalytics.map((item) => item[1])
      )
    : 0;

const topLinks = clickAnalytics.filter(
  ([_, count]) => count === maxClicks
);

  
  return (
  <div className="app-layout">
    
<button
  className="menu-btn"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <X size={24} /> : <Menu size={24} />}
</button>

<aside className={`sidebar ${menuOpen ? "open" : ""}`}>

   
      <div className="sidebar-logo">
        🔗 LinkHub AI
      </div>

   <nav className="sidebar-nav">
  <a href="#dashboard" className="active">
    🏠 Dashboard
  </a>

  <a href="#profile">
    👤 Profile
  </a>

  <a href="#products">
    🛍 Products
  </a>

  <a href="#links">
    🔗 Links
  </a>

  <a href="#leads">
    👥 Leads
  </a>

  <a href="#analytics">
    📈 Analytics
  </a>

  <li
  onClick={() => navigate("/poster-generator")}
  className="sidebar-item ai-sidebar"
>
  🎨 Poster Generator
</li>
</nav>
      {/* <div className="upgrade-card">
        <h3>LinkHub Pro 🚀</h3>
        <p>Grow your business with AI.</p>
      </div> */}



</aside>




   {menuOpen && (
  <div
    className="overlay"
    onClick={() => setMenuOpen(false)}
  />
)}   
    



    <main className="main-content">
      <header className="topbar">
        <div>
          <h1>
            Welcome back, {businessName || "Business"} 👋
          </h1>

          <p>
            You have {leads.length} leads and {todayViews} views today.
          </p>
        </div>
      </header>

        <div className="dashboard">
  <div id="dashboard" className="card">
  <h1> LinkHub Dashboard</h1>

  <div className="stats">
 





 <h3>Total Clicks: {clicks}</h3>
  <h2 style={{ textAlign: "center" }}>
  📊 Link Analytics
</h2>
{topLinks.length > 0 && (
  <div className="top-link">
    <h2>🏆 Top Performing Links</h2>

    {topLinks.map(([title, count]) => (
      <p key={title}>
        <strong>{title}</strong> — {count} clicks
      </p>
    ))}
  </div>
)}

<div className="stats-grid">
  <div className="stat-card">
    <h3>{todayViews}</h3>
    <p>👀 Views Today</p>
  </div>
<div className="stat-card">
  <h3>{uniqueVisitors}</h3>
  <p>👤 Unique Visitors</p>
</div>
  <div className="stat-card">
    <h3>{weekViews}</h3>
    <p>📅 Views This Week</p>
  </div>

  <div className="stat-card">
    <h3>{ctr}%</h3>
    <p>📈 CTR</p>
  </div>

  
</div>

<div id="analytics">
  <DailyViewsChart data={chartData} />


  <div className="analytics-grid">
    {clickAnalytics.map(([title, count]) => (
      <div key={title} className="analytics-card">
        <h3>{title}</h3>
        <p>{count} clicks</p>
      </div>
    ))}
  </div>
  </div>
</div>  
</div>
<div id="profile" className="card">
  <h2>Profile</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value.toLowerCase().replace(/\s/g, "")
          )
        }
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <textarea
        placeholder="Business Bio"
        rows="4"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <input
        type="text"
        placeholder="WhatsApp Number"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Instagram Username"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      {logoUrl && (
        <img
          src={logoUrl}
          alt="Logo"
          width="120"
          style={{
            borderRadius: "16px",
            display: "block",
            marginBottom: "20px",
          }}
        />
      )}

      <input
        type="file"
        onChange={(e) => setLogo(e.target.files[0])}
      />
<div id="products">
  <ProductCatalog />
</div>
      <br /><br />

      <div className="action-buttons">
        
<button
  className="sidebar-btn ai-poster-btn"
  onClick={() => navigate("/poster-generator")}
>
  🎨 AI Image Generator
</button>

<br /><br />

<button onClick={() => navigate("/my-posters")}>
  🎨 My Posters
</button>



 <br /><br />
      <button onClick={handleSave}>
        Save Profile
      </button>

      <br /><br />

      {username && (
        <>
     <button
  className="public-btn"
  onClick={() =>
    window.open(`/${username}`, "_blank")
  }
>
  🌐 View Public Page
</button>

          <br /><br />
        </>
      )}

      <button
  onClick={() => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${username}`
    );
    alert("Link copied!");
  }}
>
  📋 Copy Link
</button>
</div>
     </div>
<div id="links" className="card">
  <h2>🔗 Custom Links</h2>

      <input
        type="text"
        placeholder="Link Title"
        value={linkTitle}
        onChange={(e) => setLinkTitle(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <input
        type="text"
        placeholder="https://example.com"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <button onClick={addLink}>
  Add Link
</button>

<br /><br />

{links.map((link) => (
<div key={link.id} className="link-card">
  {editingId === link.id ? (
  <>
    <input
      value={editTitle}
      onChange={(e) =>
        setEditTitle(e.target.value)
      }
      style={{ width: "100%", padding: "8px" }}
    />

    <br /><br />

    <input
      value={editUrl}
      onChange={(e) =>
        setEditUrl(e.target.value)
      }
      style={{ width: "100%", padding: "8px" }}
    />

    <br /><br />

    <button onClick={saveEdit}>
      Save
    </button>
  </>
) : (
  <>
    <strong>{link.title}</strong>
    <br />
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
    >
      {link.url}
    </a>
  </>
)}

    <br /><br />

    <button
  onClick={() => editLink(link)}
>
  Edit
</button>

{" "}

<button
   className="delete-btn"
  onClick={() => deleteLink(link.id)}
>
  🗑 Delete
</button>
  </div>
))}

<br />

</div>
 
<div id="leads">
  <LeadsTable leads={leads} />
</div>

{/* <AnnouncementBroadcast
  leads={leads}
  profile={profile}
/> */}

<br />

<footer className="footer">
  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
 <br /><br />
  <p>
    © 2026 LinkHub AI · PIXELLENCE
  </p>
</footer>

    
</div>
      </main>
    </div>
  );
}

export default Dashboard;