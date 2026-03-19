
import React, { useState } from 'react';
// Added FileText to the import list to fix "Cannot find name 'FileText'" error on line 188
import { Calculator, RefreshCw, Landmark, MapPin, Layers, Info, CheckCircle2, ArrowRight, Download, CreditCard, Calendar, AlertCircle, FileText } from 'lucide-react';

type LandCategory = 'Agricultural' | 'Residential' | 'Commercial' | 'Industrial';
type DetailedLocation = 'DhakaChittagongCity' | 'OtherCityCorp' | 'DistrictMunicipality' | 'OtherMunicipality' | 'Union';

const LandCalculator: React.FC = () => {
  const [decimal, setDecimal] = useState<string>('');
  const [katha, setKatha] = useState<string>('');
  const [bigha, setBigha] = useState<string>('');
  const [category, setCategory] = useState<LandCategory>('Agricultural');
  const [location, setLocation] = useState<DetailedLocation>('Union');
  const [arrearsYears, setArrearsYears] = useState<number>(0);
  const [taxResult, setTaxResult] = useState<{ 
    primary: number; 
    totalArrears: number;
    penalty: number;
    total: number;
  } | null>(null);

  const handleUnitUpdate = (val: string, type: 'decimal' | 'katha' | 'bigha') => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setDecimal(''); setKatha(''); setBigha('');
      return;
    }

    if (type === 'decimal') {
      setDecimal(val);
      setKatha((num / 1.65).toFixed(2));
      setBigha((num / 33).toFixed(2));
    } else if (type === 'katha') {
      setKatha(val);
      setDecimal((num * 1.65).toFixed(2));
      setBigha((num / 20).toFixed(2));
    } else if (type === 'bigha') {
      setBigha(val);
      setDecimal((num * 33).toFixed(2));
      setKatha((num * 20).toFixed(2));
    }
  };

  const calculateTax = () => {
    const area = parseFloat(decimal);
    if (isNaN(area) || area <= 0) return;

    let annualRate = 0;
    
    if (category === 'Agricultural') {
      // 25 Bighas = 825 Decimals
      if (area <= 825) {
        annualRate = 0.012; // Nominal rate for small holdings (e.g. 10-20tk total)
      } else {
        annualRate = 2.0; // Standard rate per decimal for large agricultural holdings
      }
    } else {
      // Non-Agricultural Rates (Standard approximations based on location)
      switch(location) {
        case 'DhakaChittagongCity':
          annualRate = category === 'Commercial' ? 250 : category === 'Industrial' ? 150 : 100;
          break;
        case 'OtherCityCorp':
          annualRate = category === 'Commercial' ? 150 : category === 'Industrial' ? 100 : 60;
          break;
        case 'DistrictMunicipality':
          annualRate = category === 'Commercial' ? 100 : category === 'Industrial' ? 60 : 40;
          break;
        case 'OtherMunicipality':
          annualRate = category === 'Commercial' ? 60 : category === 'Industrial' ? 40 : 20;
          break;
        case 'Union':
          annualRate = category === 'Commercial' ? 30 : category === 'Industrial' ? 20 : 10;
          break;
      }
    }

    const primaryAnnualTax = category === 'Agricultural' && area <= 825 ? 10 : area * annualRate;
    const totalArrears = primaryAnnualTax * Math.max(1, arrearsYears + 1);
    
    // 6.25% annual penalty on arrears as per BD Govt rules
    const penalty = arrearsYears > 0 ? (totalArrears * 0.0625 * arrearsYears) : 0;
    
    setTaxResult({
      primary: Math.round(primaryAnnualTax),
      totalArrears: Math.round(totalArrears),
      penalty: Math.round(penalty),
      total: Math.round(totalArrears + penalty)
    });
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Calculator size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-800 tracking-tight">স্মার্ট ভূমি কর ক্যালকুলেটর</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">LD Tax Engine v4.0 (২০২৪ সংশোধনী অনুযায়ী)</p>
          </div>
        </div>
        <button 
          onClick={() => { setDecimal(''); setTaxResult(null); setArrearsYears(0); }}
          className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl mb-6 flex gap-3 items-start">
        <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-[11px] font-bold text-blue-800 leading-relaxed">
          ভূমি উন্নয়ন কর (সংশোধনী) বিধিমালা ২০২৪ অনুযায়ী কর হার ও ডিজিটাল পেমেন্ট পদ্ধতি আপডেট করা হয়েছে। এখন থেকে সকল কর অনলাইনে পরিশোধ করা বাধ্যতামূলক।
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির ধরন</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as LandCategory)}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
            >
              <option value="Agricultural">কৃষি জমি</option>
              <option value="Residential">আবাসিক/বসতবাড়ি</option>
              <option value="Commercial">বাণিজ্যিক/ব্যবসায়িক</option>
              <option value="Industrial">শিল্প কারখানা</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">অবস্থান/এলাকা</label>
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value as DetailedLocation)}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
            >
              <option value="DhakaChittagongCity">ঢাকা/চট্টগ্রাম সিটি কর্পোরেশন</option>
              <option value="OtherCityCorp">অন্যান্য সিটি কর্পোরেশন</option>
              <option value="DistrictMunicipality">জেলা সদরের পৌরসভা</option>
              <option value="OtherMunicipality">অন্যান্য পৌরসভা</option>
              <option value="Union">ইউনিয়ন/পল্লী এলাকা</option>
            </select>
          </div>
        </div>

        <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-[2rem] space-y-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-emerald-600/60 uppercase ml-3">শতাংশ</p>
              <input type="number" value={decimal} onChange={(e) => handleUnitUpdate(e.target.value, 'decimal')} className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-xl focus:border-emerald-500 outline-none transition-all font-black text-emerald-900 shadow-sm text-center" placeholder="0"/>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-emerald-600/60 uppercase ml-3">কাঠা</p>
              <input type="number" value={katha} onChange={(e) => handleUnitUpdate(e.target.value, 'katha')} className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-xl focus:border-emerald-500 outline-none transition-all font-black text-emerald-900 shadow-sm text-center" placeholder="0"/>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-emerald-600/60 uppercase ml-3">বিঘা</p>
              <input type="number" value={bigha} onChange={(e) => handleUnitUpdate(e.target.value, 'bigha')} className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-xl focus:border-emerald-500 outline-none transition-all font-black text-emerald-900 shadow-sm text-center" placeholder="0"/>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-emerald-800 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Calendar size={14} /> বকেয়া বছর (যদি থাকে)
            </label>
            <input 
              type="range" min="0" max="10" step="1" 
              value={arrearsYears} 
              onChange={(e) => setArrearsYears(parseInt(e.target.value))}
              className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
            />
            <div className="flex justify-between text-[10px] font-black text-emerald-600">
              <span>চলতি বছর</span>
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full">{arrearsYears === 0 ? 'শুধুমাত্র চলতি বছর' : `${arrearsYears} বছর বকেয়া`}</span>
              <span>১০+ বছর</span>
            </div>
          </div>
        </div>

        <button 
          onClick={calculateTax}
          className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 text-lg"
        >
          কর হিসাব করুন <ArrowRight size={22} />
        </button>

        {taxResult && (
          <div className="mt-8 space-y-5 animate-in slide-in-from-top-4 duration-500">
            <div className="p-8 bg-white border-2 border-emerald-500 rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FileText size={100} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-xl font-black text-emerald-900">ট্যাক্স রিপোর্ট সামারি</h4>
                </div>

                <div className="grid grid-cols-2 gap-y-4 text-sm font-bold">
                  <span className="text-gray-400">বার্ষিক মূল কর:</span>
                  <span className="text-right text-emerald-800">৳ {taxResult.primary}</span>
                  <span className="text-gray-400">মোট বকেয়া কর:</span>
                  <span className="text-right text-emerald-800">৳ {taxResult.totalArrears}</span>
                  <span className="text-gray-400 flex items-center gap-1">জরিমানা (৬.২৫%): <Info size={12}/></span>
                  <span className="text-right text-rose-600">৳ {taxResult.penalty}</span>
                  
                  <div className="col-span-2 border-t border-dashed border-gray-100 my-2 pt-4 flex justify-between items-center">
                    <span className="text-lg font-black text-gray-800">মোট প্রদেয়:</span>
                    <span className="text-3xl font-black text-emerald-600">৳ {taxResult.total}</span>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-all font-black text-xs uppercase shadow-sm border border-emerald-100">
                    <Download size={18} /> রসিদ
                  </button>
                  <button className="flex-[2] flex items-center justify-center gap-2 py-3.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-black text-xs uppercase shadow-xl shadow-emerald-200">
                    <CreditCard size={18} /> অনলাইন পেমেন্ট
                  </button>
                </div>
              </div>
            </div>

            {category === 'Agricultural' && parseFloat(decimal) <= 825 && (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 items-start">
                <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold text-amber-800 leading-relaxed">
                  আপনার জমির পরিমাণ ২৫ বিঘার নিচে হওয়ায় আপনি সরকারি কর মওকুফ সুবিধার আওতাভুক্ত। প্রদর্শিত পরিমাণটি শুধুমাত্র নামমাত্র প্রশাসনিক ফি।
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandCalculator;
