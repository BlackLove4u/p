// src/components/WorkoutGenerator.jsx
import React, {useState} from "react";
import { lbToKg, dailyPlanFromGoal, kcalPerStep, minutesNeededForCalories } from "../utils/calc";

const WORKOUT_POOL = [
  { id:1, name: "Hip Hop Step Circuit", met:5.5, minsBase:15, pts:30, type:'dance' },
  { id:2, name: "Vibration Power Routine", met:4.5, minsBase:12, pts:25, type:'vibe' },
  { id:3, name: "Mindful Chair Yoga", met:3.0, minsBase:15, pts:15, type:'yoga' },
  { id:4, name: "Cardio Kick", met:7.0, minsBase:20, pts:40, type:'cardio' },
  { id:5, name: "Walk & Groove", met:4.0, minsBase:20, pts:20, type:'walk' }
];

function chooseRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

export default function WorkoutGenerator({ profile, onSavePlan }){
  const [ratio, setRatio] = useState(0.5); // steps/exercise split (0–1 => % to steps)
  const [plan, setPlan] = useState(null);

  function generate(){
    const current = profile.currentWeight;
    const target = profile.goalWeight;
    const days = profile.goalDays || 30;
    const { dailyDeficit } = dailyPlanFromGoal({ currentLb: current, targetLb: target, days });
    const weightKg = lbToKg(current);

    const stepsKcal = dailyDeficit * ratio;
    const exerciseKcal = Math.max(0, dailyDeficit - stepsKcal);

    const perStep = kcalPerStep(weightKg);
    const stepsNeeded = Math.ceil(stepsKcal / perStep);

    // pick exercise by preference or random
    const pick = profile.prefStyle 
      ? WORKOUT_POOL.find(w => w.type === profile.prefStyle) || chooseRandom(WORKOUT_POOL)
      : chooseRandom(WORKOUT_POOL);

    const minutes = minutesNeededForCalories({ weightKg, met: pick.met, kcalTarget: exerciseKcal });

    const gamified = {
      stepsNeeded, minutes, exercise: pick, points: Math.max(10, Math.round(minutes + stepsNeeded/200))
    };

    setPlan(gamified);
    if(onSavePlan) onSavePlan(gamified);
  }

  return (
    <div className="generator-card">
      <h3>Shuffle Generator</h3>
      <label>Steps / Exercise ratio: {Math.round(ratio*100)}% steps</label>
      <input type="range" value={ratio} min="0" max="1" step="0.05" onChange={e=>setRatio(Number(e.target.value))} />
      <button onClick={generate}>Generate Plan</button>

      {plan && (
        <div className="plan">
          <h4>{plan.exercise.name}</h4>
          <p>Steps to aim: <strong>{plan.stepsNeeded.toLocaleString()}</strong></p>
          <p>Exercise time: <strong>{plan.minutes} min</strong></p>
          <p>Points if completed: <strong>{plan.points}</strong></p>
        </div>
      )}
    </div>
  );
}
