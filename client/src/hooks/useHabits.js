import { useState, useEffect, useCallback } from 'react';
import api from '../api';

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchHabits = async () => {
    try {
      const res = await api.get('/api/habits', getHeaders());
      setHabits(res.data.data);
    } catch (error) {
      console.error('Error fetching habits', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (habitData) => {
    try {
      const res = await api.post('/api/habits', habitData, getHeaders());
      setHabits([res.data.data, ...habits]);
      return true;
    } catch (error) {
      console.error('Error adding habit', error);
      return false;
    }
  };

  const deleteHabit = async (id) => {
    try {
      await api.delete(`/api/habits/${id}`, getHeaders());
      setHabits(habits.filter(habit => habit._id !== id));
    } catch (error) {
      console.error('Error deleting habit', error);
    }
  };

  const completeHabit = async (id) => {
    try {
      const res = await api.post(`/api/habits/${id}/complete`, {}, getHeaders());
      setHabits(habits.map(habit => habit._id === id ? res.data.data : habit));
      return true;
    } catch (error) {
      console.error('Error completing habit', error);
      return false;
    }
  };

  return { habits, loading, addHabit, deleteHabit, fetchHabits, completeHabit };
};
