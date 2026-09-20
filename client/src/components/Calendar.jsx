import React from 'react';
import { Check, X } from 'lucide-react';

const Calendar = ({ habits }) => {
  // Simplistic 7-day calendar for the MVP
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const str = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    return {
      dateObj: d,
      dateStr: str,
      dayName: days[d.getDay()],
      dayNum: d.getDate()
    };
  });

  if (habits.length === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl overflow-x-auto relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-md relative z-10">Activity History</h3>
      <div className="min-w-[500px] relative z-10">
        <div className="grid grid-cols-8 gap-4 mb-4 text-center text-blue-200 text-sm drop-shadow-sm">
          <div className="text-left font-semibold pl-2">Habit</div>
          {last7Days.map(d => (
            <div key={d.dateStr} className={`${d.dateStr === (today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')) ? 'text-blue-400 font-bold' : ''}`}>
              <div>{d.dayName}</div>
              <div className="text-xs opacity-75">{d.dayNum}</div>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          {habits.map(habit => (
            <div key={habit._id} className="grid grid-cols-8 gap-4 items-center text-center bg-black/20 p-2 rounded-xl border border-white/5 shadow-inner transition-all hover:bg-black/30">
              <div className="text-left text-sm text-white truncate font-medium pl-2 drop-shadow-md" title={habit.name}>
                {habit.name}
              </div>
              {last7Days.map(d => {
                const isCompleted = habit.completedDates?.includes(d.dateStr);
                return (
                  <div key={d.dateStr} className="flex justify-center">
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-green-500/30 text-green-300 flex items-center justify-center border border-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.4)] backdrop-blur-md">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-black/40 text-gray-500 flex items-center justify-center border border-white/5 shadow-inner">
                        <X size={16} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
