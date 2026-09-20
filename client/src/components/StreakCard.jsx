import React from 'react';
import { Flame, Trophy } from 'lucide-react';

const StreakCard = ({ habits }) => {
  const currentStreak = habits.reduce((max, h) => Math.max(max, h.currentStreak || 0), 0);
  const longestStreak = habits.reduce((max, h) => Math.max(max, h.longestStreak || 0), 0);

  return (
    <div className="bg-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-white/20 shadow-2xl flex flex-row items-center justify-between h-full gap-2 relative overflow-hidden">
      <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="text-center p-2 sm:p-4 flex-1 relative z-10 bg-black/20 rounded-2xl border border-white/5 mx-1 sm:mx-2 shadow-inner">
        <Flame size={32} className="mx-auto text-orange-400 mb-2 sm:mb-3 animate-bounce drop-shadow-md" />
        <div className="text-orange-200 text-xs sm:text-sm mb-1 uppercase tracking-wider font-semibold drop-shadow-sm mt-2">Current Streak</div>
        <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 whitespace-nowrap drop-shadow-md">
          {currentStreak} <span className="text-sm sm:text-lg text-orange-200/60">Days</span>
        </div>
      </div>
      <div className="text-center p-2 sm:p-4 flex-1 relative z-10 bg-black/20 rounded-2xl border border-white/5 mx-1 sm:mx-2 shadow-inner">
        <Trophy size={32} className="mx-auto text-yellow-400 mb-2 sm:mb-3 drop-shadow-md" />
        <div className="text-yellow-200 text-xs sm:text-sm mb-1 uppercase tracking-wider font-semibold drop-shadow-sm mt-2">Best Streak</div>
        <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 whitespace-nowrap drop-shadow-md">
          {longestStreak} <span className="text-sm sm:text-lg text-yellow-200/60">Days</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;
