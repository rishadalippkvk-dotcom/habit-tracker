import React from 'react';

const Statistics = ({ habits }) => {
  const totalHabits = habits.length;
  
  const date = new Date();
  const todayStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  
  const completedToday = habits.filter(h => h.completedDates?.includes(todayStr)).length;
  const completionRate = totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits) * 100);
  
  const currentStreak = habits.reduce((max, h) => Math.max(max, h.currentStreak || 0), 0);
  const longestStreak = habits.reduce((max, h) => Math.max(max, h.longestStreak || 0), 0);

  if (totalHabits === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-md relative z-10">Global Statistics</h3>
      <div className="space-y-6 relative z-10">
        <div>
          <div className="flex justify-between text-blue-200 text-sm mb-2 drop-shadow-sm">
            <span>Total Habits</span>
            <span className="font-bold text-white text-lg">{totalHabits}</span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-4 shadow-inner overflow-hidden border border-white/5">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-4 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-blue-200 text-sm mb-2 drop-shadow-sm">
            <span>Completed Today</span>
            <span className="font-bold text-white text-lg">{completedToday}</span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-4 shadow-inner overflow-hidden border border-white/5">
             <div className="bg-gradient-to-r from-green-400 to-emerald-300 h-4 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-white/10">
          <div className="text-center p-4 bg-black/20 rounded-2xl shadow-inner border border-white/5">
            <div className="text-sm text-orange-200/80 mb-1 font-medium">Max Current</div>
            <div className="text-3xl font-bold text-orange-400 drop-shadow-md">{currentStreak}</div>
          </div>
          <div className="text-center p-4 bg-black/20 rounded-2xl shadow-inner border border-white/5">
            <div className="text-sm text-yellow-200/80 mb-1 font-medium">Max All-Time</div>
            <div className="text-3xl font-bold text-yellow-400 drop-shadow-md">{longestStreak}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
