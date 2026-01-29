"use client";
import { useGoals } from '@/hooks/useGoals';
import { useState } from 'react';

export default function GoalPlanner() {
  const { addGoal, loading } = useGoals();
  // Assume we retrieved the logged-in userId from context or local storage
  const userId = "USER_ID_FROM_AUTH"; 

  const handleCreateGoal = () => {
    addGoal(userId, {
      title: "Lose Weight",
      description: "Diet and exercise", // [cite: 1]
      target: 70,
      timeframe: "6 months"
    });
  };

  return (
    <button onClick={handleCreateGoal} disabled={loading}>
      {loading ? 'Saving...' : 'Create Goal'}
    </button>
  );
}