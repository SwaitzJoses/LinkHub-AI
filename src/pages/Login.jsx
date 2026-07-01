import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login Successful!");
    window.location.href = "/dashboard";
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>LinkHub AI</h1>
        <p>Welcome Back</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?
          <a href="/signup"> Sign Up</a>
        </p>

      </div>
    </div>
  );
}

export default Login;