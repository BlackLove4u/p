// src/utils/calc.js
export function lbToKg(lb){ return lb / 2.2046226218; }

export function bmrMifflin({sex, weightKg, heightCm, age}){
  if(sex === 'male') return 10*weightKg + 6.25*heightCm - 5*age + 5;
  return 10*weightKg + 6.25*heightCm - 5*age - 161;
}

// calories per step depends on weight & speed approximation
// We'll use: kcal_per_step ≈ 0.04 + (weightKg * 0.0012)
export function kcalPerStep(weightKg){
  return 0.04 + (weightKg * 0.0012);
}

export function dailyPlanFromGoal({ currentLb, targetLb, days }){
  const lossLbs = Math.max(0, currentLb - targetLb);
  const totalKcal = lossLbs * 3500;
  const dailyDeficit = days>0 ? totalKcal / days : 0;
  return { lossLbs, totalKcal, dailyDeficit };
}

// estimate minutes of activity using MET conversion
export function minutesNeededForCalories({ weightKg, met, kcalTarget }){
  // kcal/min = MET * 3.5 * weightKg / 200
  const kcalPerMin = met * 3.5 * weightKg / 200;
  return kcalPerMin > 0 ? Math.ceil(kcalTarget / kcalPerMin) : 0;
}
