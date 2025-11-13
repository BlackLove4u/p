// src/components/ProgressTracker.jsx
import React, {useState, useEffect} from "react";
import { loadProfile, saveProfile } from "../utils/storage";

export default function ProgressTracker({ userProfile, addPoints }){
  const [profile, setProfile] = useState(userProfile || loadProfile() || { points:0, streak:0, lastCheck:null });

  useEffect(()=> {
    saveProfile(profile);
  },[profile]);

  function checkIn(doneToday=false, points=10){
    const today = new Date().toDateString();
    let newStreak = profile.streak || 0;
    if(profile.lastCheck !== today && doneToday){
      newStreak = (profile.lastCheck === new Date(Date.now()-86400000).toDateString()) ? profile.streak+1 : 1;
    }
    const newPoints = (profile.points || 0) + (doneToday ? points : 0);
    const updated = {...profile, points:newPoints, streak:newStreak, lastCheck: today};
    setProfile(updated);
    if(addPoints) addPoints(points);
  }

  return (
    <div className="tracker-card">
      <h3>Progress</h3>
      <p>Points: <strong>{profile.points}</strong></p>
      <p>Streak: <strong>{profile.streak} days</strong></p>
      <button onClick={()=>checkIn(true, 20)}>I completed my workout today ✅</button>
      <button onClick={()=>checkIn(false, 0)}>Skip (rest)</button>
    </div>
  );
}
