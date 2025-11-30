import React, { useState } from 'react';
import { Target, CheckCircle } from 'lucide-react';
import { allAchievements } from '../data/mockData';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ProgressPage = ({ user }) => {
  // State for user's goals, initialized from user prop
  // TODO: Add useEffect to fetch goals from /api/goals (Section 3.4)
  const [goals, setGoals] = useState(user.goals || []);
  const [newGoalText, setNewGoalText] = useState('');

  // Handler for adding a new goal
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return; // Don't add empty goals

    // API Call: POST /api/goals (Section 3.4)
    console.log("Setting new goal:", newGoalText);
    
    // Add new goal to the state (optimistic update)
    setGoals([...goals, newGoalText]);
    // Clear input
    setNewGoalText('');
  };
  
  // Handler for marking a goal complete (for demo, just removes it)
  const handleCompleteGoal = (goalToComplete) => {
    // API Call: PUT /api/goals/:id (Section 3.4)
    console.log("Completing goal:", goalToComplete);
    
    // Optimistic update
    setGoals(goals.filter(goal => goal !== goalToComplete));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">My Progress & Goals</h1>
      
      {/* --- Goal Management (Section 3.4) --- */}
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Goals</h2>
        {/* New Goal Form */}
        <form onSubmit={handleAddGoal} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
          <Input
            id="newGoal"
            label="Set a new goal"
            type="text"
            placeholder="e.g., Run a 5k"
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="primary" className="sm:mt-6">Set Goal</Button>
        </form>
        
        {/* Current Goals List */}
        <div className="space-y-2">
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-800">{goal}</span>
                <Button variant="secondary" className="px-2 py-1 text-sm" onClick={() => handleCompleteGoal(goal)}>
                  <CheckCircle className="h-4 w-4 mr-1" /> Mark Complete
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You haven't set any goals yet. Add one above!</p>
          )}
        </div>
      </Card>
      
      {/* --- Achievement Gallery (Section 2.6) --- */}
      {/* TODO: Add useEffect to fetch this from /api/gamification/badges (Section 3.6) */}
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Achievement Gallery</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {allAchievements.map(ach => {
            const isLocked = ach.locked;
            return (
              <div
                key={ach.id}
                className={`flex flex-col items-center text-center p-4 rounded-lg ${
                  isLocked ? 'bg-gray-100 opacity-60' : 'bg-yellow-50'
                }`}
              >
                <div className={`p-3 rounded-full ${
                  isLocked ? 'bg-gray-300' : 'bg-yellow-200'
                }`}>
                  <ach.icon className={`h-8 w-8 ${
                    isLocked ? 'text-gray-500' : 'text-yellow-600'
                  }`} />
                </div>
                <h4 className={`mt-2 font-semibold text-sm ${
                  isLocked ? 'text-gray-600' : 'text-gray-900'
                }`}>{ach.title}</h4>
                <p className="text-xs text-gray-500">{ach.description}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ProgressPage;