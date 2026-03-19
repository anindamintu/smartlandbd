
import React, { useState } from 'react';
import { Target, Ruler, Layers, RefreshCw, Info, CheckCircle2, ArrowRight, Map as MapIcon } from 'lucide-react';

const LandMeasurement: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'measure' | 'summation'>('measure');
  
  // Measurement State
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [unit, setUnit] = useState<'feet' | 'meter' | 'link'>('feet');

  // Summation State
  const [sumAcres, setSumAcres] = useState<string>('');
  const [sumBigha, setSumBigha] = useState<string>('');
  const [sumKatha, setSumKatha] = useState<string>('');
  const [sumDecimal, setSumDecimal] = useState<string>('');
  const [sumSqFt, setSumSqFt] = useState<string>('');

  const areaInSqFt = activeMode === 'measure' 
    ? (unit === 'feet' ? length * width : 
       unit === 'meter' ? (length * 3.28084) * (width * 3.28084) :
       (length * 0.66) * (width * 0.66))
    : ((parseFloat(sumAcres) || 0) * 43560) + 
      ((parseFloat(sumBigha) || 0) * 14400) + 
      ((parseFloat(sumKatha) || 0) * 720) + 
      ((parseFloat(sumDecimal) || 0) * 435.6) + 
      (parseFloat(sumSqFt) || 0);

  const results = {
    sqFt: areaInSqFt.toFixed(2),
    decimal: (areaInSqFt / 435.6).toFixed(2),
    katha: (areaInSqFt / 720).toFixed(2),
    bigha: (areaInSqFt / 14400).toFixed(2),
    acre: (areaInSqFt / 43560).toFixed(2)
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <Target size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">ডিজিটাল ভূমি পরিমাপ টুল</h2>
          <p className="text-gray-500 max-w-lg font-medium">সহজেই আপনার জমির দৈর্ঘ্য ও প্রস্থ দিয়ে অথবা বিভিন্ন এককের যোগফল দিয়ে সঠিক ক্ষেত্রফল বের করুন।</p>
        </div>

        {/* Mode Selector */}
        <div className="flex p-1.5 bg-gray-100 rounded-2xl max-w-md mx-auto mb-10">
          <button 
            onClick={() => setActiveMode('measure')}
            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${activeMode === 'measure' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Ruler size={18} /> দৈর্ঘ্য-প্রস্থ পদ্ধতি
          </button>
          <button 
            onClick={() => setActiveMode('summation')}
            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${activeMode === 'summation' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Layers size={18} /> মাল্টি-ইউনিট ইনপুট
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-8">
            {activeMode === 'measure' ? (
              <>
                <div className="flex gap-4 p-2 bg-gray-100 rounded-2xl">
                  {[
                    { id: 'feet', label: 'ফুট (Feet)' },
                    { id: 'meter', label: 'মিটার (Meter)' },
                    { id: 'link', label: 'লিঙ্ক (Link)' }
                  ].map(u => (
                    <button 
                      key={u.id}
                      onClick={() => setUnit(u.id as any)}
                      className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${unit === u.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                      <Ruler size={14}/> দৈর্ঘ্য (Length)
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={length || ''}
                        onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                        className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                        placeholder="০.০০"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-400">{unit === 'feet' ? 'ফুট' : unit === 'meter' ? 'মিটার' : 'লিঙ্ক'}</span>
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                      <Layers size={14}/> প্রস্থ (Width)
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={width || ''}
                        onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                        className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                        placeholder="০.০০"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-400">{unit === 'feet' ? 'ফুট' : unit === 'meter' ? 'মিটার' : 'লিঙ্ক'}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">একর (Acre)</label>
                    <input 
                      type="number" 
                      value={sumAcres}
                      onChange={(e) => setSumAcres(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বিঘা (Bigha)</label>
                    <input 
                      type="number" 
                      value={sumBigha}
                      onChange={(e) => setSumBigha(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">কাঠা (Katha)</label>
                    <input 
                      type="number" 
                      value={sumKatha}
                      onChange={(e) => setSumKatha(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">শতাংশ (Decimal)</label>
                    <input 
                      type="number" 
                      value={sumDecimal}
                      onChange={(e) => setSumDecimal(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বর্গফুট (Sq. Ft)</label>
                    <input 
                      type="number" 
                      value={sumSqFt}
                      onChange={(e) => setSumSqFt(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSumAcres(''); setSumBigha(''); setSumKatha(''); setSumDecimal(''); setSumSqFt('');
                  }}
                  className="w-full py-3 text-gray-400 hover:text-emerald-600 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} /> ইনপুট রিসেট করুন
                </button>
              </div>
            )}

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] flex items-start gap-4">
              <Info className="text-blue-600 shrink-0" size={24} />
              <p className="text-xs font-bold leading-relaxed text-blue-800">
                {activeMode === 'measure' 
                  ? 'টিপস: জমি যদি আয়তাকার না হয়, তবে গড় দৈর্ঘ্য ও গড় প্রস্থ ব্যবহার করুন অথবা জমিকে একাধিক ত্রিভুজে ভাগ করে হিসাব করুন।'
                  : 'টিপস: আপনার কাছে থাকা বিভিন্ন এককের জমির পরিমাণগুলো এখানে লিখুন। স্বয়ংক্রিয়ভাবে সবগুলোর যোগফল ডানে প্রদর্শিত হবে।'}
              </p>
            </div>
          </div>

          {/* Result Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'বর্গফুট', value: results.sqFt, unit: 'Sq. Ft', color: 'bg-white' },
              { label: 'শতাংশ', value: results.decimal, unit: 'Decimal', color: 'bg-emerald-50 border-emerald-100' },
              { label: 'কাঠা', value: results.katha, unit: 'Katha', color: 'bg-white' },
              { label: 'বিঘা', value: results.bigha, unit: 'Bigha', color: 'bg-white' },
              { label: 'একর', value: results.acre, unit: 'Acre', color: 'bg-white' },
              { label: 'মৌজা ম্যাপ', value: 'দেখুন', unit: 'Map', color: 'bg-emerald-600 text-white', icon: MapIcon }
            ].map((res, i) => (
              <div key={i} className={`p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${res.color}`}>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${res.color.includes('emerald-600') ? 'text-emerald-200' : 'text-gray-400'}`}>{res.label}</p>
                  <p className="text-2xl font-black tracking-tight">{res.value}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${res.color.includes('emerald-600') ? 'text-emerald-100' : 'text-emerald-600'}`}>{res.unit}</span>
                  {res.icon && <res.icon size={16} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Table */}
      <div className="bg-emerald-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <RefreshCw size={28} className="text-emerald-400" /> পরিমাপের এককসমূহ (এক নজরে)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">শতাংশ ও কাঠা</p>
              <ul className="space-y-2 text-sm font-medium text-emerald-100/80">
                <li>১ শতাংশ = ৪৩৫.৬ বর্গফুট</li>
                <li>১ কাঠা = ৭২০ বর্গফুট</li>
                <li>১ কাঠা = ১.৬৫ শতাংশ</li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">বিঘা ও একর</p>
              <ul className="space-y-2 text-sm font-medium text-emerald-100/80">
                <li>১ বিঘা = ৩৩ শতাংশ</li>
                <li>১ একর = ১০০ শতাংশ</li>
                <li>১ একর = ৩ বিঘা ৮ ছটাক</li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">অন্যান্য</p>
              <ul className="space-y-2 text-sm font-medium text-emerald-100/80">
                <li>১ লিঙ্ক = ০.৬৬ ফুট</li>
                <li>১ মিটার = ৩.২৮ ফুট</li>
                <li>১ হেক্টর = ২.৪৭ একর</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] -mr-32 -mb-32" />
      </div>
    </div>
  );
};

export default LandMeasurement;
