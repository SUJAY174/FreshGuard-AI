
import React, { useState, useEffect } from 'react';
import { FoodItem } from './types';
import { db } from './services/dbService';
import AddFoodModal from './components/AddFoodModal';
import PredictorDashboard from './components/PredictorDashboard';

const App: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [view, setView] = useState<'active' | 'history'>('active');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const loadedItems = db.getItems();
    setItems(loadedItems);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleAddItem = (item: FoodItem) => {
    db.addItem(item);
    setItems([...items, item]);
  };

  const handleUpdateStatus = (id: string, status: 'active' | 'consumed' | 'discarded') => {
    db.updateItem(id, { status });
    setItems(items.map(item => item.id === id ? { ...item, status } : item));
  };

  const handleReview = (id: string, rating: number, comment: string, actual: 'as_predicted' | 'better' | 'worse') => {
    db.updateItem(id, { review: { rating, comment, actualFreshness: actual } });
    setItems(items.map(item => item.id === id ? { ...item, review: { rating, comment, actualFreshness: actual } } : item));
  };

  const activeItems = items.filter(i => i.status === 'active');
  const historyItems = items.filter(i => i.status !== 'active');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20">
      {/* Premium Navigation */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-[#121214]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <i className="fa-solid fa-shield-virus text-white text-lg"></i>
              </div>
              <div className="hidden xs:block">
                <h1 className="text-xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                  FreshGuard AI
                </h1>
                <p className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-widest">Neural Preservation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-6">
              <nav className="flex items-center bg-slate-100 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                <button 
                  onClick={() => setView('active')}
                  className={`px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-all ${view === 'active' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  Predict
                </button>
                <button 
                  onClick={() => setView('history')}
                  className={`px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-all ${view === 'history' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  Logs
                </button>
              </nav>

              <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4 ml-2 sm:pl-6 sm:ml-0">
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-105 active:scale-95 transition"
                >
                  <i className={`fa-solid ${isDarkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-blue-600'}`}></i>
                </button>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 sm:w-auto sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-black transition shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span className="hidden sm:inline">Add Food</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {view === 'active' ? (
          <PredictorDashboard 
            items={activeItems} 
            onUpdate={handleUpdateStatus}
            onReview={handleReview}
          />
        ) : (
          <div className="bg-white dark:bg-[#121214] rounded-[40px] shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">Historical Archives</h2>
                <p className="text-slate-400 font-medium">Tracking your success rate and minimizing household waste.</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-xs font-black uppercase">
                {historyItems.length} Entries Recorded
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50 dark:border-slate-800">
                    <th className="pb-6 px-4">Asset</th>
                    <th className="pb-6">Outcome</th>
                    <th className="pb-6">Sentiment</th>
                    <th className="pb-6">Calibration</th>
                    <th className="pb-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {historyItems.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                             {item.image && <img src={item.image} className="w-full h-full object-cover" />}
                           </div>
                           <div>
                             <div className="font-bold text-slate-800 dark:text-slate-200">{item.name}</div>
                             <div className="text-[10px] font-black text-slate-400 uppercase">{item.category}</div>
                           </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase ${item.status === 'consumed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-6 max-w-xs">
                        {item.review ? (
                          <div className="text-xs text-slate-500 dark:text-slate-400 italic truncate" title={item.review.comment}>
                            "{item.review.comment || 'Performance as expected.'}"
                          </div>
                        ) : (
                          <span className="text-xs text-slate-300 dark:text-slate-600">No telemetry</span>
                        )}
                      </td>
                      <td className="py-6">
                        {item.review ? (
                          <div className="flex items-center gap-2">
                             <div className="flex gap-0.5 text-yellow-400 text-[10px]">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fa-solid fa-star ${i >= item.review!.rating ? 'text-slate-200 dark:text-slate-700' : ''}`}></i>
                              ))}
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase">({item.review.actualFreshness.replace('_', ' ')})</span>
                          </div>
                        ) : '--'}
                      </td>
                      <td className="py-6 text-right px-4">
                        <button 
                          onClick={() => {
                            db.deleteItem(item.id);
                            setItems(items.filter(i => i.id !== item.id));
                          }}
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 dark:text-slate-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {historyItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-32 text-center">
                        <div className="max-w-xs mx-auto">
                           <i className="fa-solid fa-database text-slate-200 dark:text-slate-800 text-6xl mb-4"></i>
                           <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Historical metrics will manifest once monitoring events conclude.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <AddFoodModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddItem}
      />

      {/* Footer / Mobile Nav */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#121214]/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 py-4 sm:hidden px-6 z-50">
        <div className="flex justify-around items-center">
          <button onClick={() => setView('active')} className={`flex flex-col items-center gap-1.5 transition ${view === 'active' ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-slate-400 dark:text-slate-600'}`}>
            <i className="fa-solid fa-chart-line text-lg"></i>
            <span className="text-[9px] font-black uppercase tracking-widest">Predict</span>
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-14 h-14 rounded-2xl -mt-12 border-[6px] border-slate-50 dark:border-[#0a0a0c] flex items-center justify-center shadow-xl shadow-blue-500/20 active:scale-90 transition">
            <i className="fa-solid fa-plus text-lg"></i>
          </button>
          <button onClick={() => setView('history')} className={`flex flex-col items-center gap-1.5 transition ${view === 'history' ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-slate-400 dark:text-slate-600'}`}>
            <i className="fa-solid fa-layer-group text-lg"></i>
            <span className="text-[9px] font-black uppercase tracking-widest">Logs</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
