import { useState, useEffect } from 'react';
import axios from 'axios';

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
      const res = await axios.get('/api/habits', getHeaders());
      if (res.data.success) {
        setHabits(res.data.data);
      }
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
      const res = await axios.post('/api/habits', habitData, getHeaders());
      if (res.data.success) {
        setHabits([res.data.data, ...habits]);
        return true;
      }
    } catch (error) {
      console.error('Error adding habit', error);
      return false;
    }
  };

  const deleteHabit = async (id) => {
    try {
      await axios.delete(`/api/habits/${id}`, getHeaders());
      setHabits(habits.filter(h => h._id !== id));
    } catch (error) {
      console.error('Error deleting habit', error);
    }
  };

  const completeHabit = async (id) => {
    try {
      const res = await axios.post(`/api/habits/${id}/complete`, {}, getHeaders());
      if (res.data.success) {
        setHabits(habits.map(h => h._id === id ? res.data.data : h));
        return true;
      }
    } catch (error) {
      console.error('Error completing habit', error);
      return false;
    }
  };

  return { habits, loading, addHabit, deleteHabit, fetchHabits, completeHabit };
};
