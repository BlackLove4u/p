const workouts = [
  { name: "🔥 Hip-Hop Step Routine", minutes: 20, calories: 150 },
  { name: "💃 Vibration Power Burn", minutes: 15, calories: 100 },
  { name: "🧘 Mindful Flow Stretch", minutes: 25, calories: 120 },
  { name: "🥊 Cardio Kick & Groove", minutes: 30, calories: 200 },
  { name: "🚶 Walk of Power", minutes: 10, calories: 50 }
];

document.getElementById("generateBtn").addEventListener("click", () => {
  const currentWeight = parseFloat(document.getElementById("currentWeight").value);
  const goalWeight = parseFloat(document.getElementById("goalWeight").value);
  const goalDays = parseInt(document.getElementById("goalDays").value);
  const output = document.getElementById("output");

  if (!currentWeight || !goalWeight || !goalDays) {
    output.innerHTML = "<p>Please fill out all fields.</p>";
    return;
  }

  const goalLoss = currentWeight - goalWeight;
  const totalCaloriesNeeded = goalLoss * 3500; // 1 lb = 3500 cal
  const dailyCaloriesBurn = totalCaloriesNeeded / goalDays;

  const dailyPlan = workouts.filter(w => w.calories <= dailyCaloriesBurn + 75);
  const selectedWorkout = dailyPlan[Math.floor(Math.random() * dailyPlan.length)] || workouts[0];

  output.innerHTML = `
    <h3>Your Daily Shuffle:</h3>
    <p>🏋️ ${selectedWorkout.name}</p>
    <p>⏱ Duration: ${selectedWorkout.minutes} minutes</p>
    <p>🔥 Est. Calories: ${selectedWorkout.calories}</p>
    <p>💬 Motivation: "You don’t need to be perfect, just consistent."</p>
  `;
});
