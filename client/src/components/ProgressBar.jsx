import React from 'react';

const ProgressBar = ({ habits }) => {
  const date = new Date();
  const todayStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

  const total = habits.length;
  const completed = habits.filter(h => h.completedDates?.includes(todayStr)).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-[-50%] right-[-10%] w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">Today's Progress</h3>
      <div className="flex justify-between text-sm text-blue-200 mb-3 drop-shadow-sm">
        <span className="font-semibold">{completed} / {total} completed</span>
        <span className="font-bold text-white text-lg">{percentage}%</span>
      </div>
      <div className="w-full bg-black/40 backdrop-blur-md rounded-full h-5 overflow-hidden shadow-inner border border-white/5">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-400 h-4 rounded-full transition-all duration-1000 ease-out relative" 
          style={{ width: `${percentage}%` }}
        >
          {percentage > 0 && <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
