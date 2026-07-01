import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/Auth.css";

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
      await supabase.from("profiles").insert({
        id: data.user.id,
        username: "",
        business_name: "",
        bio: "",
        website: "",
        whatsapp: "",
        instagram: "",
        logo_url: "",
      });
    }

    alert("Account Created Successfully!");
    window.location.href = "/login";
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>LinkHub AI</h1>
        <p>Create your account</p>

        <form onSubmit={handleSignup}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Sign Up
          </button>

        </form>

        <p className="bottom-text">
          Already have an account?
          <a href="/login"> Login</a>
        </p>

      </div>
    </div>
  );
}

export default Signup;