// src/components/Auth.jsx
import React, {useState} from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Auth({ onAuth }){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [mode, setMode] = useState("login"); // or signup
  const [error,setError] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    setError("");
    try {
      if(mode === "signup"){
        const userCred = await createUserWithEmailAndPassword(auth,email,password);
        onAuth(userCred.user);
      } else {
        const userCred = await signInWithEmailAndPassword(auth,email,password);
        onAuth(userCred.user);
      }
    } catch(err){
      setError(err.message);
    }
  }

  return (
    <div className="auth-card">
      <h3>{mode === "signup" ? "Create account" : "Welcome back"}</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">{mode === "signup" ? "Sign up" : "Log in"}</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div style={{marginTop:12}}>
        <button onClick={()=>setMode(mode==="signup"?"login":"signup")}>
          {mode==="signup" ? "Have an account? Log in" : "New? Create account"}
        </button>
      </div>
    </div>
  );
}
