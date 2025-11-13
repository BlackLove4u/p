// src/App.jsx
import React, {useState, useEffect} from "react";
import Auth from "./components/Auth";
import WorkoutGenerator from "./components/WorkoutGenerator";
import ProgressTracker from "./components/ProgressTracker";
import { loadProfile, saveProfile } from "./utils/storage";

export default function App(){
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(loadProfile() || {
    currentWeight: 180,
    goalWeight: 160,
    goalDays: 84,
    prefStyle: "dance"
  });

  useEffect(()=> saveProfile(profile), [profile]);

  function onAuth(userObj){
    setUser(userObj);
    // later: load Firestore profile
  }

  function handleSavePlan(plan){
    const updated = {...profile, lastPlan: plan};
    setProfile(updated);
  }

  return (
    <div className="app">
      {!user ? (
        <Auth onAuth={onAuth} />
      ) : (
        <>
          <header>
            <h1>Phoenix Rise Fitness</h1>
            <p>Welcome — ready to move?</p>
          </header>

          <main style={{display:'grid',gap:20,gridTemplateColumns:'1fr 320px'}}>
            <div>
              <WorkoutGenerator profile={profile} onSavePlan={handleSavePlan} />
              <div style={{marginTop:16}}>
                <h4>Profile</h4>
                <label>Current weight: 
                  <input 
                    value={profile.currentWeight} 
                    onChange={e=>setProfile({...profile,currentWeight: Number(e.target.value)})} 
                  />
                </label>
                <label>Goal weight: 
                  <input 
                    value={profile.goalWeight} 
                    onChange={e=>setProfile({...profile,goalWeight: Number(e.target.value)})} 
                  />
                </label>
                <label>Days to goal: 
                  <input 
                    value={profile.goalDays} 
                    onChange={e=>setProfile({...profile,goalDays: Number(e.target.value)})} 
                  />
                </label>
                <label>Preferred style:
                  <select 
                    value={profile.prefStyle} 
                    onChange={e=>setProfile({...profile,prefStyle:e.target.value})}>
                    <option value="dance">dance</option>
                    <option value="vibe">vibe</option>
                    <option value="yoga">yoga</option>
                    <option value="cardio">cardio</option>
                    <option value="walk">walk</option>
                  </select>
                </label>
              </div>
            </div>

            <aside>
              <ProgressTracker 
                userProfile={profile} 
                addPoints={(p)=>setProfile({...profile, points: (profile.points||0)+p})} 
              />
              <div style={{marginTop:12}}>
                <h4>Quick Actions</h4>
                <button onClick={()=>{navigator.vibrate ? navigator.vibrate([100,50,100]) : alert("Vibrate not supported")}}>
                  Vibe test (vibrate)
                </button>
              </div>
            </aside>
          </main>
        </>
      )}
    </div>
  );
}
