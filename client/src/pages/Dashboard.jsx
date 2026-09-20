import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useHabits } from '../hooks/useHabits';
import HabitForm from '../components/HabitForm';
import HabitCard from '../components/HabitCard';
import ProgressBar from '../components/ProgressBar';
import StreakCard from '../components/StreakCard';
import Calendar from '../components/Calendar';
import Statistics from '../components/Statistics';
import { PartyPopper, Leaf } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { habits, loading, addHabit, deleteHabit, completeHabit } = useHabits();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-6 md:p-8">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <header className="relative flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10 max-w-5xl mx-auto gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-center md:text-left">
          Habit Tracker
        </h1>
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
          <span className="text-gray-300 font-medium truncate">Hello, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-lg transition duration-300 border border-white/10 shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        
        {habits.length > 0 && (
          <div className="mt-12 text-center text-gray-400 p-10 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            <p className="text-lg relative z-10 flex items-center justify-center gap-2">You've completed all your habits for today! <PartyPopper className="text-yellow-400" /></p>
          </div>
        )}

        {habits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ProgressBar habits={habits} />
            <StreakCard habits={habits} />
          </div>
        )}

        <HabitForm onAdd={addHabit} />

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-200 flex items-center space-x-3">
            <span>Your Habits</span>
            <span className="text-sm bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-blue-300 border border-white/10">
              {habits.length}
            </span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : habits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => (
                <HabitCard 
                  key={habit._id} 
                  habit={habit} 
                  onDelete={deleteHabit} 
                  onComplete={completeHabit}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 text-center border border-white/10 shadow-2xl">
              <Leaf size={64} className="mx-auto mb-4 text-green-400/80 drop-shadow-md" />
              <h3 className="text-xl font-medium text-gray-300 mb-2">No habits yet</h3>
              <p className="text-gray-500">Create your first habit above to start tracking!</p>
            </div>
          )}
        </div>

        {habits.length > 0 && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Statistics habits={habits} />
            <Calendar habits={habits} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
