const calculateStreak = (completedDates) => {
  if (!completedDates || completedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Sort dates descending
  const sorted = [...completedDates].sort((a, b) => new Date(b) - new Date(a));
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if latest completion is today or yesterday
  const lastDate = new Date(sorted[0]);
  lastDate.setHours(0,0,0,0);

  if (lastDate.getTime() === today.getTime() || lastDate.getTime() === yesterday.getTime()) {
    currentStreak = 1;
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = new Date(sorted[i]);
      const next = new Date(sorted[i + 1]);
      current.setHours(0,0,0,0);
      next.setHours(0,0,0,0);
      
      const diffTime = Math.abs(current - next);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i]);
    const next = new Date(sorted[i + 1]);
    current.setHours(0,0,0,0);
    next.setHours(0,0,0,0);
    
    const diffTime = Math.abs(current - next);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  // If there's only 1 item, longest streak is 1
  if (sorted.length === 1) {
    longestStreak = 1;
  }

  return { currentStreak, longestStreak };
};

module.exports = { calculateStreak };
