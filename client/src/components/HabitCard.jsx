import React from 'react';
import { Trash2, Flame, Check } from 'lucide-react';

const HabitCard = ({ habit, onDelete, onComplete }) => {
  const date = new Date();
  const todayStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  const isCompletedToday = habit.completedDates?.includes(todayStr);
  return (
    <div className="bg-white/10 backdrop-blur-lg p-5 sm:p-6 rounded-3xl border border-white/20 shadow-xl hover:shadow-blue-500/20 transition-all duration-500 group relative overflow-hidden flex flex-col h-full hover:-translate-y-1">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex justify-between items-start mb-4 pl-2">
        <div className="flex-1 pr-4">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight drop-shadow-md">{habit.name}</h3>
          <span className="inline-block px-3 py-1 bg-black/30 backdrop-blur-md text-xs text-blue-200 rounded-full border border-white/10 shadow-inner">
            {habit.frequency}
          </span>
          {habit.description && (
            <p className="text-gray-400 text-sm mt-2">{habit.description}</p>
          )}
        </div>
        
        <button 
          onClick={() => onDelete(habit._id)}
          className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
          title="Delete Habit"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="mt-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pl-2">
        <div className="flex items-center space-x-2 text-orange-300 bg-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-orange-400/30 w-full sm:w-auto justify-center shadow-inner">
          <Flame size={18} className="drop-shadow-md text-orange-400" />
          <span className="font-semibold text-sm sm:text-base drop-shadow-md">{habit.currentStreak} Day Streak</span>
        </div>
        
        <button 
          onClick={() => onComplete(habit._id)}
          disabled={isCompletedToday}
          className={`w-full sm:w-auto px-6 py-2.5 font-bold rounded-xl transition-all duration-500 flex items-center justify-center space-x-2 shadow-lg ${
            isCompletedToday 
              ? 'bg-green-500/20 backdrop-blur-md text-green-300 border border-green-500/30 cursor-not-allowed shadow-none' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105'
          }`}
        >
          <Check size={20} className={isCompletedToday ? "text-green-400" : "text-white"} />
          <span>{isCompletedToday ? 'Completed' : 'Complete'}</span>
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
