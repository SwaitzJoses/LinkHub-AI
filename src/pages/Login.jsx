import { supabase } from "../lib/supabase";
import "../styles/Auth.css";

function Login() {

  const handleGoogleLogin = async () => {

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      alert(error.message);
    }

  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Evoloz</h1>

        <p>Continue with Google</p>

        <button onClick={handleGoogleLogin}>
          Continue with Google
        </button>

      </div>

    </div>
  );
}

export default Login;