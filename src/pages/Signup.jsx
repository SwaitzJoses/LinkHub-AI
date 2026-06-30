import { useState } from "react";
import { supabase } from "../lib/supabase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSignup = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        username: "",
        business_name: "",
        bio: "",
        website: "",
        whatsapp: "",
        instagram: "",
        logo_url: "",
      });

    if (profileError) {
      console.log(profileError);
    }
  }

  alert("Account created!");
  window.location.href = "/login";
};

  return (
    <div style={{ padding: "0 400px", color: "#ffffff", fontFamily: "Inter, sans-serif"
     }}>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Sign Up
        </button>
        <p>
  Already have an account? <a href="/login">Login</a>
</p>
      </form>
    </div>
  );
}

export default Signup;