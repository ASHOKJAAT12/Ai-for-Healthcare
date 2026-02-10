import { useState } from 'react';
import { api } from '@/lib/api-client';
import { GoalData } from '@/types/database';

export const useGoals = () => {
  const [loading, setLoading] = useState(false);

  const addGoal = async (userId: string, goal: GoalData) => {
    setLoading(true);
    try {
      // Calls link/api/goals/{userId} [cite: 1]
      await api.goals.create(userId, goal);
    } catch (error) {
      console.error("Failed to add goal", error);
    } finally {
      setLoading(false);
    }
  };

  return { addGoal, loading };
};