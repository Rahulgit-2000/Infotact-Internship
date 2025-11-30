import {
  Flame, Target, Zap, Award, Utensils, Brain,
} from 'lucide-react';

// --- UPDATED: Added 'role' ---
export const mockUserData = {
  id: 'u1',
  name: 'Alex Johnson', // From Section 2.1
  email: 'alex@example.com',
  role: 'user', // <-- NEW
  age: 29,
  gender: 'Male',
  height: 180, // cm
  weight: 75, // kg
  activityLevel: 'Active',
  goals: ['Lose Weight', 'Gain Muscle'], // <-- These are the user's starting goals
  dietaryPreferences: 'Low Carb, Vegetarian',
  allergies: 'Peanuts',
  // From Section 2.6 (Gamification)
  gamification: {
    points: 1250,
    streak: 5, // days
  }
};

// --- NEW: Admin User ---
export const mockAdminUser = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@app.com',
  role: 'admin', // <-- NEW
  gamification: { points: 0, streak: 0 } // Admin doesn't need points
};

// --- NEW: All Users list for Admin Page (Section 3.1) ---
export const mockAllUsers = [
  { ...mockUserData }, // Include our main user
  { id: 'u2', name: 'Jane Doe', email: 'jane@example.com', role: 'user', age: 34, goals: ['Reduce Stress'] },
  { id: 'u3', name: 'Mike Smith', email: 'mike@example.com', role: 'user', age: 42, goals: ['Improve Sleep'] },
  { id: 'u4', name: 'Dr. Sarah Chen', email: 'sarah.chen@experts.com', role: 'expert', age: 45, goals: [] },
  { id: 'u5', name: 'David Lee', email: 'david.lee@experts.com', role: 'expert', age: 38, goals: [] },
];


export const mockBiometrics = {
  weight: [
    { date: 'Mon', value: 75.5 },
    { date: 'Tue', value: 75.2 },
    { date: 'Wed', value: 75.3 },
    { date: 'Thu', value: 75.0 },
    { date: 'Fri', value: 74.8 },
    { date: 'Sat', value: 74.9 },
    { date: 'Sun', value: 74.6 },
  ],
  sleep: [
    { date: 'Mon', value: 7.2 },
    { date: 'Tue', value: 6.8 },
    { date: 'Wed', value: 7.5 },
    { date: 'Thu', value: 8.0 },
    { date: 'Fri', value: 6.5 },
    { date: 'Sat', value: 7.8 },
    { date: 'Sun', value: 7.0 },
  ],
  heartRate: 68, // Last reading
  bloodPressure: '118/76', // Last reading
  steps: 8120, // Today
};


// From Section 2.6 (Gamification)
// This is what the user HAS earned (for the dashboard)
export const mockAchievements = [
  { id: 'a1', icon: Flame, title: '5-Day Streak', description: 'Logged activity 5 days in a row.' },
  { id: 'a2', icon: Target, title: 'Goal Setter', description: 'Completed your first health goal.' },
  { id: 'a3', icon: Zap, title: 'First Workout', description: 'Logged your first workout.' },
  { id: 'a4', icon: Award, title: '10k Steps', description: 'Walked 10,000 steps in a day.' },
];

// This is ALL achievements (locked and unlocked) for the Progress page
export const allAchievements = [
  ...mockAchievements, // Include all the ones they've earned
  { id: 'a5', icon: Award, title: '30-Day Streak', description: 'Log activity 30 days in a row.', locked: true },
  { id: 'a6', icon: Zap, title: 'Marathoner', description: 'Log a run over 20km.', locked: true },
  { id: 'a7', icon: Utensils, title: 'Clean Eater', description: 'Log 7 consecutive healthy meals.', locked: true },
  { id: 'a8', icon: Brain, title: 'Mindful Master', description: 'Complete 10 mindfulness sessions.', locked: true },
];


export const mockAiPlans = {
  fitness: {
    title: "Alex's 3-Day Weight Loss Plan",
    summary: "This plan focuses on a mix of cardio and full-body strength training.",
    schedule: [
      { day: 'Monday', workout: 'Full Body Strength (A)', focus: 'Squats, Bench Press, Rows' },
      { day: 'Wednesday', workout: 'Cardio & Core', focus: '30 min HIIT, 15 min Core Circuit' },
      { day: 'Friday', workout: 'Full Body Strength (B)', focus: 'Deadlifts, Overhead Press, Pull-ups' },
    ]
  },
  nutrition: {
    title: "Low Carb, High Protein Meal Plan",
    summary: "Designed to support your weight loss goal and activity level.",
    schedule: [
      { meal: 'Breakfast', food: 'Scrolled Eggs with Spinach and Avocado' },
      { meal: 'Lunch', food: 'Grilled Chicken Salad with Olive Oil Vinaigrette' },
      { meal: 'Dinner', food: 'Baked Salmon with Roasted Asparagus' },
      { meal: 'Snack', food: 'Greek Yogurt with Berries' },
    ]
  },
  mindfulness: {
    title: "Evening Wind-Down",
    summary: "A 10-minute guided meditation to improve sleep quality.",
    steps: [
      { step: 1, action: 'Find a comfortable, quiet space.' },
      { step: 2, action: 'Focus on your breath, inhaling for 4s, holding for 4s, exhaling for 6s.' },
      { step: 3, action: 'Perform a full-body scan, releasing tension from your toes to your head.' },
      { step: 4, action: 'Continue for 10 minutes.' },
    ]
  }
};

export const mockCommunityPosts = [
  { id: 'p1', user: 'Jane Doe', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=JD', text: 'Just hit my 5k run goal! Feeling amazing. Thanks for the motivation everyone! #running #goals', likes: 42, comments: 5 },
  { id: 'p2', user: 'Mike Smith', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=MS', text: 'Does anyone have good low-carb snack ideas? I am running out of inspiration.', likes: 18, comments: 12 },
];

export const mockCommunityGroups = [
  { id: 'g1', name: 'Marathon Runners', members: 1200, icon: Zap },
  { id: 'g2', name: 'Low Carb Eaters', members: 450, icon: Utensils },
  { id: 'g3', name: 'Meditation Zone', members: 890, icon: Brain },
];