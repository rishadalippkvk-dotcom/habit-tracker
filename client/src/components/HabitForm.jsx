import { useState } from 'react';
import { X as CloseIcon, Plus } from 'lucide-react';

const HabitForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    
    const success = await onAdd({ name, description, frequency });
    if (success) {
      setName('');
      setDescription('');
      setFrequency('Daily');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:text-white hover:border-blue-500 hover:bg-gray-800 transition duration-300 font-medium text-lg flex items-center justify-center space-x-2"
      >
        <span>+ Create New Habit</span>
      </button>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden mb-8 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-semibold text-white drop-shadow-md">New Habit</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
          <CloseIcon size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What habit do you want to build?"
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder-gray-400 text-lg shadow-inner"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all appearance-none cursor-pointer shadow-inner backdrop-blur-md"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
            
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition duration-300 whitespace-nowrap shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
