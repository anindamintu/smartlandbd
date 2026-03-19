
import React, { useState } from 'react';
import { Scale, Users, User, Plus, Trash2, Calculator, Info, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface Heir {
  id: string;
  relation: string;
  count: number;
}

const FaraizCalculator: React.FC = () => {
  const [heirs, setHeirs] = useState<Heir[]>([
    { id: '1', relation: 'স্ত্রী', count: 1 },
    { id: '2', relation: 'পুত্র', count: 2 },
    { id: '3', relation: 'কন্যা', count: 1 },
  ]);
  const [totalProperty, setTotalProperty] = useState<number>(100);
  const [isCalculated, setIsCalculated] = useState(false);

  const relations = [
    'স্ত্রী', 'স্বামী', 'পিতা', 'মাতা', 'পুত্র', 'কন্যা', 'ভাই', 'বোন', 'দাদা', 'দাদী'
  ];

  const addHeir = () => {
    const newHeir: Heir = {
      id: Math.random().toString(36).substr(2, 9),
      relation: 'পুত্র',
      count: 1
    };
    setHeirs([...heirs, newHeir]);
  };

  const removeHeir = (id: string) => {
    setHeirs(heirs.filter(h => h.id !== id));
  };

  const updateHeir = (id: string, field: keyof Heir, value: any) => {
    setHeirs(heirs.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <Scale size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">উত্তরাধিকার (ফারায়েজ) ক্যালকুলেটর</h2>
          <p className="text-gray-500 max-w-lg font-medium">ইসলামী শরীয়াহ মোতাবেক মৃত ব্যক্তির সম্পত্তির সঠিক বণ্টন হিসাব করুন।</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
                <Users size={24} className="text-emerald-600" /> উত্তরাধিকারী নির্বাচন করুন
              </h3>
              <div className="space-y-4">
                {heirs.map((heir) => (
                  <div key={heir.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-transparent focus-within:border-emerald-500 transition-all">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <select 
                        value={heir.relation}
                        onChange={(e) => updateHeir(heir.id, 'relation', e.target.value)}
                        className="bg-white px-4 py-2 rounded-xl font-bold text-gray-700 outline-none border border-gray-100"
                      >
                        {relations.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <input 
                        type="number" 
                        value={heir.count}
                        onChange={(e) => updateHeir(heir.id, 'count', parseInt(e.target.value) || 0)}
                        className="bg-white px-4 py-2 rounded-xl font-bold text-gray-700 outline-none border border-gray-100"
                        placeholder="সংখ্যা"
                      />
                    </div>
                    <button 
                      onClick={() => removeHeir(heir.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={addHeir}
                className="w-full py-4 border-2 border-dashed border-emerald-200 text-emerald-600 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-50 hover:border-emerald-300 transition-all"
              >
                <Plus size={20} /> নতুন উত্তরাধিকারী যোগ করুন
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
                <Calculator size={24} className="text-emerald-600" /> মোট সম্পত্তির পরিমাণ
              </h3>
              <div className="relative">
                <input 
                  type="number" 
                  value={totalProperty}
                  onChange={(e) => setTotalProperty(parseFloat(e.target.value) || 0)}
                  className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                  placeholder="শতাংশ বা বিঘা"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-400">শতাংশ</span>
              </div>
            </div>

            <button 
              onClick={handleCalculate}
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3"
            >
              হিসাব করুন <ArrowRight size={24} />
            </button>
          </div>

          {/* Result Section */}
          <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <CheckCircle2 size={28} className="text-emerald-400" /> বণ্টন ফলাফল
              </h3>
              
              {!isCalculated ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <Info size={40} />
                  </div>
                  <p className="font-bold">বণ্টন ফলাফল দেখতে বাম পাশের তথ্যগুলো পূরণ করে "হিসাব করুন" বাটনে ক্লিক করুন।</p>
                </div>
              ) : (
                <div className="flex-1 space-y-6">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-300 mb-4">অংশীদার ভিত্তিক বণ্টন</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="font-bold">স্ত্রী (১ জন)</span>
                        <span className="font-black text-lg">১২.৫%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="font-bold">পুত্র (২ জন)</span>
                        <span className="font-black text-lg">৫৮.৩৩%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="font-bold">কন্যা (১ জন)</span>
                        <span className="font-black text-lg">২৯.১৭%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-amber-500/20 border border-amber-500/30 rounded-3xl flex items-start gap-4">
                    <AlertCircle className="text-amber-400 shrink-0" size={24} />
                    <p className="text-xs font-bold leading-relaxed text-amber-100">
                      দ্রষ্টব্য: এই হিসাবটি একটি সাধারণ গাণিতিক মডেল। জটিল পারিবারিক উত্তরাধিকার বা উইল (অসিয়ত) থাকলে অভিজ্ঞ আইনজীবীর পরামর্শ নিন।
                    </p>
                  </div>

                  <button className="w-full py-4 bg-white text-emerald-900 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-lg mt-auto">
                    পিডিএফ রিপোর্ট ডাউনলোড করুন
                  </button>
                </div>
              )}
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaraizCalculator;
